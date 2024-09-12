import { handleApiRequest, instance } from "./instance";

const URL_USERS = "/api/users";

//fetch info uer
export const fetchUserInfo = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get("/api/users/my-info");
    return response.data.result;
  });
};

// Create a new user
export const createUser = async (userCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(URL_USERS, userCreationRequest);
    return response.data.result;
  });
};

// Get all users
export const getAllUsers = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_USERS);
    return response.data.result;
  });
};

// Get user by ID
export const getUser = async (userId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(`${URL_USERS}/${userId}`);
    return response.data.result;
  });
};

// Update user by ID
export const updateUser = async (userId, userUpdateRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_USERS}/${userId}`,
      userUpdateRequest
    );
    return response.data.result;
  });
};

// Delete user by ID
export const deleteUser = async (userId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(`${URL_USERS}/${userId}`);
    return response.data.result;
  });
};
