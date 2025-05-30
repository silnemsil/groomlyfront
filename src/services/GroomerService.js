import axios from 'axios';

export default {
    // getAllGroomers() {
    //     return axios.get('/groomers');
    // },
    getGroomerDetails(groomerId) {
        return axios.get('/groomer', { params: { groomerId } });
    }
    ,
findGroomerByCity(cityId){
        return axios.get('/groomers', { params: { cityId } });//getAllGroomers asemel
}

};
