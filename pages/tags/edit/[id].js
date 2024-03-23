import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTag } from '../../../api/tagData';
import TagForm from '../../../components/forms/tagForm';

export default function EditTag() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleTag(id).then(setEditItem);
    }
  }, [id]);

  return <TagForm tagObj={editItem} />;
}
