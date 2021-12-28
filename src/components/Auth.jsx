import React, {useRef} from "react";
import styled from 'styled-components';

const Auth = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & div {
        display: flex;
        height: 15%;
        width: 40%;
        background-color: orange;
        padding: 2%;
        border-radius: 10px;
        justify-content: space-around;
        
        & input {
            width: 30%;
            outline: none;
            border: none;
            border-bottom: 1px solid black;
            padding-bottom: 0;
            background-color: orange;
        }

        & button {
            width 20%;
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

export default function({createUser}){
    const username = useRef();
    const password = useRef();

    const doLogin = () => {
        const u = username.current.value;
        const p = password.current.value;
        createUser({username: u, password: p});
    };

    return (
        <Auth>
            <span>Вход в систему</span>
            <div>
                <input ref={username} placeholder="Введите ник для системы" />
                <input ref={password} placeholder="Введите пароль для системы" />
                <button onClick={doLogin} >Войти</button>
            </div>
        </Auth>
    )
}