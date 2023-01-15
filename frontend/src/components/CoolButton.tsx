import '../styles/coolButton.css';

interface CoolBtn {
    text: string;
}
const CoolButton = ({ text }: CoolBtn) => {
    return (
        <button className='mt-2' type='submit'>
            {text}
        </button>
    );
};

export default CoolButton;
