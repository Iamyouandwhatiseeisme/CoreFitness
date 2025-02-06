export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return `https://corefitness.vercel.app`;
  } else if (process.env.VERCEL_ENV === "preview") {
    console.log(process.env.VERCEL_URL);
    return `https://${process.env.VERCEL_URL}`;
  } else {
    console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);
    return "http://localhost:3000";
  }
};
