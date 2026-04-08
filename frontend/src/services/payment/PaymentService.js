import axiosInstance from '../../configs/axios.js';

const PaymentService = {
    createMomoPayment: (payload) => axiosInstance.post('/payment/momo/create', payload),
    confirmMomoPayment: (payload) => axiosInstance.post('/payment/momo/confirm', payload),
};

export default PaymentService;
