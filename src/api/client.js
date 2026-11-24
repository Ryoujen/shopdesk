const BASE_URL = "https://shopdesk-api-know.onrender.com";

export async function request(path, options = {}) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error("Request failed with status " + res.status);
  }
  if (res.status === 204) return null;
  return res.json();
}
