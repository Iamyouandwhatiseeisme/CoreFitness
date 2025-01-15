export const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return `https://corefitness.vercel.app`;
  } else if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return "http://localhost:3000";
  }
};
