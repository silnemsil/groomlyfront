import axios from 'axios'

export default {
    registrationCustomer(username, password) {
        return axios.post('/register-customer', {
            username: username,
            password: password,
            roleId: 3
        })
    },

    registrationGroomer(username, password) {
        return axios.post('/register-groomer', {
            username: username,
            password: password,
            roleId: 2
        })
    }
}
