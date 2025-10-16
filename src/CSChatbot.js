import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Code } from 'lucide-react';
import './App.css';

export default function CSChatBot() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your Computer Science assistant. Ask me anything about programming, algorithms, data structures, software engineering, and more!", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const csKeywords = {
    'python': ['python', 'py', 'django', 'flask', 'pandas', 'numpy'],
    'javascript': ['javascript', 'js', 'node', 'react', 'vue', 'angular', 'typescript'],
    'java': ['java', 'spring', 'jvm', 'maven', 'gradle'],
    'algorithm': ['algorithm', 'sorting', 'searching', 'complexity', 'big o', 'time complexity', 'space complexity'],
    'data structure': ['array', 'linked list', 'tree', 'graph', 'stack', 'queue', 'hash', 'heap', 'binary tree'],
    'database': ['database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'query'],
    'web': ['html', 'css', 'frontend', 'backend', 'api', 'rest', 'http', 'server'],
    'oop': ['oop', 'class', 'object', 'inheritance', 'polymorphism', 'encapsulation'],
    'network': ['network', 'tcp', 'ip', 'protocol', 'socket', 'dns'],
    'ai': ['ai', 'machine learning', 'ml', 'neural network', 'deep learning', 'nlp'],
    'security': ['security', 'encryption', 'cryptography', 'authentication', 'vulnerability'],
    'git': ['git', 'github', 'version control', 'commit', 'branch', 'merge'],
    'os': ['operating system', 'linux', 'windows', 'process', 'thread', 'memory']
  };

  const csResponses = {
    python: "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, AI, and automation. Popular frameworks include Django for web development and TensorFlow for machine learning.",
    
    javascript: "JavaScript is a versatile programming language primarily used for web development. It runs in browsers and on servers (Node.js). Modern frameworks like React, Vue, and Angular make building interactive web applications easier.",
    
    java: "Java is an object-oriented, platform-independent language that follows the 'write once, run anywhere' principle. It's commonly used for enterprise applications, Android development, and large-scale systems.",
    
    algorithm: "Algorithms are step-by-step procedures for solving problems. Common types include sorting (QuickSort, MergeSort), searching (Binary Search), and graph algorithms (Dijkstra's, BFS, DFS). We analyze algorithms using Big O notation for time and space complexity.",
    
    'data structure': "Data structures organize and store data efficiently. Key structures include:\n• Arrays: Fixed-size, contiguous memory\n• Linked Lists: Dynamic, node-based\n• Trees: Hierarchical (Binary Trees, BST, AVL)\n• Graphs: Nodes with connections\n• Hash Tables: Key-value pairs with O(1) average lookup",
    
    database: "Databases store and manage data. SQL databases (PostgreSQL, MySQL) use structured tables and relationships. NoSQL databases (MongoDB, Redis) offer flexible schemas and horizontal scaling. Choose based on your data structure and scaling needs.",
    
    web: "Web development involves frontend (HTML, CSS, JavaScript) for user interfaces and backend (Node.js, Python, Java) for server logic. They communicate via APIs (REST, GraphQL). Modern apps use frameworks for faster development.",
    
    oop: "Object-Oriented Programming organizes code around objects and classes. Key principles:\n• Encapsulation: Bundling data and methods\n• Inheritance: Child classes inherit from parents\n• Polymorphism: Objects behave differently based on type\n• Abstraction: Hiding complex implementation details",
    
    network: "Computer networks connect devices to share resources. The TCP/IP model has layers: Application (HTTP, DNS), Transport (TCP, UDP), Internet (IP), and Link. Understanding protocols is crucial for distributed systems.",
    
    ai: "Artificial Intelligence enables machines to learn and make decisions. Machine Learning uses algorithms to learn from data. Deep Learning uses neural networks with multiple layers. Common applications include image recognition, NLP, and recommendation systems.",
    
    security: "Computer security protects systems from threats. Key concepts include encryption (symmetric/asymmetric), authentication (passwords, 2FA), authorization, and secure coding practices. Always validate input and use HTTPS for web applications.",
    
    git: "Git is a distributed version control system for tracking code changes. Basic commands:\n• git init: Initialize repository\n• git add: Stage changes\n• git commit: Save changes\n• git push/pull: Sync with remote\n• git branch: Create branches for features",
    
    os: "Operating Systems manage hardware and provide services to applications. Key concepts include process management, memory management (virtual memory, paging), file systems, and scheduling algorithms. Understanding OS fundamentals helps with system programming."
  };

  const generateCSResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check if message is CS-related
    let isCSRelated = false;
    let matchedCategory = null;
    
    for (const [category, keywords] of Object.entries(csKeywords)) {
      if (keywords.some(keyword => lowerMsg.includes(keyword))) {
        isCSRelated = true;
        matchedCategory = category;
        break;
      }
    }
    
    // Generic CS terms that might not be in specific categories
    const genericCS = ['program', 'code', 'software', 'computer', 'development', 'engineer', 'function', 'variable', 'loop', 'debug'];
    if (!isCSRelated && genericCS.some(term => lowerMsg.includes(term))) {
      isCSRelated = true;
    }
    
    if (!isCSRelated) {
      return "I'm specialized in Computer Science topics. Please ask me about programming languages, algorithms, data structures, web development, databases, AI, security, or other CS-related subjects!";
    }
    
    // Return specific response if category matched
    if (matchedCategory && csResponses[matchedCategory]) {
      return csResponses[matchedCategory];
    }
    
    // Generic CS responses for related but non-specific questions
    const genericResponses = [
      "That's a great CS question! Could you be more specific? I can help with algorithms, data structures, programming languages, or software engineering concepts.",
      "Interesting topic! In computer science, this relates to several areas. What specific aspect would you like to explore?",
      "Good question! This is an important concept in CS. Would you like to know about the theory, practical implementation, or best practices?",
      "I can help with that! Are you looking for an explanation of the concept, code examples, or use cases?",
      "That's a fundamental CS topic! Let me know if you want to dive into the technical details, common pitfalls, or real-world applications."
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateCSResponse(currentInput),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "What is Python?",
    "Explain Big O notation",
    "What are data structures?",
    "Difference between SQL and NoSQL"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="cs-chatbot-container">
      {/* Header */}
      <div className="cs-chatbot-header">
        <div className="cs-chatbot-header-icon">
          <Code size={28} />
        </div>
        <div>
          <h1 className="cs-chatbot-header-title">CS Assistant</h1>
          <p className="cs-chatbot-header-subtitle">Computer Science Expert</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="cs-chatbot-messages">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div className={`cs-message-wrapper ${message.sender}`}>
              <div className={`cs-message-content ${message.sender}`}>
                <div className={`cs-message-avatar ${message.sender}`}>
                  {message.sender === 'user' ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
                <div className="cs-message-bubble-wrapper">
                  <div className={`cs-message-bubble ${message.sender}`}>
                    <p className="cs-message-text">{message.text}</p>
                  </div>
                  <p className="cs-message-timestamp">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Show quick questions only after first bot message */}
            {index === 0 && message.sender === 'bot' && (
              <div className="cs-quick-questions-container">
                <p className="cs-quick-questions-label">Quick questions:</p>
                <div className="cs-quick-questions-buttons">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickQuestion(q)}
                      className="cs-quick-question-btn"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="cs-typing-indicator">
            <div className="cs-typing-content">
              <div className="cs-message-avatar bot">
                <Bot size={18} />
              </div>
              <div className="cs-typing-bubble">
                <div className="cs-typing-dots">
                  <div className="cs-typing-dot"></div>
                  <div className="cs-typing-dot"></div>
                  <div className="cs-typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="cs-chatbot-input-area">
        <div className="cs-chatbot-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about CS topics..."
            className="cs-chatbot-input"
          />
          <button
            onClick={handleSend}
            disabled={input.trim() === ''}
            className="cs-chatbot-send-btn"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}