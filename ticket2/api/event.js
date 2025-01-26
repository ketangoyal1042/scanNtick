import api from "../axiosConfig";

export const getEventsData = async ({ limit, event_type } = {}) => {
  try {
    const requestData = {};
    if (limit !== undefined) {
      requestData.limit = limit;
    }
    if (event_type) {
      requestData.event_type = event_type;
    }

    const response = await api.get(`/api/v1/event/EventList`, {
      params: requestData,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event list failed");
  }
};

export const getEventData = async ({ event_id }) => {
  try {
    console.log("fvdfvsdf", event_id);
    const response = await api.get(`/api/v1/event/${event_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event fatch failed");
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("api/v1/event/registeration", eventData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event Creation failed");
  }
};

export const updateEvent = async (eventData, eventId) => {
  try {
    const response = await api.patch(
      `api/v1/event/updateEvent/${eventId}`,
      eventData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event Updation failed");
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`api/v1/event/deleteEvent/${eventId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event deletion failed");
  }
};

export const getActiveEvents = async () => {
  try {
    const response = await api.get("/api/v1/event/getActiveEventsTitle");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event list failed");
  }
};

export const generateTicket = async (payload) => {
  try {
    const response = await api.post("/api/v1/ticket/generate-ticket", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {}
};

export const addEventCollaborator = async (payload) => {
  try {
    const response = await api.post("/api/v1/event/subCollaborator/add", payload);
    return response.data;
  } catch (error) {
    return new Error(error.response?.data?.message || "Something went wrong while adding collaborator")
  }
}

export const getEventCollaborator = async (EventId) => {
  try {
    const response = await api.get(`/api/v1/event/subCollaborator/getList/${EventId}`);
    return response.data;
  } catch (error) {
    return new Error(error.response?.data?.message || "Something went wrong while fetching collaborator")
  }
}

export const removeEventCollaborator = async (payload) => {
  try {
    const response = await api.put("/api/v1/event/subCollaborator/remove", payload);
    return response.data;
  } catch (error) {
    return new Error(error.response?.data?.message || "Encounter some Error while Removing collaborator")
    
  }
}