import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {

  // User text input
  const [replyValue, setReplyValue] = useState('');

  // Chat gpt reply
  const [gptResponse, setGptResponse] = useState('gpt response');

  // message history
  const [messages, setMessages] = useState(
    [
      {
        text: 'GPT response',
        sender: 'receive'
      }
  ]);


  const messagesEndRef = useRef(null); // reference to last message

  // follow last message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  // stay on last message
  useEffect(scrollToBottom, [messages]);

  // Track text box data
  const handleReply = (event) => {
    setReplyValue(event.target.value);
  };

  // Submit text box
  const handleSubmit = async () => {
    
    // cannot enter nothing
    if (replyValue === "") {
      return;
    }
    
    // message entered
    const newMessage = {
      text: replyValue,
      sender: 'send'
    };

    // append new message
    setMessages(messages => [...messages, newMessage]);
    setReplyValue('');

    // wait for gpt response
    const placeholder = {
      text: "...",
      sender: 'receiver'
    };
    setMessages(messages => [...messages, placeholder]);
    const placeHolderIndex = messages.length;


    try {
      // API call
      const response = await axios.post('_ENDPOINT', {
        data: replyValue
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // show gpt reply
      setMessages(currentMessages => {
        let updatedMessages = [...currentMessages];
        updatedMessages[placeHolderIndex] = {
          text: response.data,
          sender: 'receive'};
          return updatedMessages;
        });
      // setGptResponse(response.data);
    }
    catch(error) {
      console.error('fetch operation failed', error);
      // if (error.response) {
      //   console.error(error.response.data);
      //   console.error(error.response.status);
      //   console.error(error.response.headers);
      // }
      // else if (error.request) {
      //   console.error(error.request);
      // }
      // else {
      //   console.error('Error', error.message);
      // }
      setMessages(currentMessages => {
        let updatedMessages = [...currentMessages];
        updatedMessages[updatedMessages.length - 1] = {text: "error fetching", sender: 'receive'};
        return updatedMessages;
      });
    }
  };


  return (
    <div className="AppContainer"> 
      {/*Page title*/}
      <div className="ChatHeader">
        <h1>Interview App</h1>
      </div>
      {/*Chat box*/}
      <div className="ChatBox">
        {messages.map((message, index) => (
          <p key={index} className={message.sender}>
            {message.text}
          </p>
        ))}
        <div ref={messagesEndRef}/>
      </div>
      {/*User input box*/}
      <Box className="InputArea" >
      <input maxLength={1500}
        type="text"
        placeholder="Type response here..."
        value={replyValue}
        onChange={handleReply}
        />
        <Button variant="contained" onClick={handleSubmit}>Send</Button>
      </Box>
    </div>
     );
    }
  
export default App;
