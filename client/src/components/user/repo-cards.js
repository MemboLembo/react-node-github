import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { updateRepo, deleteRepo } from '../../services/repositories';

export default function CreateRepoCard({card, userId, setRepo}) {

  async function updateFoo () {
    const response = await updateRepo(card.owner, card.repo, userId);
    setRepo(response.data.repos);
  }

  async function deleteFoo() {
    const response = await deleteRepo(card.owner, card.repo, userId);
    setRepo(response.data.repos);
  }


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Owner: {card.owner}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Repository: {card.repo}</Card.Subtitle>
          <dl>
            <dt>URL</dt>
            <dd><Card.Link href={card.url}>{card.url}</Card.Link></dd>
            <dt>Stars</dt>
            <dd>{card.stars}</dd>
            <dt>Forks</dt>
            <dd>{card.forks}</dd>
            <dt>Issues</dt>
            <dd>{card.issues}</dd>
            <dt>Date of creation (UTC)</dt>
            <dd>{formatDate(card.created_at)}</dd>
          </dl>
        <Button variant="outline-info" 
          onClick={() => {updateFoo()}}>Update</Button>
        <Button variant="outline-info" 
          onClick={() => {deleteFoo()}}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

function formatDate (dateWithWrongFormat) {
  if (dateWithWrongFormat) {
    const date = new Date(dateWithWrongFormat);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth()).padStart(2, '0');
    const day = String(date.getUTCDay()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }
  return '-';
}
