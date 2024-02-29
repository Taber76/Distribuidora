const apiUrl = import.meta.env.VITE_API_URL

const apiCall = async (method, endpoint, data) => { // endpoint includes query or params
  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    return res
  } catch (error) {
    throw error
  }
}

const apiCallGet = async (endpoint) => { // endpoint includes query or params
  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log('APISERVICE', res)
    return res
  } catch (error) {
    throw error
  }
}

export const apiService = {

  postPut: async (method, endpoint, data) => {
    try {
      return await apiCall(method, endpoint, data)
    } catch (error) {
      throw error
    }
  },

  get: async (endpoint) => {
    try {
      return await apiCallGet(endpoint)
    } catch (error) {
      throw error
    }
  },

  delete: async (endpoint) => {
    try {
      return await apiCall('DELETE', endpoint, {})
    } catch (error) {
      throw error
    }
  },



  users: {
    register: async (data) => {
      try {
        return await apiCall('POST', 'user/register', data);
      } catch (error) {
        throw error
      }
    },


    update: async (data) => {
      try {
        return await apiCall('DELETE', 'user/update', data);
      } catch (error) {
        throw error
      }
    },

    getBiId: async (data) => {
      try {
        return await apiCall('GET', `user/${data}`, {});
      } catch (error) {
        throw error
      }
    },

    getByToken: async () => {
      try {
        return await apiCallGet(`user/getbytoken`);
      } catch (error) {
        throw error
      }
    },

    delete: async (data) => {
      try {
        return await apiCall('DELETE', `user/delete/${data}`, {});
      } catch (error) {
        throw error
      }
    }
  },

  items: {
    register: async (data) => {
      try {
        return await apiCall('POST', 'item/register', data);
      } catch (error) {
        throw error
      }
    },
  }

}