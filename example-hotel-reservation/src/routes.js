import Start from './actions/start'
import Carousel from './actions/carousel'
import BookHotel from './actions/book-hotel'
import InfoReservation from './actions/info-reservation'
import CloseWebview from './actions/close-webview'
import Bye from './actions/bye'
import MoreHelp from './actions/more-help'

export const routes = [
  { path: 'start', text: /^start$/i, action: Start },
  { path: 'carousel', payload: 'carousel', text: /^hotel$/i, action: Carousel },
  {
    path: 'book-hotel',
    payload: /hotel-.*/,
    action: BookHotel,
  },
  {
    path: 'info-reservation',
    payload: /enviar_.*/,
    action: InfoReservation,
  },
  {
    path: 'close-webview',
    payload: 'close-webview',
    action: CloseWebview,
  },
  {
    path: 'Bye',
    payload: /rating-.*/,
    text: /^bye$/i,
    action: Bye,
  },
  {
    path: 'help',
    payload: /help-.*/,
    action: MoreHelp,
  },
]
