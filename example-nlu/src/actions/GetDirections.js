import { RequestContext, Text } from '@botonic/react'
import React from 'react'

import MapMessage from '../webchat/map-message'

export default class extends React.Component {
  static contextType = RequestContext

  render() {
    let _ = this.context.getString
    const locationInfo = this.context.session.user.locationInfo

    return (
      <>
        <Text>{_('getDirections')}</Text>
        {locationInfo.lat && locationInfo.lon && (
          <MapMessage lat={locationInfo.lat} lon={locationInfo.lon} />
        )}
      </>
    )
  }
}
