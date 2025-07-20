import React, { useState, useEffect, useRef } from 'react';
import './ChatModal.css';

const ChatModal = ({ isOpen, onClose, ride, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat messages from localStorage on component mount
  useEffect(() => {
    if (isOpen && ride) {
      const chatKey = `chat_${ride.driver}_${currentUser}`;
      const savedMessages = localStorage.getItem(chatKey);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Initialize with a welcome message from the driver
        const welcomeMessage = {
          id: Date.now(),
          sender: ride.driver || 'Driver',
          text: `Hi! Thanks for your interest in my ride from ${ride.from} to ${ride.to}. Feel free to ask any questions!`,
          timestamp: new Date().toISOString(),
          isSystem: true
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isOpen, ride, currentUser]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveMessages = (updatedMessages) => {
    if (ride) {
      const chatKey = `chat_${ride.driver}_${currentUser}`;
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: currentUser,
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isSystem: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setNewMessage('');

    // Simulate driver typing and response (for demo purposes)
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you soon.",
        "Sure, no problem! Let me know if you have any other questions.",
        "Sounds good! See you at the pickup location.",
        "I'll be driving a blue Honda Civic. My license plate is ABC123.",
        "The ride should take about 30 minutes depending on traffic.",
        "I have water bottles and phone chargers available if needed."
      ];
      
      const driverResponse = {
        id: Date.now() + 1,
        sender: ride.driver || 'Driver',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
        isSystem: false
      };

      const finalMessages = [...updatedMessages, driverResponse];
      setMessages(finalMessages);
      saveMessages(finalMessages);
      setIsTyping(false);
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="driver-avatar">
              {ride?.driver ? ride.driver.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="chat-header-details">
              <h3>{ride?.driver || 'Driver'}</h3>
              <p>{ride?.from} → {ride?.to}</p>
              <span className="online-status">● Online</span>
            </div>
          </div>
          <button className="chat-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => {
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(messages[index - 1]?.timestamp);
            
            return (
              <div key={message.id}>
                {showDate && (
                  <div className="date-separator">
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                )}
                <div className={`message ${message.sender === currentUser ? 'sent' : 'received'} ${message.isSystem ? 'system' : ''}`}>
                  <div className="message-content">
                    <span className="message-text">{message.text}</span>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="message received">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">{ride?.driver || 'Driver'} is typing...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="chat-input"
              maxLength={500}
            />
            <button 
              type="submit" 
              className="send-btn"
              disabled={!newMessage.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M2 21L23 12L2 3V10L17 12L2 14V21Z" 
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="chat-footer">
            <span className="message-count">{newMessage.length}/500</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
