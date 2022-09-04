import fetchApi from '../lib/fetchApi';

const getFormattedDate = (date) => {
    return {
        date: {
            dateOn: {
                hour: date.dateOn.slice(0, 2),
                minutes: date.dateOn.slice(3, 5),
            },
            dateOff: {
                hour: date.dateOff.slice(0, 2),
                minutes: date.dateOff.slice(3, 5),
            },
        }
    };
}


export const lightOn = () => {
    return fetchApi('/light/on', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
}

export const lightOff = () => {
    return fetchApi('/light/off', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
}

export const lightState = () => {
    return fetchApi('/light/state', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const getLightDate = () => {
    return fetchApi('/light/date', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const setLightDate = (date) => {
    return fetchApi('/light/date', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFormattedDate(date)),  
  }).then(resp => resp.json());
}