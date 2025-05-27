import axios from 'axios'

export default {
    registerCustomer(newCustomer) {
        return axios.post('/registration-customer', newCustomer)
    },

    registerGroomer(newGroomer) {
        return axios.post('/registration-groomer', newGroomer)
    }
}
