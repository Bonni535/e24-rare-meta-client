import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleCategory, deleteCategory, getPostsByCategory } from '../../api/categoryData';

function ViewCategory() {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [postsInfo, setPostsInfo] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleCategory(id).then(setCategoryDetails);
      getPostsByCategory(id)
        .then(setPostsInfo)
        .catch((error) => {
          console.error('Failed to fetch post titles', error);
          setPostsInfo([]);
        });
    }
  }, [id]);

  return (
    <div className="categoryView">
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title className="categoryTitle">{categoryDetails.label}</Card.Title>
          <ul>
            {postsInfo.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <Link href={`/category/edit/${id}`} passHref>
            <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
          </Link>
          <Button
            variant="outline-danger"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this category?')) {
                deleteCategory(id).then(() => router.push('/categories'));
              }
            }}
            className="deleteBtn m-2"
          >
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewCategory;
