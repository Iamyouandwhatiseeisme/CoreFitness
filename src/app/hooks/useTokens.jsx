import { useEffect, useState } from "react";

export const useTokens = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const retrieveTokens = () => {
    const cookieStore = document.cookie;

    const accessTokenMatch = cookieStore.match(/refreshToken=([^;]*)/);
    const refreshTokenMatch = cookieStore.match(/accessToken([^;]*)/);
    const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
    const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  useEffect(() => {
    retrieveTokens();
  }, []);

  return { accessToken, refreshToken };
};
