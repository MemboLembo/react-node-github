import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import MyModal from './components/modal';
import User from './components/user/user';
import RegistrationForm from './components/registration/registration-form';
import AuthorizationForm from './components/authorization/authorization-form';
import AddRepoForm from './components/user/add-repo/add-repo-form';
import { Context, RepoContext } from "./context";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [renderLogin, setRenderLogin] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //what tipe of form will be in the form
  const [buttonType, setbuttonType] = useState('');
  const [repo, setRepo] = useState([]);
  const [userId, setUserId] = useState();
  
  return (
    <Context.Provider value={{ setRenderLogin, setRepo }}>
      { renderLogin ? (
        <div>
          <ButtonGroup size="lg" className="mb-2">
            <Button variant="outline-info" onClick={() => {
              setModalIsOpen(true);
              setbuttonType('login');
            }}>Login</Button>
            <Button variant="outline-info" onClick={() => {
              setModalIsOpen(true);
              setbuttonType('register');
            }}>Register</Button>
          </ButtonGroup>
        </div>
      ) : (
        <User {...{ setRenderLogin, setModalIsOpen, setbuttonType, repo, userId, setRepo }}/>
      )}
      <RepoContext.Provider value={{ setRepo }}>
        <MyModal {...{ modalIsOpen, buttonType, onClose: () => setModalIsOpen(false) }}>
            {buttonType === 'register' 
            ? (<RegistrationForm onSuccess={() => setModalIsOpen(false)}/>)
            : buttonType === 'login' 
            ? (<AuthorizationForm {...{onSuccess: () => setModalIsOpen(false), setUserId}}/>)
            : buttonType === 'add-repo' 
            ? (<AddRepoForm {...{onSuccess: () => setModalIsOpen(false), userId}}/>)
            : (<div>Error</div>)
            }
        </MyModal>
      </RepoContext.Provider>
    </Context.Provider>
  );
}

export default App;
