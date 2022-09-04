import fetchApi from '../lib/fetchApi';


export const getTemp = () => {
    return fetchApi('/dht/temp', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const getHumidity = () => {
    return fetchApi('/dht/humidity', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const getData = (limit) => {
    console.log("request: ", `/dht/history/data/${limit}`)
    return fetchApi(`/dht/history/data/${limit}`, { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}