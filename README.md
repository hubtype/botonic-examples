# Botonic Examples

This repository contains a set of projects available implemented in
[Botonic](https://botonic.io).

Each template or example is standalone and can be initialized by running:

```bash
$ npx botonic new myBot
```

#### About Examples and Templates

**`examples`** are more curated projects that can be easily modified to fit into a particular use case for your needs.

**`templates`** are those projects that allows you to start from scratch with minimal configuration.

## Overview of Examples

<table>
  <tr>
    <th>Name</th>
    <th>Live Demo</th>
    <th>Main Features</th>
    <th>Conversational Flow</th>
  <tr>
    <td align="center"><a href="https://github.com/hubtype/botonic-examples/tree/master/examples/booking-platform">Booking Platform</a></td>
    <td align="center"><a href="https://botonic.io/examples/booking-platform/">🔗</a></td>
    <td align="center">
    - Cover component<br/>
    - Custom messages<br/>
    - Webviews
    </td>
    <td align="center">User input and components</td>

  </tr>
  <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/examples/nlu-assistant">NLU Assistant</a>
    </td>
    <td align="center"><a href="https://botonic.io/examples/nlu-assistant/">🔗</a></td>
    <td >
    - Custom NLU<br/>
    - Using external APIs<br/>
    </td>
    <td align="center">Intent recognition</td>
  </tr>
</table>

## Overview of Templates

| Template                                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Blank](https://github.com/hubtype/botonic-examples/tree/master/templates/blank)**                       | Template with empty actions. The bot will always respond with the default `404` action "I don't understand you" when you test it.                                                                                                                                                                                                                                                                                             |
| **[Tutorial](https://github.com/hubtype/botonic-examples/tree/master/templates/tutorial)**                 | Template with comments to learn by reading the source files.                                                                                                                                                                                                                                                                                                                                                                  |
| **[Childs](https://github.com/hubtype/botonic-examples/tree/master/templates/childs)**                     | Simple example on how childRoutes work. It allows you to build a bot with deep flows and navigate a decision tree using interactive elements like buttons. It is useful when you want to guide the user through a conversation with predefined flows that consist of several steps, such as surveys, pre-qualifiers of leads before human handoff, on-boarding processes, FAQs (when you have a very limited set of options). |
| **[Intent](https://github.com/hubtype/botonic-examples/tree/master/templates/intent)**                     | Bot that uses external AI like DialogFlow.                                                                                                                                                                                                                                                                                                                                                                                    |
| **[Custom Webchat](https://github.com/hubtype/botonic-examples/tree/master/templates/custom-webchat)**     | Customizable webchat that can be embedded in your website.                                                                                                                                                                                                                                                                                                                                                                    |
| **[Dynamic Carousel](https://github.com/hubtype/botonic-examples/tree/master/templates/dynamic-carousel)** | Bot that gets data from an external API and renders a Carousel. Carousels are horizontal scrollable elements with image, title and buttons for users to trigger an action.                                                                                                                                                                                                                                                    |
| **[Human handoff](https://github.com/hubtype/botonic-examples/tree/master/templates/handoff)**             | Simple bot that transfers the conversation to Hubtype Desk.                                                                                                                                                                                                                                                                                                                                                                   |
| **[NLU](https://github.com/hubtype/botonic-examples/tree/master/templates/nlu)**                           | Starter template for your project with NLU capabilities.                                                                                                                                                                                                                                                                                                                                                                      |

## Requirements

- Node.js version 10 or higher
- [NPM cli](https://docs.npmjs.com/cli/npm) or [Yarn](https://yarnpkg.com/en/)

## Contributing with new examples

1. Fork this project.
2. Create a new directory within `examples` directory:
   ```bash
   $ npx botonic new my-example
   ```
3. Select a template or an example from the prompted list to start with.
4. Let your imagination run wild.
5. Push your code.
6. Open a new [Pull Request](https://github.com/hubtype/botonic-examples/pulls).
7. We will slightly evaluate and test the project and will be merged as soon as possible. 😊
