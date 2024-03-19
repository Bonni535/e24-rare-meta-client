import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createCategory, updateCategory, getSingleCategory } from '../../api/categoryData';

const initialState = { label: '' };

function CategoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      getSingleCategory(obj.id).then(setFormInput);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = obj.id ? updateCategory : createCategory;

    action(formInput)
      .then(() => {
        router.push('/categories');
      })
      .catch((error) => {
        console.error('Failed to save category', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.id ? 'Edit Category' : 'Add Category'}</h2>

      <Form.Group controlId="categoryLabel" className="mb-3">
        <Form.Label>Category Label</Form.Label>
        <Form.Control
          type="text"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        {obj.id ? 'Update' : 'Add'} Category
      </Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }),
};

CategoryForm.defaultProps = {
  obj: initialState,
};

export default CategoryForm;
