import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createPost, updatePost, getSinglePost } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../api/categoryData';

const initialState = { title: '', imageUrl: '', content: '' };

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      getSinglePost(obj.id).then(setFormInput);
    }
    getCategories().then(setCategories);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
      userId: user.fbUser.uid,
      publicationDate: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = obj.id ? updatePost : createPost;
    action(formInput)
      .then(() => {
        router.push('/posts');
      })
      .catch((error) => {
        console.error('Failed to save post', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.id ? 'Edit Post' : 'Add Post'}</h2>

      <Form.Group controlId="postTitle" className="mb-3">
        <Form.Label>Post Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="postImageUrl" className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="postContent" className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Select
        name="categoryId"
        onChange={handleChange}
        className="mb-3 chooseBag"
        value={formInput.categoryId}
        required
      >
        <option value="" label="Choose Category" disabled />
        {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                label={category.label}
              />
            ))
          }
      </Form.Select>

      <Button type="submit" variant="primary">
        {obj.id ? 'Update' : 'Add'} Post
      </Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    userId: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
