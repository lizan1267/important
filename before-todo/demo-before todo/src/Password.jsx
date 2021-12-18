import React from 'react';

const Password= (props) =>{
    let {pwd}=props;
    return (
        <div>
            <label htmlFor="password">{ pwd }</label>
            <input type="password" id="password"/>
        </div>
    );
}
export default Password;