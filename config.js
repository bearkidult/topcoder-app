module.exports = function() {
  var constants = {
    'development': {
      'CONSTANTS': {
        API_URL: process.env.API_URL || 'https://api.topcoder-dev.com/v3',
        API_URL_V2: process.env.API_URL_V2 || 'https://api.topcoder-dev.com/v2',
        ASSET_PREFIX: process.env.ASSET_PREFIX || '',
        auth0Callback: process.env.auth0Callback || 'https://api.topcoder-dev.com/pub/callback.html',
        // auth0Callback: process.env.auth0Callback || 'https://www.topcoder-dev.com/reg2/callback.action',
        auth0Domain: process.env.auth0Domain || 'topcoder-dev.auth0.com',
        BLOG_LOCATION: 'https://www.topcoder-dev.com/feed/?post_type=blog',
        clientId: process.env.clientId || 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
        COMMUNITY_URL: '//community.topcoder-dev.com',
        domain: process.env.domain || 'topcoder-dev.com',
        ENVIRONMENT: process.env.ENVIRONMENT || 'development',
        FORUMS_APP_URL: 'forums.topcoder-dev.com',
        HELP_APP_URL: 'help.topcoder-dev.com',
        MAIN_URL: 'https://www.topcoder-dev.com',
        NEW_CHALLENGES_URL: 'https://www.topcoder.com/challenges/develop/upcoming/',
        NEW_RELIC_APPLICATION_ID: process.env.NEW_RELIC_APPLICATION_ID || '',
        PHOTO_LINK_LOCATION: 'https://community.topcoder-dev.com',
        submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',
        SWIFT_PROGRAM_ID: 3445,
        SWIFT_PROGRAM_URL: 'apple.topcoder-dev.com',
        UPCOMING_SRMS_URL: 'https://www.topcoder.com/challenges/data/upcoming/',

        // EVENTS
        EVENT_USER_LOGGED_IN: 'user_logged_in',
        EVENT_USER_LOGGED_OUT: 'user_logged_out',

        STATE_LOADING: 'loading',
        STATE_ERROR: 'error',
        STATE_READY: 'ready'

      }
    },
    'qa': {
      'CONSTANTS': {
        API_URL: process.env.API_URL || 'https://api.topcoder-qa.com/v3',
        API_URL_V2: process.env.API_URL_V2 || 'https://api.topcoder-qa.com/v2',
        ASSET_PREFIX: process.env.ASSET_PREFIX || '',
        auth0Callback: process.env.auth0Callback || 'https://api.topcoder-qa.com/pub/callback.html',
        // auth0Callback: process.env.auth0Callback || 'https://www.topcoder-qa.com/reg2/callback.action',
        auth0Domain: process.env.auth0Domain || 'topcoder-qa.auth0.com',
        BLOG_LOCATION: 'https://www.topcoder-qa.com/feed/?post_type=blog',
        clientId: process.env.clientId || 'EVOgWZlCtIFlbehkq02treuRRoJk12UR',
        COMMUNITY_URL: '//community.topcoder-qa.com',
        domain: process.env.domain || 'topcoder-qa.com',
        ENVIRONMENT: process.env.ENVIRONMENT || 'qa',
        FORUMS_APP_URL: 'forums.topcoder-qa.com',
        HELP_APP_URL: 'help.topcoder-qa.com',
        MAIN_URL: 'https://www.topcoder-qa.com',
        NEW_CHALLENGES_URL: 'https://www.topcoder.com/challenges/develop/upcoming/',
        NEW_RELIC_APPLICATION_ID: process.env.NEW_RELIC_APPLICATION_ID || '',
        PHOTO_LINK_LOCATION: 'https://community.topcoder-qa.com',
        submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',
        SWIFT_PROGRAM_ID: 3445,
        SWIFT_PROGRAM_URL: 'apple.topcoder-qa.com',
        UPCOMING_SRMS_URL: 'https://www.topcoder.com/challenges/data/upcoming/',

        // EVENTS
        EVENT_USER_LOGGED_IN: 'user_logged_in',
        EVENT_USER_LOGGED_OUT: 'user_logged_out',

        STATE_LOADING: 'loading',
        STATE_ERROR: 'error',
        STATE_READY: 'ready'

      }
    },
    'production': {
      'CONSTANTS': {
        API_URL: process.env.API_URL || 'https://api.topcoder.com/v3',
        API_URL_V2: process.env.API_URL_V2 || 'https://api.topcoder.com/v2',
        ASSET_PREFIX: process.env.ASSET_PREFIX || 'https://s3.amazonaws.com/app.topcoder-dev.com',
        auth0Callback: process.env.auth0Callback || 'https://api.topcoder.com/pub/callback.html',
        // auth0Callback: process.env.auth0Callback || 'https://www.topcoder.com/reg2/callback.action',
        auth0Domain: process.env.auth0Domain || 'topcoder.auth0.com',
        BLOG_LOCATION: 'https://www.topcoder.com/feed/?post_type=blog',
        clientId: process.env.clientId || 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT',
        COMMUNITY_URL: '//community.topcoder.com',
        domain: process.env.domain || 'topcoder.com',
        ENVIRONMENT: process.env.ENVIRONMENT || 'production',
        FORUMS_APP_URL: 'forums.topcoder.com',
        HELP_APP_URL: 'help.topcoder.com',
        MAIN_URL: 'https://www.topcoder.com',
        NEW_CHALLENGES_URL: 'https://www.topcoder.com/challenges/develop/upcoming/',
        NEW_RELIC_APPLICATION_ID: process.env.NEW_RELIC_APPLICATION_ID || '',
        PHOTO_LINK_LOCATION: 'https://community.topcoder.com',
        submissionDownloadPath: '/review/actions/DownloadContestSubmission?uid=',
        SWIFT_PROGRAM_ID: 3445,
        SWIFT_PROGRAM_URL: 'apple.topcoder.com',
        UPCOMING_SRMS_URL: 'https://www.topcoder.com/challenges/data/upcoming/',

        // EVENTS
        EVENT_USER_LOGGED_IN: 'user_logged_in',
        EVENT_USER_LOGGED_OUT: 'user_logged_out',

        STATE_LOADING: 'loading',
        STATE_ERROR: 'error',
        STATE_READY: 'ready'

      }
    }
  };

  return constants;
};
