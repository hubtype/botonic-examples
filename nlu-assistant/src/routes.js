import Greetings from './actions/Greetings'
import Farewell from './actions/Farewell'
import Jokes from './actions/Jokes'
import GetDirections from './actions/GetDirections'
import Weather from './actions/Weather'
import Thanks from './actions/Thanks'
import NotFound from './actions/NotFound'

const withConfidence = (input, intent) => input.intents.some(int => int.label === intent && int.confidence >= 0.4)
 
export const routes = [
  { input: i => withConfidence(i, 'Greetings'), action: Greetings },
  { input: i => withConfidence(i, 'Farewell'), action: Farewell },
  { input: i => withConfidence(i, 'Jokes'), action: Jokes },
  { input: i => withConfidence(i, 'GetDirections'), action: GetDirections },
  { input: i => withConfidence(i, 'Weather'), action: Weather },
  { input: i => withConfidence(i, 'Thanks'), action: Thanks },
  { path: '404', action: NotFound },
]
