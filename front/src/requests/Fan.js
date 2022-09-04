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


export const fanOn = () => {
    return fetchApi('/fan/on', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
}

export const fanOff = () => {
    return fetchApi('/fan/off', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
}

export const fanState = () => {
    return fetchApi('/fan/state', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const getFanDate = () => {
    return fetchApi('/fan/date', { 
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
  }).then(resp => resp.json());
}

export const setFanDate = (date) => {
    return fetchApi('/fan/date', { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFormattedDate(date)),  
  }).then(resp => resp.json());
}