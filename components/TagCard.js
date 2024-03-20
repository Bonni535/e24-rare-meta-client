import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTag } from '../api/tagData';

function TagCard({ tagObj, onUpdate }) {
  const deleteThisTag = () => {
    if (window.confirm(`Delete ${tagObj.label}?`)) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{tagObj.label}</Card.Title>
        <p className="card-text bold"><span>{tagObj.label} <br /></span></p>
        <Link href={`/tags/edit/${tagObj.id}`} passHref>
          <Button variant="info">Edit Tag</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTag} className="m-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
