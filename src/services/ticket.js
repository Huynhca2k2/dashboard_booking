import { handleApiRequest, instance } from "./instance";

const URL_TICKETS = "/api/tickets";

// Create a new ticket
export const createTicket = async (ticketCreationRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.post(URL_TICKETS, ticketCreationRequest);
    return response.data;
  });
};

// Fetch all tickets
export const getAllTickets = async () => {
  return handleApiRequest(async () => {
    const response = await instance.get(URL_TICKETS);
    return response.data;
  });
};

// Fetch a ticket by ID
export const fetchTicketById = async (ticketId) => {
  return handleApiRequest(async () => {
    const response = await instance.get(`${URL_TICKETS}/${ticketId}`);
    return response.data;
  });
};

// Update a ticket by ID
export const updateTicket = async (ticketId, ticketUpdateRequest) => {
  return handleApiRequest(async () => {
    const response = await instance.put(
      `${URL_TICKETS}/${ticketId}`,
      ticketUpdateRequest
    );
    return response.data.result;
  });
};

// Delete a ticket by ID
export const deleteTicket = async (ticketId) => {
  return handleApiRequest(async () => {
    const response = await instance.delete(`${URL_TICKETS}/${ticketId}`);
    return response.data;
  });
};
