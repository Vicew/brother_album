let isDev = true
let devBaseUrl = 'http://localhost:3000'
let prodBaseUrl = 'https://'
let baseUrl = isDev ? devBaseUrl : prodBaseUrl
export default baseUrl
export { isDev }
