import fetchApi from '../lib/fetchApi';


export const getState = () => {
    return fetchApi('/heater/state', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const getMaxTemp = () => {
    return fetchApi('/heater/maxtemp', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const setMaxTemp = (data) => {
    return fetchApi('/heater/maxtemp', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({maxtemp: data}),  
  }).then(resp => resp.json());
}