import { customMessage, WebchatContext } from '@botonic/react'
import React from 'react'

let MapContainer, TileLayer
if (typeof window !== 'undefined') {
  MapContainer = require('react-leaflet').MapContainer
  TileLayer = require('react-leaflet').TileLayer
}

class MapMessage extends React.Component {
  static contextType = WebchatContext
  constructor(props) {
    super(props)
  }

  render() {
    if (typeof window !== 'undefined')
      return (
        <MapContainer
          center={[this.props.lat, this.props.lon]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: 200, width: 200 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </MapContainer>
      )
    else return null
  }
}

export default customMessage({
  name: 'map-message',
  component: MapMessage,
  defaultProps: {
    style: {
      maxWidth: '90%',
      borderColor: 'black',
    },
  },
})
