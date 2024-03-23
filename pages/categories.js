import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getCategories } from '../api/categoryData';
import CategoryCard from '../components/CategoryCard';

function ShowCategories() {
  const [categoryDetails, setCategoryDetails] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategoryDetails);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="text-center my-4">
      <h1 className="header">CATEGORIES</h1>
      <Link href="/category/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Category +</Button>
      </Link>
      <div className="d-flex flex-wrap categoryView">
        {categoryDetails.map((category) => (
          <CategoryCard key={category.id} categoryObj={category} onUpdate={getAllCategories} />
        ))}
      </div>
    </div>
  );
}

export default ShowCategories;
