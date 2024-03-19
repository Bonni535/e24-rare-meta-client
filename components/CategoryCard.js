import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteCategory } from '../api/categoryData';

function CategoryCard({ categoryObj, onUpdate }) {
  const router = useRouter();

  const deleteThisCategory = () => {
    if (window.confirm(`Delete ${categoryObj.label}?`)) {
      deleteCategory(categoryObj.id).then(() => {
        onUpdate();
        router.push('/categories');
      });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '15px 10px' }}>
      <Card.Body>
        <Card.Title className="categoryTitle">{categoryObj.label}</Card.Title>
        <Link href={`/category/${categoryObj.id}`} passHref>
          <Button variant="primary" className="viewBtn m-2">VIEW</Button>
        </Link>
        <Link href={`/category/edit/${categoryObj.id}`} passHref>
          <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-warning" onClick={deleteThisCategory} className="deleteBtn m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CategoryCard;
