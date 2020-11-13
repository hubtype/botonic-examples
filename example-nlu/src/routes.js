import Start from './actions/start'

export const routes = [{ input: i => i.data !== undefined, action: Start }]
