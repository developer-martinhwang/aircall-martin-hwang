import baseApi from "../api-common";
// retrieve all calls
const getAll = () => {
    return baseApi.get(`/activities`);
}
// retrieve a specific call
const get = (id) => {
    return baseApi.get(`/activities/${id}`);
}
// update a call
const update = (id, data) => {
    return baseApi.put(`/activities/${id}`, data);
}
// reset all calls
const reset = () => {
    return baseApi.get(`/reset`);
}
const AirCallService = 
{ getAll, get, update, reset};

export default AirCallService
