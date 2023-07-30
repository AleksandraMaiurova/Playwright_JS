const authToken = async (request) => {
  const response = await request.post('https://k-ampus.dev/api/v1/login', {
      data: {
        username: 'skhalipa@gmail.com',
        password: 'skhalipa@gmail.com'
      }
    })
  const responseBody = await response.json()
  return responseBody.accessToken
}

module.exports = {
  authToken
}

console.log(authToken)
