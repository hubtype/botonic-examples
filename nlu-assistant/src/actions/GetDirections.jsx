import { RequestContext, Text } from '@botonic/react'
import React from 'react'

import MapMessage from '../webchat/map-message'

export default class extends React.Component {
  static contextType = RequestContext

  render() {
    let _ = this.context.getString

    return (
      <>
        <Text>{_('getDirections')}</Text>
        <MapMessage lat={41.385} lon={2.173} />
        <Text>{_('getDirectionsSuggestion')}</Text>
      </>
    )
  }
}
