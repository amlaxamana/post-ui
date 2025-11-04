import React, { useState, useEffect } from 'react';
import PostList from './PostList';

const API_URL = 'https://post-api-r9bw.onrender.com/posts'; // Assuming /posts is the endpoint

export default function PostContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleEdit = (post) => {
    // Logic to handle editing, e.g., navigating to an edit form
    console.log('Editing post:', post.id);
  };

  const handleDelete = (postId) => {
    // Logic to call the API's DELETE endpoint
    fetch(`${API_URL}/${postId}`, { method: 'DELETE' })
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  return (
    <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
  );
}