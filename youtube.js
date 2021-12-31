const ytSearch = require('yt-search');

module.exports = {

    videoFinder: async (query) => {
        const videoResult = await ytSearch(query);
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    },

}