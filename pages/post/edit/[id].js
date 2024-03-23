import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/postForm';

export default function EditPost() {
  const [post, setPost] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSinglePost(id).then(setPost);
    }
  }, [id]);

  return <PostForm obj={post} />;
}
