import { handleApiRequest, instance } from "./instance";

// Base URL for pickup locations
const URL_PICKUP_LOCATIONS = "/api/pickup-locations";

// Create a new pickup location
export const createPickupLocation = async (pickupLocationCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(
      URL_PICKUP_LOCATIONS,
      pickupLocationCreationRequest
    );
    return response.data;
  });
};

// Get all pickup locations
export const getAllPickupLocations = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_PICKUP_LOCATIONS);
    return response.data;
  });
};

// Get a pickup location by ID
export const getPickupLocationById = async (pickupLocationId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(
      `${URL_PICKUP_LOCATIONS}/${pickupLocationId}`
    );
    return response.data;
  });
};

// Update a pickup location by ID
export const updatePickupLocation = async (
  pickupLocationId,
  pickupLocationUpdateRequest
) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_PICKUP_LOCATIONS}/${pickupLocationId}`,
      pickupLocationUpdateRequest
    );
    return response.data.result;
  });
};

// Delete a pickup location by ID
export const deletePickupLocation = async (pickupLocationId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(
      `${URL_PICKUP_LOCATIONS}/${pickupLocationId}`
    );
    return response.data;
  });
};
