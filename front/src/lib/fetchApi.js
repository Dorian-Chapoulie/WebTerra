const API_URL = "http://192.168.1.22:8080";

const fetchApi = (url, options) => fetch(`${API_URL}${url}`, options);

export default fetchApi;