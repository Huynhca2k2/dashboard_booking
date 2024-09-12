import { handleApiRequest, instance } from "./instance";

// Base URL for dropoff locations
const URL_DROPOFF_LOCATIONS = "/api/dropoff-locations";

// Create a new dropoff location
export const createDropoffLocation = async (dropoffLocationCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(
      URL_DROPOFF_LOCATIONS,
      dropoffLocationCreationRequest
    );
    return response.data;
  });
};

// Get all dropoff locations
export const getAllDropoffLocations = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_DROPOFF_LOCATIONS);
    return response.data;
  });
};

// Get a dropoff location by ID
export const getDropoffLocationById = async (dropoffLocationId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(
      `${URL_DROPOFF_LOCATIONS}/${dropoffLocationId}`
    );
    return response.data;
  });
};

// Update a dropoff location by ID
export const updateDropoffLocation = async (
  dropoffLocationId,
  dropoffLocationUpdateRequest
) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_DROPOFF_LOCATIONS}/${dropoffLocationId}`,
      dropoffLocationUpdateRequest
    );
    console.log(response.data);
    return response.data.result;
  });
};

// Delete a dropoff location by ID
export const deleteDropoffLocation = async (dropoffLocationId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(
      `${URL_DROPOFF_LOCATIONS}/${dropoffLocationId}`
    );
    return response.data;
  });
};
