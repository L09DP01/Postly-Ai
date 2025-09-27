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
      credentials: { 
        email: { label: "Email", type: "text" }, 
        password: { label: "Password", type: "password" } 
      },
      async authorize(credentials) {
        try {
          const parsed = z.object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          }).safeParse(credentials);
          
          if (!parsed.success) return null;
          
          const user = await prisma.user.findUnique({ 
            where: { email: parsed.data.email } 
          });
          
          if (!user) return null;
          
          const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
          return ok ? { id: user.id, email: user.email } : null;
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      }
    })
  ],
  pages: { 
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    }
  }
};

