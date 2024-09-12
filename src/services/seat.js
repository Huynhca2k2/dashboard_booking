import { handleApiRequest, instance } from "./instance";

// Base URL for seats
const URL_SEATS = "/api/seats";

// Create a new seat
export const createSeat = async (seatCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(URL_SEATS, seatCreationRequest);
    return response.data;
  });
};

// Get all seats
export const getAllSeats = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_SEATS);
    return response.data;
  });
};

// Get a seat by ID
export const getSeatById = async (seatId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(`${URL_SEATS}/${seatId}`);
    return response.data;
  });
};

// Update a seat by ID
export const updateSeat = async (seatId, seatUpdateRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_SEATS}/${seatId}`,
      seatUpdateRequest
    );
    return response.data.result;
  });
};

// Delete a seat by ID
export const deleteSeat = async (seatId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(`${URL_SEATS}/${seatId}`);
    return response.data;
  });
};

// Create multiple seats
export const createSeatsBatch = async (seatCreationMoreRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(
      `${URL_SEATS}/batch`,
      seatCreationMoreRequest
    );
    return response.data;
  });
};
