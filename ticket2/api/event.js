import api from "../axiosConfig";

export const getEventsData = async ({ limit, event_type } = {}) => {
  try {
    console.log("limit: " + limit);

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

export const createEvent = async (eventData) => {
  try {
    const response = await api.post("api/v1/event/registeration", eventData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event Creation failed");
  }
};
export const getAllEvents = async () => {
  try {
    const response = await api.get("/api/v1/event/GetAllEvents");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event list failed");
  }
}

export const generateTicket = async (payload) => {
  try {
    const response = await api.post("/api/v1/ticket/generate-ticket", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {

  }
}


