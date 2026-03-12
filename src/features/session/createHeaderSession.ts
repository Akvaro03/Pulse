function createHeaderSession(accessToken: string, refreshToken: string) {
  const headers = new Headers();
  const isProd = process.env.NODE_ENV === "production";

  headers.append(
    "Set-Cookie",
    `access_token=${accessToken}; HttpOnly; ${
      isProd ? "Secure;" : ""
    } SameSite=Lax; Max-Age=900; Path=/`,
  );

  headers.append(
    "Set-Cookie",
    `refresh_token=${refreshToken}; HttpOnly; ${
      isProd ? "Secure;" : ""
    } SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}; Path=/`,
  );
  headers.append("Content-Type", "application/json");
  return headers;
}

export default createHeaderSession;
