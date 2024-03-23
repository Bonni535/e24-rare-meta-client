import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function ShowCategories() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="text-center my-4">
      <h1 className="header">POSTS</h1>
      <Link href="/post/new" passHref>
        <Button size="sm" variant="outline-info" className="createBtn">New Post +</Button>
      </Link>
      <div className="d-flex flex-wrap categoryView">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default ShowCategories;
