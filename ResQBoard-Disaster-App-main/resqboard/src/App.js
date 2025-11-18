// src/App.js - FINAL COMPLETE VERSION

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import PostList from './components/PostList';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaTint, FaFirstAid, FaUtensils } from 'react-icons/fa';

// --- Make sure this is your laptop's IP address for the local demo ---
const SERVER_URL = `http://${window.location.hostname}:3001`;

const socket = io(SERVER_URL, { autoConnect: false });
const LOCAL_STORAGE_KEY = 'resqboard.posts';

function App() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const [view, setView] = useState('main');
  const [role, setRole] = useState('victim');
  const [sosSent, setSosSent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Connected! Syncing...');
      const currentPosts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      socket.emit('syncMyPosts', currentPosts);
    });
    socket.on('receivePost', (receivedPost) => {
      setPosts(currentPosts => {
        if (currentPosts.find(post => post.id === receivedPost.id)) return currentPosts;
        return [receivedPost, ...currentPosts];
      });
    });
    return () => { socket.disconnect(); };
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleNewPost = (postText) => {
    const newPost = {
      id: Date.now(),
      text: postText,
      position: [18.5204 + (Math.random() - 0.5) * 0.1, 73.8567 + (Math.random() - 0.5) * 0.1],
      timestamp: new Date().toLocaleTimeString(),
    };
    setPosts(currentPosts => [newPost, ...currentPosts]);
    socket.emit('newPost', newPost);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSosSent(false);
    }, 3000);
  };

  const renderVictimView = () => {
    if (showConfirmation) {
      return (
        <div className="victim-view confirmation-message">
          <h1>✅ Done!</h1>
          <p>Your request has been sent to the local network.</p>
        </div>
      );
    }
    if (!sosSent) {
      return (
        <div className="victim-view">
          <button className="sos-button" onClick={() => setSosSent(true)}>
            I NEED HELP (SOS)
          </button>
        </div>
      );
    } else {
      return (
        <div className="needs-buttons-container">
          <h3>What do you need?</h3>
          <button onClick={() => handleNewPost('Need Water')}><FaTint /> Water</button>
          <button onClick={() => handleNewPost('Need Medical Aid')}><FaFirstAid /> Medical</button>
          <button onClick={() => handleNewPost('Need Food')}><FaUtensils /> Food</button>
          <button className="secondary" onClick={() => setSosSent(false)}>Cancel</button>
        </div>
      );
    }
  };

  const renderRescuerView = () => {
    // --- THIS IS THE FULL, CORRECTED CODE ---
    if (view === 'dashboard') {
      return (
        <div>
          <header className="App-header">
            <h1>Coordinator's Dashboard</h1>
            <button onClick={() => setView('main')}>Back to Main App</button>
          </header>
          <MapContainer key={posts.length} center={[18.5204, 73.8567]} zoom={12} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {posts.filter(post => post.position).map(post => (
              <Marker key={post.id} position={post.position}>
                <Popup>{post.text}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      );
    }
    // --- This is the main rescuer view ---
    return (
      <div>
        <header className="App-header">
          <h1>ResQBoard (Rescuer)</h1>
          <button onClick={() => setView('dashboard')}>View Coordinator's Map</button>
        </header>
        <main>
          <PostList posts={posts} />
        </main>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="role-switcher">
        <p>Current Role: {role}</p>
        <button onClick={() => setRole(role === 'victim' ? 'rescuer' : 'victim')}>
          Switch Role
        </button>
      </div>
      {role === 'victim' ? renderVictimView() : renderRescuerView()}
    </div>
  );
}

export default App;