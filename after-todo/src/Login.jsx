import React from 'react';
import User from './User';
import Password from './Password'
import Button from './Button';

const Login=()=>{
    return(
        <div>
            <User user="用户名" />
            <Password pwd="密码" />
            <Button name="登录" />
        </div>
    );
}

export default Login;