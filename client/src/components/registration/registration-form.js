import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import saveParams from '../../services/registration'

export default function RegistrationForm({onSuccess}) {
  const [responseForUser, setResponseForUser] = useState('');
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({email: '', password: ''});

  async function handleSubmit(event) {
    event.preventDefault();

    //checking for validation
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      await saveParams(userData.email, userData.password);
      setResponseForUser('Registration was successful');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      if (error.isAxiosError) {
        setResponseForUser(error.response.data);
      } else {
        setResponseForUser('Something went wrong. Try again later.');
      }
    }
  }

  function handleChange(event) {
    const key = event.target.type;
    setUserData({...userData, [key]: event.target.value});
  }

  return (
    <Form 
      noValidate validated={validated}
      onSubmit={handleSubmit} className="">
      <h4>Registration form</h4>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          required
          type="email" 
          placeholder="Enter email" 
          value={userData.email}
          onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">
          Email address must contain '@'.
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          required
          type="password" 
          placeholder="Password" 
          value={userData.password}
          onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">
          Please provide a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Text 
        className={responseForUser === 'Registration was successful'
                  ? 'text-success'
                  : 'text-danger'}>{responseForUser}</Form.Text>
      </Form.Group>

      <Button variant="outline-success" type="submit">
        Submit
      </Button>
  </Form>
  );
}
