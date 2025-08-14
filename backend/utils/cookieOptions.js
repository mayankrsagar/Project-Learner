export const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  // In prod, when frontend and backend are on different origins and you need cross-site cookies,
  // use SameSite=None and secure=true (https). For local dev use Lax.
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
  // Only set domain if you explicitly want cross-subdomain cookies.
  domain: process.env.COOKIE_DOMAIN || undefined,
  // maxAge in milliseconds
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
