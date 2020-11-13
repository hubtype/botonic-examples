import axios from 'axios'
import L from 'leaflet'

export const getLocationInfo = async () => {
  try {
    const {
      data: { ip },
    } = await axios.get('http://api.ipify.org/?format=json')
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`)
    return data
  } catch (e) {
    console.log({ e })
  }
}

// // Where you want to render the map.
// const osmMap = document.createElement('div')
// osmMap.id = 'osm-map'
// document.getElementById('root').appendChild(osmMap)
// const element = document.getElementById('osm-map')
// // Height has to be set. You can do this in CSS too.
// element.style = 'height:300px;width:300px;'
// // Create Leaflet map on map element.
// const map = L.map(element)
// // Add OSM tile leayer to the Leaflet map.
// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map)
// // Target's GPS coordinates.
// const target = L.latLng(String(locationInfo.lat), String(locationInfo.lon))
// // Set map's center to target with zoom 14.
// map.setView(target, 14)
