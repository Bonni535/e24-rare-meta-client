import { clientCredentials } from '../utils/client';
import { endpoint } from './categoryData';

const getTags = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });


const deleteTag = (tagId) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${tagId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => resolve((data)))
      .catch(reject);
  }); 


  const updateTag = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${payload.Id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

  
export { getTags, deleteTag, updateTag };