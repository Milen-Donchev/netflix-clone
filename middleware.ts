export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/browse/:path*", "/profile-select/:path*", "/watch/:path*"],
};
