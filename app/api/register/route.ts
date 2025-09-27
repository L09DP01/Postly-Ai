import { NextRequest, NextResponse } from &quot;next/server&quot;;
import { z } from &quot;zod&quot;;
import bcrypt from &quot;bcrypt&quot;;
import { prisma } from &quot;@/lib/prisma&quot;;

const registerSchema = z.object({
  email: z.string().email(&quot;Email invalide&quot;),
  password: z.string().min(6, &quot;Le mot de passe doit contenir au moins 6 caractères&quot;),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = registerSchema.parse(body);

    // Vérifier si l&apos;utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: &quot;Un utilisateur avec cet email existe déjà&quot; },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l&apos;utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      }
    });

    return NextResponse.json(
      { message: &quot;Utilisateur créé avec succès&quot;, userId: user.id },
      { status: 201 }
    );

  } catch (error) {
    console.error(&quot;Register error:&quot;, error);
    
    // Log détaillé pour le debugging
    if (error instanceof Error) {
      console.error(&quot;Error message:&quot;, error.message);
      console.error(&quot;Error stack:&quot;, error.stack);
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: &quot;Données invalides&quot;, details: error.issues },
        { status: 400 }
      );
    }

    // Erreur de base de données
    if (error instanceof Error && error.message.includes(&quot;connect&quot;)) {
      return NextResponse.json(
        { error: &quot;Erreur de connexion à la base de données&quot; },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: &quot;Erreur lors de la création du compte&quot;, details: error instanceof Error ? error.message : &quot;Unknown error&quot; },
      { status: 500 }
    );
  }
}
