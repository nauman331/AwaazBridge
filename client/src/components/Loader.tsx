import React from 'react'
import "./loader.css";

const Loader: React.FC = () => {
    return (
        <div className="fire">
            <div className="fire-left">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-center">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-right">
                <div className="main-fire"></div>
                <div className="particle-fire"></div>
            </div>
            <div className="fire-bottom">
                <div className="main-fire"></div>
            </div>
        </div>
    )
}

export default Loader;