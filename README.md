# Botonic Examples

This repository contains a set of projects available implemented in
[Botonic](https://botonic.io).

Each example is standalone and can be initialized by running:

```bash
$ botonic new myBot
```

and select it from the selector.

## Overview of Examples

<table>
  <tr>
    <th>Name</th>
    <th>Live Demo</th>
    <th>Description</th>
  <tr>
    <td align="center"><a href="https://github.com/hubtype/botonic-examples/tree/master/example-hotel-reservation">Booking Platform</a></td>
    <td align="center"><a href="https://botonic.io/booking-platform/">🔗</a></td>
    <td>This example shows you how to make a reservation in a hotel using a cover component, custom messages and webviews.</td>
  </tr>
  <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/example-nlu">NLU Assistant</a>
    </td>
    <td align="center"><a href="https://botonic.io/nlu-assistant/">🔗</a></td>
    <td>This example shows you how to train a custom model using Botonic NLU and take profit of it in order to recognize user intents.</td>
  </tr>
  <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/blank">Blank</a>
    </td>
    <td align="center"></td>
    <td>Example with empty actions. The bot will always respond with the default `404` action "I don't understand you" when you test it.</td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/tutorial">Tutorial</a>
    </td>
    <td align="center"></td>
    <td>Example with comments to learn by reading the source files.
    </td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/custom-webchat">Custom Webchat
    </a>
    </td>
    <td align="center"></td>
    <td>Customizable webchat that can be embedded in your website.</td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/nlu">NLU</a>
    </td>
    <td align="center"></td>
    <td>Starter example for your project with NLU capabilities.
    </td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/handoff">Human Handoff</a>
    </td>
    <td align="center"></td>
    <td>Simple bot that transfers the conversation to Hubtype Desk.</td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/intent">Intent</a>
    </td>
    <td align="center"></td>
    <td>Bot that uses external AI like DialogFlow.</td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/dynamic-carousel">Dynamic Carousel</a>
    </td>
    <td align="center"></td>
    <td>Bot that gets data from an external API and renders a Carousel. Carousels are horizontal scrollable elements with image, title and buttons for users to trigger an action.</td>
    <td ></td>
  </tr>
    <tr>
    <td align="center">
    <a href="https://github.com/hubtype/botonic-examples/tree/master/childs">Childs</a>
    </td>
    <td align="center"></td>
    <td>Simple example on how childRoutes work. It allows you to build a bot with deep flows and navigate a decision tree using interactive elements like buttons.</td>
    <td ></td>

</table>

## Requirements

- Node.js version 10 or higher
- [NPM cli](https://docs.npmjs.com/cli/npm) or [Yarn](https://yarnpkg.com/en/)

## Contributing with new examples

1. Fork this project.
2. Create a new directory within `examples` directory:
   ```bash
   $ botonic new my-example
   ```
3. Select an example from the prompted list to start with.
4. Let your imagination run wild.
5. Push your code.
6. Open a new [Pull Request](https://github.com/hubtype/botonic-examples/pulls).
7. We will slightly evaluate and test the project and will be merged as soon as possible. 😊
