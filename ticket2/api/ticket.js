import api from '../axiosConfig';

export const scanQr = async ({ event_id, code_id }) => {
    try {
        const response = await api.get(`/api/v1/ticket/scan?codeId=${code_id}&eventId=${event_id}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        throw new Error(error?.response?.data?.message || "Scan QR failed");
    }
}

export const getVisitorTickets = async () => {
    try {
        const response = await api.get('/api/v1/ticket/ticketList');
        console.log(response?.tickets);
        return response?.data;
    } catch (error) {
        console.log(error);
        throw new Error(error?.response?.data?.message || "Something Went Wrong while fetching Tickets");
    }
}