import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CSChatBot from './CSChatbot'; // You'll need to save the chatbot as a separate component

function App() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <CSChatBot />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to CS Assistant Chatbot
        </p>
        <button
          className="App-link"
          onClick={() => setShowChat(true)}
          style={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            color: '#61dafb',
            fontSize: '18px'
          }}
        >
          Open CS Chatbot
        </button>
      </header>
    </div>
  );
}

export default App;
