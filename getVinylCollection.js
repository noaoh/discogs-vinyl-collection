const fetch = require('node-fetch');

const getVinylCollection = async () => {
    const baseUrl = process.env.DISCOGS_URL;
    const user = process.env.DISCOGS_USER;
    const endpoint = `users/${user}/collection/folders/0/releases`;
    const url = `${baseUrl}/${endpoint}`;

    const token = process.env.DISCOGS_TOKEN;
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': process.env.USER_AGENT,
            Authorization: `Discogs token=${token}`,
        }
    };

    resp = await fetch(url, options);
    if (resp.status !== 200) {
        throw new Error("unable to retrieve vinyl collection from Discogs");
    }
    data = await resp.json();
    return data;
}

module.exports = getVinylCollection;
