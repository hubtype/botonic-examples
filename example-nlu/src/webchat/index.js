import { getLocationInfo } from './location'
import MapMessage from './map-message'
import 'leaflet/dist/leaflet.css'

export const webchat = {
  onInit: async app => {
    app.open()
    const locationInfo = await getLocationInfo()
    app.updateUser({ locationInfo: locationInfo })
  },
  onOpen: app => app.addUserText('hi'),

  theme: {
    message: {
      customTypes: [MapMessage],
    },
  },
}
