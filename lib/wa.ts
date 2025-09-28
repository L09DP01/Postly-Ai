import crypto from 'crypto';

const PROVIDER = process.env.WHATSAPP_PROVIDER || 'twilio';

export async function verifyTwilioSignature(req: Request): Promise<boolean> {
  const signature = req.headers.get('X-Twilio-Signature');
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!signature || !authToken) return false;
  
  // Implémentation vérification signature Twilio
  // Pour l'instant, on accepte toutes les requêtes en développement
  // TODO: Implémenter la vraie vérification Twilio
  return true;
}

export async function verifyMetaSignature(req: Request): Promise<boolean> {
  const signature = req.headers.get('X-Hub-Signature-256');
  const verifyToken = process.env.META_VERIFY_TOKEN;
  
  if (!signature || !verifyToken) return false;
  
  // Implémentation vérification signature Meta
  const payload = await req.text();
  const expectedSignature = crypto
    .createHmac('sha256', verifyToken)
    .update(payload)
    .digest('hex');
  
  return `sha256=${expectedSignature}` === signature;
}

export async function sendWhatsAppMessage(
  to: string, 
  message: string, 
  templateName?: string
): Promise<void> {
  if (PROVIDER === 'twilio') {
    await sendViaTwilio(to, message, templateName);
  } else {
    await sendViaMeta(to, message, templateName);
  }
}

async function sendViaTwilio(to: string, message: string, templateName?: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  
  if (!accountSid || !authToken || !from) {
    console.error('Missing Twilio configuration');
    return;
  }
  
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  
  const params = new URLSearchParams({
    From: `whatsapp:${from}`,
    To: `whatsapp:${to}`,
    Body: message
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!response.ok) {
    throw new Error(`Twilio API error: ${response.statusText}`);
  }
}

async function sendViaMeta(to: string, message: string, templateName?: string) {
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  
  if (!phoneNumberId || !accessToken) {
    console.error('Missing Meta configuration');
    return;
  }
  
  const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
  
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: templateName ? 'template' : 'text',
    ...(templateName ? {
      template: {
        name: templateName,
        language: { code: 'fr' },
        components: [{
          type: 'body',
          parameters: [{ type: 'text', text: message }]
        }]
      }
    } : {
      text: { body: message }
    })
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Meta API error: ${response.statusText}`);
  }
}

export function normalizePhone(phone: string): string {
  // Normaliser vers format E.164
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('33')) {
    return '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    return '+33' + cleaned.substring(1);
  }
  return '+' + cleaned;
}
