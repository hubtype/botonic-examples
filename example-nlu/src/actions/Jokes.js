import { RequestContext, Text } from '@botonic/react'
import React from 'react'
import axios from 'axios'
export default class extends React.Component {
  static contextType = RequestContext

  static async botonicInit() {
    try {
      const res = await axios.get('https://api.jokes.one/jod')
      return { joke: res.data.contents.jokes[0].joke.text }
    } catch (e) {
      return { joke: undefined }
    }
  }

  render() {
    let _ = this.context.getString
    return (
      <>
        <Text>{_('jokes')}</Text>
        {this.props.joke ? (
          <Text>"{this.props.joke}"</Text>
        ) : (
          <Text>{_('jokesError')}</Text>
        )}
      </>
    )
  }
}
