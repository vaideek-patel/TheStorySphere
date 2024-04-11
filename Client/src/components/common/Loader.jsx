import React from 'react';
import { HashLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>
            <HashLoader color="#193a63" />
        </div>
    );
};

export default Loader;
