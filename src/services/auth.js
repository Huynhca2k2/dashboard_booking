import { handleApiRequest, instance } from "./instance";

const URL_LOGIN = "/auth/token";
const URL_LOGOUT = "/auth/logout";

const loginRequest = (username, password) => {
  return {
    username: username,
    password: password,
  };
};

export async function loginAdmin(username, password) {
  return handleApiRequest(async () => {
    const response = await instance.post(
      `${URL_LOGIN}/admin`,
      loginRequest(username, password)
    );

    if (response?.data?.result?.token) {
      localStorage.setItem("token", response.data.result.token);
    }

    return response;
  });
}

export const logout = async (token) => {
  try {
    const response = await handleApiRequest(async () => {
      return await instance.post(URL_LOGOUT, { token });
    });
    return response;
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};
