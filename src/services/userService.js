import apiClient from "@/helper/axios";


export async function signUp(user) {
  const result = await apiClient
    .post("/api/users", user)
    .then((response) => response.data);

  return result;
}

export async function login(loginData) {
  const result = await apiClient
    .post("/api/login", loginData)
    .then((response) => response.data);
  return result;
}
export async function currentUser() {
  const result = await apiClient
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

export async function logout() {
  const result = await apiClient
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
