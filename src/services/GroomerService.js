import axios from 'axios';

export default {

    getAllGroomers() {
        return axios.get('/groomers');
    },
    getGroomerDetails(groomerId) {
        return axios.get(`/groomer`, { params: { groomerId } });
    },

    sendGetCityGroomers(cityId) {
        return axios.get('/city/groomers', {
            params: {
                cityId: cityId
            }
        });
    },

};
