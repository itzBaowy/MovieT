import axiosInstance from '../../configs/axios.js';

const TicketService = {
    getMyTickets: () => axiosInstance.get('/tickets/my'),
};

export default TicketService;
