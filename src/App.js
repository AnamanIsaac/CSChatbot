import './App.css';
import { useState } from 'react';
import CSChatBot from './CSChatbot';

// Simple SVG Logo Component
function Logo() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="App-logo">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Outer Circle */}
      <circle cx="60" cy="60" r="55" fill="url(#grad1)" opacity="0.2" />
      
      {/* Code Brackets */}
      <path 
        d="M 35 40 L 25 60 L 35 80" 
        stroke="url(#grad1)" 
        strokeWidth="6" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M 85 40 L 95 60 L 85 80" 
        stroke="url(#grad1)" 
        strokeWidth="6" 
        fill="none" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Forward Slash */}
      <line 
        x1="55" 
        y1="75" 
        x2="65" 
        y2="45" 
        stroke="url(#grad1)" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
    </svg>
  );
}

function App() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <CSChatBot />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1 className="welcome-title">CS Assistant</h1>
        <p className="welcome-subtitle">
          Your Computer Science Learning Companion
        </p>
        <button
          className="chat-button"
          onClick={() => setShowChat(true)}
        >
          <span>Start Chatting</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3l7 7-7 7-1.41-1.41L13.17 11H3V9h10.17L8.59 4.41z"/>
          </svg>
        </button>
      </header>
    </div>
  );
}

export default App;
