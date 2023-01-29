const Filter = require('bad-words');

const parseVinylCollection = async (vinylCollection) => {
    const censor = new Filter();

    if (!vinylCollection.releases) {
        return [];
    }

    return vinylCollection.releases.map((release) => {
        const { date_added: dateAdded } = release;
        const { title, thumb, artists } = release.basic_information;
        let artistsArr = artists.map((artist) => censor.clean(artist.name));
        return {
            dateAdded,
            album: censor.clean(title),
            artists: artistsArr,
            thumbnail: thumb,
        }
    });
};

module.exports = parseVinylCollection;