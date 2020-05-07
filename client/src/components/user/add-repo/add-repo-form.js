import React, {  useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addRepoToDB } from '../../../services/repositories'
import { RepoContext } from "../../../context";

export default function AddRepoForm({onSuccess, userId}) {
  const [responseForUser, setResponseForUser] = useState('');
  const [userData, setUserData] = useState({user: '', repository: ''});
  const [validated, setValidated] = useState(false);
  const { setRepo } = useContext(RepoContext);

  async function handleSubmit(event) {
    event.preventDefault()
    //checking for validation
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    try {
      const response = await addRepoToDB(userData.user, userData.repository, userId);
      setResponseForUser('Repository added');
      setTimeout(() => {
        onSuccess();
        setRepo(response.data.repos);
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.isAxiosError) {
        setResponseForUser(error.response.data);
      } else {
        setResponseForUser('Something went wrong. Try again later.');
      }
    }
  }

  function handleChange(event) {
    const key = event.target.id;
    setUserData({...userData, [key]: event.target.value});
  }
  return (
    <Form 
      noValidate validated={validated}
      onSubmit={handleSubmit} className="">
      <h4>Add repository</h4>
      <Form.Group controlId="user">
        <Form.Label>Owner name</Form.Label>
        <Form.Control 
          required
          type="text" 
          placeholder="Enter owner name" 
          value={userData.user}
          onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">
          Please provide owner name.
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group controlId="repository">
        <Form.Label>Repository name</Form.Label>
        <Form.Control 
          required
          type="text" 
          placeholder="Enter repo name" 
          value={userData.repository}
          onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">
          Please provide repository name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Text 
        className={responseForUser === 'Repository added'
                  ? 'text-success'
                  : 'text-danger'}>{responseForUser}</Form.Text>
      </Form.Group>

      <Button variant="outline-success" type="submit">
        Submit
      </Button>
  </Form>
  );
}
