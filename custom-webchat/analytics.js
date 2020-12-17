const os = require('os')

function analytics_enabled() {
  return process.env.BOTONIC_DISABLE_ANALYTICS !== '1'
}

function getSystemInformation() {
  return {
    platform: os.platform(),
    version: os.version(),
    arch: os.arch(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  }
}

function track(event, properties = {}) {
  if (
    analytics_enabled() &&
    analytics &&
    credentials &&
    credentials.analytics
  ) {
    properties = {
      ...properties,
      ...getSystemInformation(),
    }
    analytics.track({
      event: event,
      anonymousId: credentials.analytics.anonymous_id,
      properties: properties,
    })
  }
}

const MODE = process.argv[2]
if (MODE === 'serve') track('Served Botonic CLI')
if (MODE === 'train') track('Trained with Botonic train')
