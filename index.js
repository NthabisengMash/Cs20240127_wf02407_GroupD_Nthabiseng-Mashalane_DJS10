import React, { useState, useEffect } from 'react';

function App() {
  // State to store fetched posts and error message
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the data when the component is mounted
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Make the API call to fetch blog posts
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();

        // Update state with the fetched posts
        setPosts(data);
        setLoading(false);
      } catch (err) {
        // If there's an error, set the error message in state
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the fetch runs only once after the first render

  return (
    <div className="App">
      <h1>Blog Posts</h1>

      {/* Show loading state */}
      {loading && <p>Loading posts...</p>}

      {/* Show error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render posts if they are available */}
      {!loading && !error && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
