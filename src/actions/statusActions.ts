import { Dispatch } from 'redux';
import axios from 'axios';
import { ServiceStatus } from '../models/status';

export const STATUS_FETCH_STARTED = 'STATUS_FETCH_STARTED';
export const STATUS_FETCH_SUCCEEDED = 'STATUS_FETCH_SUCCEEDED';
export const STATUS_FETCH_FAILED = 'STATUS_FETCH_FAILED';

const platforms = [
  {
    url: 'https://bitbucket.status.atlassian.com/api/v2/status.json'
  },
  {
    url: 'https://status.circleci.com/api/v2/status.json'
  },
  {
    url: 'https://status.npmjs.org/api/v2/status.json'
  }
];

const fetchStatus = async () => {
  let promises: Promise<ServiceStatus>[] = [];
  platforms.forEach((element) => {
    const promise = new Promise<ServiceStatus>((resolve, reject) => {
      axios.get(element.url)
      .then(response => {
        const statusData: ServiceStatus = {
          name: response.data.page.name,
          url: response.data.page.url,
          incidentStatus: response.data.status.indicator,
          description: response.data.status.description
        };
        resolve(statusData);
      })
      .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //let reason = JSON.parse(error.response.data);
            reject(!!error.response.data.reason ? error.response.data.reason : 'Received error from server');
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            reject('No response was received');
          } else {
            // Something happened in setting up the request that triggered an Error
            reject(error.message);
          }
      });
    });
    promises.push(promise);
  });

  const promiseResults = await Promise.allSettled(promises);
  return promiseResults
          .filter(e => e.status === 'fulfilled')
          .map((e: PromiseFulfilledResult<ServiceStatus>) => e.value);
}

export const statusFetchStarted = () => {
  return (dispatch: Dispatch) => {
      dispatch({type: STATUS_FETCH_STARTED});

      fetchStatus()
      .then(statusData => {
          dispatch({type: STATUS_FETCH_SUCCEEDED, statuses: statusData});
      })
      .catch(reason => {
          dispatch({type: STATUS_FETCH_FAILED, reaon: reason});
      })
  }
}