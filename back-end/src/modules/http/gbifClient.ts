import axios from 'axios';

export const GBIF_OCCURENCE_API = axios.create({
    baseURL: 'https://api.gbif.org/v1/occurrence',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
    },
});
