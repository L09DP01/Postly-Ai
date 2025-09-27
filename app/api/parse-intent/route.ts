import { NextResponse } from &quot;next/server&quot;;
import { z } from &quot;zod&quot;;
import { openai } from &quot;@/lib/ai/openai&quot;;
import { PARSE_INTENT_SYSTEM_PROMPT } from &quot;@/lib/ai/prompts&quot;;
import { ParseIntentReqSchema, IntentSchema } from &quot;@/lib/zod-schemas&quot;;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brief } = ParseIntentReqSchema.parse(body);

    const completion = await openai.chat.completions.create({
      model: &quot;gpt-4o-mini&quot;,
      messages: [
        { role: &quot;system&quot;, content: PARSE_INTENT_SYSTEM_PROMPT },
        { role: &quot;user&quot;, content: brief },
      ],
      temperature: 0.7,
      response_format: { type: &quot;json_object&quot; },
    });

    const rawIntent = completion.choices[0]?.message?.content ?? &quot;{}&quot;;
    const parsedIntent = IntentSchema.parse(JSON.parse(rawIntent));

    return NextResponse.json({ intent: parsedIntent });
  } catch (error) {
    console.error(&quot;Error in /api/parse-intent:&quot;, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: &quot;Invalid request data&quot;, details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to parse intent" }, { status: 500 });
  }
}