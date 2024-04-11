import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/');
    }

    return (
        <div>
            <div className="backg">
                <div className="sand"></div>
                <div className="tower">
                    <div className="s1"></div>
                    <div className="s2"></div>
                    <div className="door1"></div>
                    <div className="door2"></div>
                    <div className="balcony">
                        <div className="b1"></div>
                        <div className="b2"></div>
                        <div className="b3"></div>
                        <div className="b4"></div>
                        <div className="b5"></div>
                        <div className="b6"></div>
                        <div className="b7"></div>
                        <div className="b8"></div>
                        <div className="b9"></div>
                    </div>
                    <div className="s3"></div>
                    <div className="s4"></div>
                    <div className="dome"></div>
                    <div className="glass"></div>
                    <div className="s5"></div>
                    <div className="light"></div>
                    <div className="sand1"></div>
                    <div className="sand2"></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
