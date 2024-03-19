import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCategory } from '../../../api/categoryData';
import CategoryForm from '../../../components/forms/categoryForm';

export default function EditCategory() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleCategory(id).then(setEditItem);
    }
  }, [id]);

  return <CategoryForm obj={editItem} />;
}
