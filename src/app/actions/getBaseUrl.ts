export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return `https://corefitness.vercel.app`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return "http://localhost:3000";
  }
};
