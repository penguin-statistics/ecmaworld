import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const fetcher = axios.create({
  baseURL: 'http://localhost:9010',
})

function transformResponse(response: any) {
  // transformed transforms the response (an object) into an object with only camelcase keys.
  const transformed = camelcaseKeys(response, {
    deep: true,
    stopPaths: ['existence'],
  })
  // recursively, for keys ending with `I18N`, remove the `I18N` suffix and override the value.
  // e.g. `itemNameI18N` becomes `itemName`
  const recursively = (obj: any) => {
    for (const key in obj) {
      if (key.endsWith('I18N')) {
        obj[key.slice(0, -4)] = obj[key]
        delete obj[key]
      } else if (typeof obj[key] === 'object') {
        recursively(obj[key])
      }
    }
  }
  recursively(transformed)
  return transformed
}

fetcher.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: transformResponse(response.data),
    }
  },
  (error) => error,
)

export { fetcher }
