import axios from "../axios"

const handleLoginApi = (email, password) => {
    console.log('da vao chua')
    return axios.post('/api/login', { email, password }, {headers: {'Access-Control-Allow-Origin': true,} });
}

export { handleLoginApi }