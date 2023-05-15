const authToken = async (request) => {
    const response = await request.post('https://k-ampus.dev/api/v1/login', {
        data: {
          username: 'skhalipa@gmail.com',
          password: 'skhalipa@gmail.com',
        }
})
    const responseBody = JSON.parse(await response.text());
    return responseBody.accessToken
    
  
  }

