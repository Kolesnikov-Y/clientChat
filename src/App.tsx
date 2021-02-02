import React from 'react';
import './pages/style/style.css'
import UserContainer from './pages/user/UserContainer';


function App(): JSX.Element {

    // const a = `14413628235-o9h09ul5k9m9715udfnrms3i1b1pb28d.apps.googleusercontent.com`

  return (
    <div className="App">
        <header className='header'>
          HEADER
        </header>
      <div className="container">
          <UserContainer/>
      </div>

       
      </div>
  );
}

export default App;
