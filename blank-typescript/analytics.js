const Analytics = require('analytics-node')
const fs = require('fs')
const os = require('os')
const path = require('path')

const BOTONIC_HOME_PATH = path.join(os.homedir(), '.botonic')
const BOTONIC_CREDENTIALS_PATH = path.join(
  BOTONIC_HOME_PATH,
  'credentials.json'
)

let credentials
const analytics = new Analytics('YD0jpJHNGW12uhLNbgB4wbdTRQ4Cy1Zu')

function analyticsEnabled() {
  return process.env.BOTONIC_DISABLE_ANALYTICS !== '1'
}

function getSystemInformation() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  }
}

function initializeCredentials() {
  if (!fs.existsSync(BOTONIC_HOME_PATH)) fs.mkdirSync(BOTONIC_HOME_PATH)
  const anonymous_id = Math.round(Math.random() * 100000000)
  fs.writeFileSync(
    botonic_credentials_path,
    JSON.stringify({ analytics: { anonymous_id } })
  )
}

function readCredentials() {
  if (!fs.existsSync(BOTONIC_CREDENTIALS_PATH)) {
    initializeCredentials()
  }
  try {
    credentials = JSON.parse(fs.readFileSync(BOTONIC_CREDENTIALS_PATH, 'utf8'))
  } catch (e) {
    if (fs.existsSync(BOTONIC_CREDENTIALS_PATH)) {
      console.warn('Credentials could not be loaded', e)
    }
  }
}

function track(event, properties = {}) {
  if (analyticsEnabled() && analytics && credentials && credentials.analytics) {
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
try {
  readCredentials()
  if (MODE === 'serve') track('Served Botonic CLI')
  if (MODE === 'train') track('Trained with Botonic train')
} catch (e) {
  console.warn('Credentials could not be loaded', e)
}
