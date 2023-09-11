import React, {useState} from 'react';
import './App.css';
import LoginRegister from './components/LoginRegister'
import Main from './components/Main'
import SessionContext, { useSession } from './contexts/SessionContext'

function App() {
  const [session, setSession] = useSession(null);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
 
  const handleSignUpClick = () => {
    setIsLoginVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  return (
    <>
      <SessionContext.Provider value={ {session, setSession} }>
        {session ? <Main /> : <LoginRegister />}
      </SessionContext.Provider>
    </>
  );
}

export default App;
