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
          console.log("Auth attempt:", { email: credentials?.email });
          
          const parsed = z.object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          }).safeParse(credentials);
          
          if (!parsed.success) {
            console.log("Auth validation failed:", parsed.error);
            return null;
          }
          
          const user = await prisma.user.findUnique({ 
            where: { email: parsed.data.email } 
          });
          
          if (!user) {
            console.log("User not found:", parsed.data.email);
            return null;
          }
          
          const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
          
          if (ok) {
            console.log("Auth successful for:", user.email);
            return { id: user.id, email: user.email };
          } else {
            console.log("Password mismatch for:", user.email);
            return null;
          }
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
        console.log("JWT callback - user:", user);
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("Session callback - token:", token);
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
        };
      }
      return session;
    }
  },
  debug: true // Activer le debug en développement
};

