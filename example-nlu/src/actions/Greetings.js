import { RequestContext, Text } from '@botonic/react'
import React from 'react'

export default class extends React.Component {
  static contextType = RequestContext

  render() {
    let _ = this.context.getString
    return (
      <>
        <Text>{_('greetings.intro')}</Text>
        <Text>{_('greetings.explanation')}</Text>
        <Text>{_('greetings.tryMe')}</Text>
      </>
    )
  }
}
