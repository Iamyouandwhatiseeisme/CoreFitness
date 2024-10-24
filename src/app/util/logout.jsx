export async function logout() {
  try {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const result = { success: true, message: "Logout successful!" };

    return result;
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Something went wrong during logout." };
  }
}
