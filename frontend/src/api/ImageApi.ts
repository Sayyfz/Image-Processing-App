import { fromByteArray } from 'base64-js';
import axios, { Axios, AxiosError } from 'axios';
const BASE_URL = 'http://localhost:5000';

//TODO: need to return the error string and throw the error so the try catch statement on the Home page catch and display it

// const res = await axios.get(`${BASE_URL}/api/images?${queryString}`);
// const base64Image = fromByteArray(res.data.img.data);
// return `data:image/jpeg;base64, ${base64Image}`;
export const resizeImg = async (queryString: string) => {
    try {
        const res = await fetch(`${BASE_URL}/api/images?${queryString}`, {
            method: 'GET',
        });

        if (!res.ok) {
            throw new Error();
            // console.log(res.body);
        }
        console.log(res);

        const imgBuffer = await res.arrayBuffer();
        const base64Image = fromByteArray(new Uint8Array(imgBuffer));

        return `data:image/jpeg;base64, ${base64Image}`;
    } catch (err) {
        throw err;
    }
};
