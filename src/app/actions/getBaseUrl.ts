export const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return "https://your-production-domain.com";
  } else if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return "http://localhost:3000";
  }
};
