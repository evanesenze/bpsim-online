import React, {useRef} from "react";
import userHandler from '../userHandler';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes, Route ,Link, Navigate, useNavigate} from 'react-router-dom';

const AuthDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & .wrapper {
        display: flex;
        flex-direction: column;
        height: 15%;
        width: 40%;
        background-color: orange;
        padding: 2%;
        border-radius: 10px;
        justify-content: space-around;
        
        & div input {
            height: 100%;
            width: 100%;
            outline: none;
            border: none;
            border-bottom: 1px solid black;
            padding-bottom: 0;
            background-color: orange;
        }

        & div button {
            width 100%;
            background-color: orange;
            outline: none;
            border: 1px solid black;
            color: black;
            text-transform: uppercase;
            
        }
    }

    & span {
        margin-bottom: 1%;
    }
`;

function Auth({setUserHandler}){
    const username = useRef();
    const password = useRef();
    //const [cookies, setCookie] = useCookies(['csrftoken']);
    const nav = useNavigate();
    const UserHandler = new userHandler();
    const doReg = async () => {
        await UserHandler
            .doRegistration({username: username.current.value, password: password.current.value})
            .then(uh => setUserHandler(x => uh))
            .then(uh => nav('/main'))
            .catch(err => alert(err));
    };

    return (
        <AuthDiv>
            <span>Вход в систему</span>
            <div className="wrapper">
                <div><input ref={username} placeholder="Введите ник для системы" /></div>
                <div><input ref={password} placeholder="Введите пароль для системы" /></div>
                <div>
                    <button onClick={doReg} >Sign Up</button>
                    {/* <button onClick={() => nav('/main')} >Go</button> */}
                </div>
            </div>
        </AuthDiv>
    )
}

export default Auth;