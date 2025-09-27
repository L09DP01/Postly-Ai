import NextAuth, { type NextAuthOptions } from &quot;next-auth&quot;;
import Credentials from &quot;next-auth/providers/credentials&quot;;
import bcrypt from &quot;bcrypt&quot;;
import { prisma } from &quot;./prisma&quot;;

export const authOptions: NextAuthOptions = {
  session: { strategy: &quot;jwt&quot; },
  providers: [
    Credentials({
      name: &quot;Email & Password&quot;,
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        try {
          const email = String(creds?.email || &quot;&quot;);
          const password = String(creds?.password || &quot;&quot;);
          
          console.log(&quot;Auth attempt:&quot;, { email, hasPassword: !!password });
          
          if (!email || !password) {
            console.log(&quot;Missing credentials&quot;);
            return null;
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            console.log(&quot;User not found:&quot;, email);
            return null;
          }

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) {
            console.log(&quot;Password mismatch for:&quot;, email);
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
      if (user?.id) token.userId = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.userId && session.user) {
        (session.user as { id: string }).id = token.userId as string;
      }
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

