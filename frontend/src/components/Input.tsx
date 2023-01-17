import { ReactNode, useEffect, useState } from 'react';
import '../styles/input.css';

interface InputField {
    str: string;
    query: string;
    setQuery: Function;
    type?: string;
}

const Input = ({ str, query, setQuery, type }: InputField) => {
    const [label, setLabel] = useState(['']);

    useEffect(() => {
        setLabel(str.split(''));
    }, [str]);

    return (
        <div className='form-control-custom d-flex justify-content-center align-items-center'>
            <input
                type={type ? type : 'value'}
                required
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                }}
            />
            <label>
                {
                    label.map((char, index) => (
                        <span
                            className='pb-2'
                            key={index}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {char}
                        </span>
                    )) as ReactNode
                }
            </label>
        </div>
    );
};

export default Input;
