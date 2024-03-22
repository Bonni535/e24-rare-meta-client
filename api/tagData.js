import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createTag = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

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
    fetch(`${endpoint}/tags/${tagId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve((data)))
      .catch(reject);
  }); 


const updateTag = (id, payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

    
  const getSingleTag = (tagId) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/tags/${tagId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
  
export { createTag, getTags, deleteTag, updateTag, getSingleTag };