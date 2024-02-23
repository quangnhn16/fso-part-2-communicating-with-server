import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const get = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const post = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const del = (id) => {
  return axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then((response) => response.data);
};

const put = (id, person) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, person)
    .then((response) => response.data);
};

export default { get, post, del, put };
