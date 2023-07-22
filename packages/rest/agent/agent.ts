import unfetch from 'unfetch'

const PENGUIN_BASE_URL = 'https://penguin-stats.io/api/v3alpha'

interface AgentOptions {
  method?: string
  headers?: Record<string, string>
  credentials?: 'include' | 'omit'
}

export async function unfetchAgent(path: string, options?: AgentOptions) {
  return unfetch(PENGUIN_BASE_URL + path, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: 'application/vnd.penguin.v3+json',
    },
  }).then((response) => response.json())
}

export type Agent = <T>(path: string, options?: AgentOptions) => Promise<T>
