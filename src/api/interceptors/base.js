// baseInterceptor.js
export const baseRequestInterceptor = async (config) => {
  config.headers['Content-Type'] = 'application/json'
  return config
}

export const baseResponseInterceptor = async (response) => {
  return response
}

export const baseErrorHandler = async (error) => {
  if (!error.response) {
    console.error('Network error or request not sent:', error.message)
    return Promise.reject({
      code: 'NETWORK_ERROR',
      message: 'Network error or request not sent',
      details: error.message
    })
  }

  return Promise.reject(error.response.data)
}
