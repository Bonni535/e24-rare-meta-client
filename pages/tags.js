import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import TagCard from '../components/TagCard';
import { getTags } from '../api/tagData';

function ShowTags() {
  const [tags, setTags] = useState([]);

  const displayAllTags = () => {
    getTags().then((data) => {
      setTags(data);
    });
  };

  useEffect(() => {
    displayAllTags();
  });

  return (
    <div className="text-center my-4">
      <button type="button" className="btn btn-light">
        <Link passHref href="/tags/newTag">
          <Nav.Link>Create a New Tag</Nav.Link>
        </Link>
      </button>
      <div className="d-flex flex-wrap">
        {tags.map((tag) => (
          <TagCard Id={tag.Id} tagObj={tag} onUpdate={displayAllTags} />
        ))}
      </div>
    </div>
  );
}

export default ShowTags;
