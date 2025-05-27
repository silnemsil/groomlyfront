import axios from "axios";

export default {

    sendPostGroomerLoginRequest(groomerData) {
        return axios.post("/groomers/login", groomerData);
    },

    sendGetGroomerProfileRequest() {
        return axios.get("/groomers/profile");
    },

    sendPutGroomerProfileUpdateRequest(updatedGroomerData) {
        return axios.put("/groomers/profile", updatedGroomerData);
    },

    sendRegisterNewGroomerRequest(newGroomerData) {
        return axios.post("/groomers/register", newGroomerData);
    }

};
