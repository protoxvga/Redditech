import { authorize } from 'react-native-app-auth';

import { CLIENT_ID, CLIENT_ID_BASE_64 } from '@env';

export default function Auth() {
  const config = {
    redirectUrl: 'com.redditech://oauth2redirect/reddit',
    clientId: CLIENT_ID,
    clientSecret: '',
    scopes: ['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
      tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
      token: {
        Authorization: CLIENT_ID_BASE_64,
      },
    },
    additionalParameters: {
        duration: 'permanent',
    },
  };

  const res = authorize(config);
  return (res);
}