import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        try {
          const email = String((creds as any)?.email || "");
          const password = String((creds as any)?.password || "");
          
          console.log("Auth attempt:", { email, hasPassword: !!password });
          
          if (!email || !password) {
            console.log("Missing credentials");
            return null;
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            console.log("User not found:", email);
            return null;
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            console.log("Password mismatch for:", email);
            return null;
          }

          console.log("Auth successful for:", email);
          // IMPORTANT: retourner au moins id + email
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("Auth authorize error:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.userId = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) (session.user as any).id = token.userId as string;
      return session;
    },
    // sécurise les redirections
    async redirect({ url, baseUrl }) {
      try {
        const u = new URL(url, baseUrl);
        // n'autorise que le même host
        if (u.origin === baseUrl) return u.toString();
      } catch {}
      return baseUrl;
    },
  },
};

