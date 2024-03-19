import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleCategory, deleteCategory } from '../../api/categoryData';

function ViewCategory() {
  const [categoryDetails, setCategoryDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const deleteThisCategory = () => {
    if (window.confirm(`Are you sure you want to delete ${categoryDetails.label}?`)) {
      deleteCategory(id).then(() => router.push('/categories'));
    }
  };

  useEffect(() => {
    if (id) {
      getSingleCategory(id).then(setCategoryDetails);
    }
  }, [id]);

  return (
    <div className="categoryView">
      <Card style={{ width: '400px', margin: '10px' }}>
        <Card.Body>
          <Card.Title className="categoryTitle">{categoryDetails.label}</Card.Title>
          {/* Additional category details can be displayed here */}
          <Link href={`/category/edit/${id}`} passHref>
            <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
          </Link>
          <Button variant="outline-danger" onClick={deleteThisCategory} className="deleteBtn m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewCategory;
