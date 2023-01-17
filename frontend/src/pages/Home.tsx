import React, { FormEvent, useState } from 'react';
import { resizeImg } from '../api/ImageApi';
import CoolButton from '../components/CoolButton';
import Input from '../components/Input';

interface ImageApiError {
    data: string;
}

//TODO: adjust shown image to take its original size

const MAX_DIMENSIONS = 2000;

const Home = () => {
    const [name, setName] = useState('');
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
            width: Math.max(parseInt(width), MAX_DIMENSIONS).toString(),
            height: Math.max(parseInt(height), MAX_DIMENSIONS).toString(),
        };
        const queryString = new URLSearchParams(queryParams).toString();

        try {
            const res = await resizeImg(queryString);
            setImg(res);
        } catch (err) {
            setError((err as ImageApiError).data);
        }
    };

    const resetFields = () => {
        setName('');
        setWidth('');
        setHeight('');
        setImg('');
        setError('');
    };

    return (
        <main className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <form
                onSubmit={handleSubmit}
                className=' mx-4 d-flex flex-column gap-4 align-items-center main-form'
            >
                <h1> Enter Image Details </h1>
                <Input str='Name' query={name} setQuery={setName} />
                <Input str='Width' query={width} setQuery={setWidth} type={'number'} />
                <Input str='Height' query={height} setQuery={setHeight} type={'number'} />
                {error && <div className='error text-danger'>{error}</div>}
                <CoolButton text={'Submit'} />
            </form>
            {img ? (
                <div>
                    <img src={img} alt='Resized Img' />
                    {/* <span className="d-block">All images are shown in 200x200 view, but its stored in the backend a</span> */}
                </div>
            ) : null}
        </main>
    );
};

export default Home;
