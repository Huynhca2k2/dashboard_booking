import { handleApiRequest, instance } from "./instance";

// Base URL for buses
const URL_BUSES = "/api/buses";

// Create a new bus
export const createBus = async (busCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(URL_BUSES, busCreationRequest);
    return response.data;
  });
};

// Get all buses
export const getAllBuses = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_BUSES);

    return response.data;
  });
};

// Get a bus by ID
export const getBusById = async (busId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(`${URL_BUSES}/${busId}`);
    return response.data;
  });
};

// Update a bus by ID
export const updateBus = async (busId, busUpdateRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_BUSES}/${busId}`,
      busUpdateRequest
    );
    return response.data.result;
  });
};

// Delete a bus by ID
export const deleteBus = async (busId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(`${URL_BUSES}/${busId}`);
    return response.data;
  });
};
