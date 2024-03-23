import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deletePost } from '../api/postData';

function PostCard({ postObj, onUpdate }) {
  const router = useRouter();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => {
        onUpdate();
        router.push('/posts');
      });
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '15px 10px' }}>
      <Card.Img variant="top" src={postObj.imageUrl} />
      <Card.Body>
        <Card.Title className="postTitle">{postObj.title}</Card.Title>
        <Link href={`/post/${postObj.id}`} passHref>
          <Button variant="primary" className="viewBtn m-2">VIEW</Button>
        </Link>
        <Link href={`/post/edit/${postObj.id}`} passHref>
          <Button className="editBtn m-2" variant="outline-info">EDIT</Button>
        </Link>
        <Button variant="outline-warning" onClick={deleteThisPost} className="deleteBtn m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
