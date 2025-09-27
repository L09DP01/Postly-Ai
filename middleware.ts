import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/auth/login" },
});

export const config = {
  matcher: [
    "/dashboard/:path*",   // protégé
    "/billing/:path*",     // protégé
    // NE PAS inclure "/auth" ni "/api/auth"
  ],
};

