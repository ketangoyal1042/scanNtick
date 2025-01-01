import api from "../axiosConfig";

export const topUpcomingEvents = async (limit=0) => {
  try {
    const response = await api.get(`/api/v1/event/EventList/${limit}`);
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
