import axios from 'axios';

export default {
    getAllGroomers() {
        return axios.get('/groomers');
    },
};
