const API_BASE_URL = '/api'

// query string 생성
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// 공통 fetch 래퍼
async function fetchApi<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}${buildQueryString(params)}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export { fetchApi, buildQueryString }
