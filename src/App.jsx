import React, {useState, useEffect} from 'react';
import Auth from './components/Auth';
import Main from './components/Main';
import {Routes, Route} from 'react-router-dom';

import userHandler from './userHandler';

//import './st.css';


function App(props) {
  //const [username, setUsername] = useState(null);
  const [UserHandler, setUserHandler] = useState(new userHandler({username: 'test', password: 'test'}));
  //console.log(props);
  return (
      <Routes>
        <Route path="/main" element={<Main UserHandler={UserHandler}/>} />
        <Route path="/*" element={<Auth setUserHandler={setUserHandler} />} />
      </Routes>
  );
}

export default App;
