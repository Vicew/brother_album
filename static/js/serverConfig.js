let isDev = false
let devBaseUrl = 'http://localhost:3000'
let prodBaseUrl = 'https://album.pandaomeng.com'
let baseUrl = isDev ? devBaseUrl : prodBaseUrl
export default baseUrl
export { isDev }
