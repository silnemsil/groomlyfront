import axios from 'axios'

export default {
    registerCustomer(newCustomer) {
        return axios.post('/registration-customer', newCustomer)
    },

    registerGroomer(username, password) {
        return axios.post('/registration-groomer', {
            username: username,
            password: password,
        })
    }
}
