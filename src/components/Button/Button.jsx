import React from 'react';
import './Button.css';

const Button = (props) => {
    const { className, ...rest } = props;
    return (
        <button {...rest} className={`button ${className}`} />
    );
};

export default Button;
