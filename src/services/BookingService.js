import axios from "axios";

export default {

    sendPostBookingGroomerProcedureRequest(customerUserId, groomerProcedureId) {
        return axios.post("/booking/groomer-procedure", null, {
            params: {
                customerUserId: customerUserId,
                groomerProcedureId: groomerProcedureId
            }
        });
    },

    sendGetBookingShortBasketInfoRequest(userId) {
        return axios.get("/booking/short-basket-info", {
            params: {
                userId: userId
            }
        });
    }
};
