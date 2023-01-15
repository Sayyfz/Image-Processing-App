import React, { FormEvent, FormEventHandler, useState } from 'react';
import CoolButton from '../components/CoolButton';
import Input from '../components/Input';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const Home = () => {
    const [name, setName] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [img, setImg] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        resetFields();

        e.preventDefault();

        const queryParams = {
            filename: name,
            width,
            height,
        };

        const queryString = new URLSearchParams(queryParams).toString();

        // axios
        //     .get(`${BASE_URL}/api/images?${queryString}`)
        //     .then(res => {
        //         setImg(res.data);
        //     })
        //     .catch((err: Error) => {
        //         console.log(err.message);
        //     });
    };

    const resetFields = () => {
        setName('');
        setWidth('');
        setHeight('');
    };

    return (
        <main className='w-100 h-100 d-flex justify-content-center align-items-center'>
            <form
                onSubmit={handleSubmit}
                className=' mx-4 d-flex flex-column gap-4 align-items-center main-form'
            >
                <h1> Enter Image Details </h1>
                <Input str='Name' query={name} setQuery={setName} />
                <Input str='Width' query={width} setQuery={setWidth} />
                <Input str='Height' query={height} setQuery={setHeight} />
                <CoolButton text={'Submit'} />
                {/* {
                    <img
                        src={'http://localhost:5000/api/images?filename=fjord&width=200&height=200'}
                        alt=''
                    />
                } */}
            </form>
        </main>
    );
};

export default Home;
