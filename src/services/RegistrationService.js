import axios from 'axios'

export default {
    registrationCustomer(username, password) {
        return axios.post('http://localhost:8080/register-customer', {
            username: username,
            password: password,
            roleId: 3
        })
    },

    registrationGroomer(username, password) {
        return axios.post('http://localhost:8080/register-groomer', {
            username: username,
            password: password,
            roleId: 2
        })
    }
}
