import React, { FormEvent, useState } from 'react';
import { resizeImg } from '../api/ImageApi';
import CoolButton from '../components/CoolButton';
import Input from '../components/Input';

interface ImageApiError {
    data: string;
}

//TODO: adjust shown image to take its original size
//TODO: add uploading functionality

const MAX_DIMENSIONS = 2000;

const Home = () => {
    const [name, setName] = useState('');
    const [widthQuery, setWidthQuery] = useState('');
    const [heightQuery, setHeightQuery] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [error, setError] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetFields();

        //We are not allowing the user to resize the image to more than the MAX_DIMENSIONS constant
        //We cant allow any value to be processed since it will be very resource heavy potentially
        const queryParams = {
            filename: name,
            width: Math.max(parseInt(widthQuery), MAX_DIMENSIONS).toString(),
            height: Math.max(parseInt(heightQuery), MAX_DIMENSIONS).toString(),
        };
        const queryString = new URLSearchParams(queryParams).toString();

        try {
            const res = await resizeImg(queryString);
            setImg(res);
            setHeight(heightQuery);
            setWidth(widthQuery);
        } catch (err) {
            setError((err as ImageApiError).data);
        }
    };

    const resetFields = () => {
        setName('');
        setWidthQuery('');
        setHeightQuery('');
        setImg('');
        setError('');
    };

    // const uploadFile = () => {};
    // const handleUpload = () => {};

    return (
        <main className='w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative'>
            <form
                onSubmit={handleSubmit}
                className=' mx-4 d-flex flex-column gap-4 align-items-center main-form mb-5'
            >
                <h1> Enter Image Details </h1>
                <Input str='Name' query={name} setQuery={setName} />
                <Input str='Width' query={widthQuery} setQuery={setWidthQuery} type={'number'} />
                <Input str='Height' query={heightQuery} setQuery={setHeightQuery} type={'number'} />
                {error && <div className='error text-danger'>{error}</div>}
                <CoolButton text={'Submit'} />
            </form>

            <div className='img-container d-flex flex-column align-items-center'>
                <br />
                {img ? (
                    <div className='d-flex flex-column align-items-center gap-4'>
                        <h2>Here is your image</h2>
                        <img
                            style={{
                                // aspectRatio: `${parseInt(width) / parseInt(height)}`,
                                height: parseInt(height),
                                width: parseInt(width),
                            }}
                            src={img}
                            alt='Resized Img'
                        />
                        <span className='text-muted text-center d-block'>
                            The maximum shown dimensions will be 500x500 - even if you entered a
                            larger value - to avoid having the image taking potentially too large
                            space in the browser window. However, the image originally will be saved
                            with the dimensions you entered.
                        </span>
                    </div>
                ) : null}
            </div>

            {/* <div onClick={uploadFile} className='upload'>
                <label htmlFor='file-input'>
                    <i title='Upload your own image' className='fa-solid fa-upload'></i>
                </label>
                <input
                    onChange={handleUpload}
                    id='file-input'
                    type='file'
                    style={{ display: 'none' }}
                />
            </div> */}
        </main>
    );
};

export default Home;
