export const defaultBookmarks = [
  {
    name: 'Google',
    url: 'google.com',
  },
  {
    name: 'Youtube',
    url: 'youtube.com',
  },
  {
    name: 'Twitch',
    url: 'twitch.com',
  },
  {
    name: 'Twitter',
    url: 'twitter.com',
  },
  {
    name: 'Instagram',
    url: 'instagram.com',
  },
  {
    name: 'Facebook',
    url: 'facebook.com',
  },
  {
    name: 'Reddit',
    url: 'reddit.com',
  },
];

export const urlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
