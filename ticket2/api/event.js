import api from "../axiosConfig";

export const topUpcomingEvents = async () => {
  try {
    const response = await api.get("/api/v1/event/EventList");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Event list failed");
  }
};
