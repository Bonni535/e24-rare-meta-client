import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getSingleTag, updateTag, createTag } from '../../api/tagData';

const initialState = { label: '' };

function TagForm({ tagObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (tagObj.id) {
      getSingleTag(tagObj.id).then(setFormInput);
    }
  }, [tagObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If the item already exists in the database...
    if (tagObj.id) {
        console.log(tagObj.id);
      // Make the Update API call and then route the user to the Events page.
      updateTag(tagObj.id, formInput).then(() => router.push('/tags'));
      // Else start running the Create Tag function
    } else {
        createTag(formInput).then(() => router.push('/tags'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{tagObj.id ? 'Edit Tag' : 'Add Tag'}</h2>

      <Form.Group controlId="tagLabel" className="mb-3">
        <Form.Label>Tag Label</Form.Label>
        <Form.Control
          type="text"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        {tagObj.id ? 'Update' : 'Add'} Tag
      </Button>
    </Form>
  );
}

TagForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }),
};

TagForm.defaultProps = {
    tagObj: PropTypes.shape({
        label: PropTypes.string,
        id: PropTypes.number,
      }),      
};

export default TagForm;
