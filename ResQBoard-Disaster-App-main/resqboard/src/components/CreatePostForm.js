// src/components/CreatePostForm.js

import React from 'react';
// Import some icons to make the buttons look good
import { FaTint, FaFirstAid, FaUtensils } from 'react-icons/fa';

function CreatePostForm({ onNewPost }) {
  return (
    <div className="form-container">
      <h3>Create a Quick Post:</h3>
      <button onClick={() => onNewPost('Need Water')}>
        <FaTint /> Water
      </button>
      <button onClick={() => onNewPost('Need Medical Aid')}>
        <FaFirstAid /> Medical
      </button>
      <button onClick={() => onNewPost('Need Food')}>
        <FaUtensils /> Food
      </button>
    </div>
  );
}

export default CreatePostForm;