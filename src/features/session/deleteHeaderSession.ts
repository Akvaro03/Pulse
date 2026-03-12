function deleteHeaderSession() {
  const headers = new Headers();

  headers.append(
    "Set-Cookie",
    "access_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
  );

  headers.append(
    "Set-Cookie",
    "refresh_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
  );

  headers.append("Content-Type", "application/json");
  return headers;
}

export default deleteHeaderSession;
