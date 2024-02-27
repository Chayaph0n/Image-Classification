import { useState, useEffect } from 'react';
import value from '../css/value';

const Navbar = () => {
    const [color, setColor] = useState(false);

    const changeColor = () => {
        if (window.scrollY >= 10) {
        setColor(true);
        } else {
        setColor(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeColor);
        return () => {
            //prevent memory leak
            window.removeEventListener('scroll', changeColor);
        };
    }, []);

    return (
        <>
            <nav className={color ? 'backdrop-blur-md transition-colors' : ''}>
                <div className='flex items-center gap-4'>
                    <img className='w-12 h-8' src="/src/assets/logo.png" alt="" />
                    <h1 className='text-white font-extrabold text-3xl'>ISA CLASSIFY</h1>
                </div>
                {/* <div className='flex justify-between w-96 items-center'>
                    <h1 className={`${value.option}`}>Home</h1>
                    <h1 className={`${value.option}`}>option1</h1>
                    <h1 className={`${value.option}`}>option2</h1>
                    <h1 className={`${value.option}`}>option3</h1>
                    <h1 className={`${value.option}`}>Logout</h1>
                </div> */}
            </nav>
        </>
    );
};

export default Navbar;
