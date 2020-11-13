import { RequestContext, Text } from '@botonic/react'
import React from 'react'

export default class extends React.Component {
  static contextType = RequestContext
  static async botonicInit({ input }) {
    return { input }
  }

  render() {
    return (
      <>
        <Text>{JSON.stringify(this.props.input.intents)}</Text>
      </>
    )
  }
}
