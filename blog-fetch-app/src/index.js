// src/BlogPosts.js
import React, { useState, useEffect } from 'react';

const BlogPosts = () => {
  // State to store blog posts and error message
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    // Set loading to true when starting the fetch request
    setLoading(true);
    // Fetch posts from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        // Check if response is ok (status 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update state with fetched posts
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        // If an error occurs, update state with the error message
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures the fetch runs once when the component mounts

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Success state - Render the blog posts
  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
