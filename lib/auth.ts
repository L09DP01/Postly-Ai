import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const p = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }).safeParse(creds);
        if (!p.success) return null;
        
        const user = await prisma.user.findUnique({ 
          where: { email: p.data.email } 
        });
        if (!user) return null;
        
        const ok = await bcrypt.compare(p.data.password, user.passwordHash);
        if (!ok) return null;
        
        // ⚠️ retourner AU MINIMUM id + email
        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.userId = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) (session.user as any).id = token.userId;
      return session;
    },
  },
};

