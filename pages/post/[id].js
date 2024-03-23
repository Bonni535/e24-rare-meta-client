import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deletePost, getSinglePost } from '../../api/postData';

function ViewPost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const deleteThisPost = () => {
    if (window.confirm(`Are you sure you want to delete ${postDetails.title}?`)) {
      deletePost(id).then(() => router.push('/posts'));
    }
  };

  useEffect(() => {
    if (id) {
      getSinglePost(id).then(setPostDetails);
    }
  }, [id]);

  return (
    <div className="postView">
      <Card style={{ width: '18rem', margin: '15px 10px' }}>
        <Card.Img variant="top" src={postDetails.imageUrl} />
        <Card.Body>
          <Card.Title className="postTitle">{postDetails.title}</Card.Title>
          <Card.Text>{postDetails.content}</Card.Text>
          <Link href={`/posts/edit/${id}`} passHref>
            <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
          </Link>
          <Button variant="outline-warning" onClick={deleteThisPost} className="deleteBtn m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewPost;
