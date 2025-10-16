import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Code } from 'lucide-react';

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg p-4 flex items-center space-x-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <Code className="text-purple-600" size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">CS Assistant</h1>
          <p className="text-sm text-purple-100">Computer Science Expert</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-xs md:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User size={18} className="text-white" />
                  ) : (
                    <Bot size={18} className="text-white" />
                  )}
                </div>
                <div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Show quick questions only after first bot message */}
            {index === 0 && message.sender === 'bot' && (
              <div className="mt-4 ml-10">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs bg-white hover:bg-purple-50 text-purple-600 px-3 py-2 rounded-full shadow border border-purple-200 transition-colors"
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
          <div className="flex justify-start">
            <div className="flex items-end space-x-2 max-w-xs">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about CS topics..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={input.trim() === ''}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-3 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}