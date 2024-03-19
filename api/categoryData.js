import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
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

const createCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
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

const getSingleCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 204) {
        return resolve();
      } if (response.ok) {
        return response.json().then(resolve);
      }
      return response.text().then((text) => reject(new Error(text)));
    })
    .catch((error) => reject(error));
});

const updateCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // This line was missing
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || 'Server responded with an error');
        });
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCategories, createCategory, getSingleCategory, deleteCategory, updateCategory,
};
