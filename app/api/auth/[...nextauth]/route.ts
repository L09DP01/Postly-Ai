import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs"; // 👈 Important pour bcrypt/Prisma

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };