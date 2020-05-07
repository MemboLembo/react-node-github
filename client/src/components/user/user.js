import React from 'react';
import { Button, ButtonGroup, Row, Container, Col } from 'react-bootstrap';
import CreateRepoCard from './repo-cards';

function User ({setRenderLogin, setbuttonType, setModalIsOpen, repo, userId, setRepo}) {
  return (
    <div>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="outline-info" 
                onClick={() => {
                  setModalIsOpen(true);
                  setbuttonType('add-repo');
                }}>Add Repo</Button>
        <Button variant="outline-info" onClick={() => {setRenderLogin(true)}}>Logout</Button>
      </ButtonGroup>
      <Container>
        <Row>
          {(repo.length)
          ? (repo.map((card, key) => {
            return (
              <Col {...{key}}>
                <CreateRepoCard {...{card, userId, setRepo} }/>
              </Col>
            );
          }))
          : (null)}
        </Row>
      </Container>
    </div>
  );
}

export default User;
