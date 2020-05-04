import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://protected-waters-27763.herokuapp.com/api/persons'
const baseUrl = 'api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
    
}
export default {
    create: create,
    getAll: getAll,
    remove: remove,
    update: update
}