import React, { useState } from 'react';
import PostForm from './PostForm'; // Assuming PostForm is in the same directory

const API_BASE_URL = 'https://post-api-r9bw.onrender.com';

export default function PostCreator({ onPostCreated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // The function passed to PostForm's onSubmit prop
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    
    // Determine the action (Create vs. Update) and URL
    const isNewPost = !formData.id;
    const url = isNewPost ? `${API_BASE_URL}/posts` : `${API_BASE_URL}/posts/${formData.id}`;
    const method = isNewPost ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save post.');
      }
      
      const savedPost = await response.json();
      console.log(`${isNewPost ? 'Created' : 'Updated'} Post:`, savedPost);
      
      // Notify the main application of the new post
      if (onPostCreated) {
        onPostCreated(savedPost);
      }

    } catch (error) {
      console.error('API Error:', error);
      // Re-throw the error so PostForm can display it to the user
      throw error; 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>Create New Post</h3>
      {/* The PostForm's internal 'handle' function calls 'handleFormSubmit' 
        which is where the API URL is used. 
      */}
      <PostForm onSubmit={handleFormSubmit} submitLabel="Publish Post" />
    </div>
  );
}