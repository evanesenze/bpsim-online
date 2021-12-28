import React, {useState} from 'react';
import Auth from './components/Auth';
import Main from './components/Main';
import userHandler from './userHandler';
import {BrowserRouter as Router, Routes, Route ,Link, Navigate, useNavigate} from 'react-router-dom';

//import './st.css';


function App() {
  
  const [username, setUsername] = useState(null);
  const [UserHandler, setUserHandler] = useState(null);
  //const nav = useNavigate();

  const createUser = async({username, password}) => {
      const uh = new userHandler();
      await uh.doRegistration({username, password});
      await uh.checkLogin().catch(console.log)
      //uh.addProject({projectName: 'test1'}).catch(console.log)
  };


  return (
    <Router>
      
      <Routes>
        <Route path="/main" element={<Main username={username} setUsername={setUsername}/>} />
        <Route path="/*" element={<Auth createUser={createUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
