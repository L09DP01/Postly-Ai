import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("Middleware triggered for:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log("Authorized check:", { 
          path: req.nextUrl.pathname, 
          hasToken: !!token 
        });
        return !!token;
      },
    },
    pages: { 
      signIn: "/auth/login" 
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/billing/:path*"]
};

