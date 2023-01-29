const Filter = require('bad-words');

const parseVinylCollection = (vinylCollection) => {
    const censor = new Filter();

    if (!vinylCollection.releases) {
        return [];
    }

    return vinylCollection.releases.map((release) => {
        const { date_added: dateAdded } = release;
        const { title, thumb, artists } = release.basic_information;
        let artistsArr = artists
            .map((artist) => censor.clean(artist))
            .map((artist) => artist === 'Duster (2)' ? 'Duster' : artist);
        if (artistsArr.includes(''))
        artistsArr.sort((a, b) => a.localeCompare(b));
        return {
            dateAdded,
            album: censor.clean(title),
            artists: artistsArr,
            thumbnail: thumb,
            needsBlur: title === "The Money Store",
        }
    });
};

module.exports = parseVinylCollection;