import axiosInstance from '../../configs/axios.js';

const PaymentService = {
    createMomoPayment: (payload) => axiosInstance.post('/payment/momo/create', payload),
};

export default PaymentService;
