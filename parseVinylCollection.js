const parseVinylCollection = (vinylCollection) => {
    if (!vinylCollection.releases) {
        return [];
    }

    return vinylCollection.releases.map((release) => {
        const { title, thumb, artists } = release.basic_information;
        let artistsArr = artists.map((artist) => artist.name);
        return {
            album: title,
            artists: artistsArr,
            thumbnail: thumb,
        }
    });
};

module.exports = parseVinylCollection;