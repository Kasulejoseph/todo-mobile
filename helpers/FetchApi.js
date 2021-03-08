import { ToastAndroid } from 'react-native';
import { API_URL } from '../Global';

const fetchAPI = async (endpoint, config) => {

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json, text/plain, */*',
    }
  };

  return new Promise((resolve, reject) => {
    const options = {
      ...defaultOptions,
      ...config
    };
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    fetch(`${API_URL}${endpoint}`, options)
      .then((res) => res.json() || {})
      .then((res) => {
        console.log(
          'Fetch ApI Respone:',
          `${API_URL}${endpoint}`,
          '<- options--->',
          options,
          '<---res---->',
          res
        );

        if (res.status === 200 || res.status === 201 || res.status === 304) {
          return resolve(res);
        }
        return reject(res);
      })
      .catch((err) => {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });
  });
};

export default fetchAPI;
