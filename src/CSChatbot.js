import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    javascript: "JavaScript is a versatile programming language primarily used for web development...",
    java: "Java is an object-oriented, platform-independent language...",
    algorithm: "Algorithms are step-by-step procedures for solving problems...",
    'data structure': "Data structures organize and store data efficiently...",
    database: "Databases store and manage data...",
    web: "Web development involves frontend and backend collaboration...",
    oop: "Object-Oriented Programming organizes code around objects and classes...",
    network: "Computer networks connect devices to share resources...",
    ai: "Artificial Intelligence enables machines to learn and make decisions...",
    security: "Computer security protects systems from threats...",
    git: "Git is a distributed version control system for tracking code changes...",
    os: "Operating Systems manage hardware and provide services to applications."
  };

  const generateCSResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    let matchedCategory = Object.keys(csKeywords).find(category =>
      csKeywords[category].some(keyword => lowerMsg.includes(keyword))
    );
    return matchedCategory
      ? csResponses[matchedCategory]
      : "I'm specialized in Computer Science topics. Try asking about programming, algorithms, databases, or AI!";
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
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const quickQuestions = [
    "What is Python?",
    "Explain Big O notation",
    "What are data structures?",
    "Difference between SQL and NoSQL"
  ];

  const handleQuickQuestion = (question) => setInput(question);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 overflow-hidden">
      
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg p-4 flex items-center space-x-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <motion.div 
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Code className="text-purple-600" size={28} />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-white">CS Assistant</h1>
          <p className="text-sm text-purple-100">Your Computer Science Chatbot</p>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-xs md:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.sender === 'user' ? 'bg-purple-600' : 'bg-blue-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                >
                  {message.sender === 'user' ? (
                    <User size={18} className="text-white" />
                  ) : (
                    <Bot size={18} className="text-white" />
                  )}
                </motion.div>
                <div>
                  <motion.div
                    className={`rounded-2xl px-4 py-3 shadow-md ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </motion.div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-end space-x-2 max-w-xs">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div 
        className="bg-white border-t border-gray-200 p-4 shadow-lg"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <motion.input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about CS topics..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            onClick={handleSend}
            disabled={input.trim() === ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-3 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
import './App.css';
import { useState } from 'react';
import CSChatBot from './CSChatbot';