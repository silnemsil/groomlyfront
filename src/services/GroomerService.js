import axios from 'axios';

export default {
    getAllGroomers() {
        return axios.get('/groomers');
    },
    getGroomerDetails() {
        return axios.get('/groomer',{params:{groomerId}})
    },

};
