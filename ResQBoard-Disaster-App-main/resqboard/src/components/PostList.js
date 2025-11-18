// src/components/PostList.js

import React from 'react';

function PostList({ posts }) {
  return (
    <div className="list-container">
      <h2>Notice Board</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first!</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-item">
            <p className="post-text">{post.text}</p>
            {/* This new part displays the metadata */}
            <small className="post-meta">
              {post.timestamp}
              {post.position && ` | Location: ${post.position[0].toFixed(4)}, ${post.position[1].toFixed(4)}`}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;