const parseVinylCollection = (vinylCollection) => {
    if (!vinylCollection.releases) {
        return [];
    }

    return vinylCollection.releases.map((release) => {
        const { date_added: dateAdded } = release;
        const { title, thumb, artists } = release.basic_information;
        let artistsArr = artists.map((artist) => artist.name);
        return {
            dateAdded,
            album: title,
            artists: artistsArr,
            thumbnail: thumb,
        }
    });
};

module.exports = parseVinylCollection;