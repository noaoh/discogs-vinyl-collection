const Filter = require('bad-words');
const { v4: uuid } = require('uuid');

const parseVinylCollection = (vinylCollection) => {
    const censor = new Filter();

    if (!vinylCollection.releases) {
        return [];
    }

    return vinylCollection.releases.map((release) => {
        const { date_added: dateAdded } = release;
        const { title, thumb, artists } = release.basic_information;
        let artistsArr = artists
            .map((artist) => censor.clean(artist.name))
            .map((artist) => artist === 'Duster (2)' ? 'Duster' : artist);
        artistsArr.sort((a, b) => a.localeCompare(b));

        return {
            id: uuid(),
            item: {
                dateAdded,
                album: censor.clean(title),
                artists: artistsArr,
                thumbnail: thumb,
                needsBlur: title === "The Money Store",
            }
        }
    });
};

module.exports = parseVinylCollection;