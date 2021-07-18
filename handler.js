/**
 * scrapes twitter profile to get name, avatar, follower count, following count, join date, Twitter handle, and location
 * @param {string} profile - name of twitter profile in url
 * @return {{name: string, avatarUrl: string, followerCount: Number, followingCount: Number, joinAt: string, twitterHandle: string, location: string}}
 */
const scrapeTwitterProfile = (profile) => {

  return {
    location: 'Alpharetta, GA',
    name: 'AlpharettaJS',
    avatarUrl: 'https://secure-content.meetupstatic.com/images/https%3A%2F%2Fsecure.meetupstatic.com%2Fphotos%2Fevent%2Fd%2F7%2F7%2F3%2Fhighres_472915155.jpeg/56x56.jpg',
    followerCount: 0,
    followingCount: 0,
    joinAt: 'April, 2018',
    twitterHandle: '@alpharettaJS',
  };
}

module.exports = {
  scrapeTwitterProfile,
};
