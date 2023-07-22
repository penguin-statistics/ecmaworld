import { Agent, unfetchAgent } from './agent/agent'
import { InitResponse } from './v3/init'

export const createClient = (agent: Agent) => ({
  getInit: () => agent<InitResponse>('/init'),
})

// default client re-exports
const { getInit } = createClient(unfetchAgent)
export { getInit }
