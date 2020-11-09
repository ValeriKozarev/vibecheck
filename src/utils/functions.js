/**
 * simple helper to deconstruct URL so we can grab the access token
 * Author: Yogesh Chavan
 * Source: https://github.com/myogeshchavan97/spotify-music-search-app/tree/final-code/src/utils
 */
export const getParamValues = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});
};
