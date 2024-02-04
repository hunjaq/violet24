import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AppBar, Toolbar } from '@mui/material';
import qApi from './api/axiosConfig';

function App() {

  const [questions, setQuestions] = useState("");

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

  const loadQuestions = async () => {
    try {
      const response = await qApi.get('/api/questions/all');
      setQuestions(response.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  //load questions from db
  useEffect(() => {
    loadQuestions();
  }, []);

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
      <AppBar position='static' sx={{backgroundColor:'skyblue'}}>
        <Toolbar>
          <h1 class="App-header"> Interviewer </h1>
        </Toolbar>
      </AppBar>

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
      <Box className="InputArea" borderRadius={3} sx={{borderBottom:'1px solid blue'}}>
        <TextField
          fullWidth={1}
          maxRows={8}
          variant="standard"
          multiline
          placeholder="Enter Response Here..."
          sx={{backgroundColor: "oldlace", borderRadius:3, marginLeft:'5px'}}
          value={replyValue}
          onChange={handleReply}
        />
        <div class="Button-wrapper">
          <Button variant="contained" sx={{maxHeight:"55px"}} onClick={handleSubmit}>Send</Button>
        </div>
        
      </Box>
    </div>
     );
    }
  
export default App;

/**
 *         <input maxLength={1500}
          type="text"
          placeholder="Type response here..."
          value={replyValue}
          onChange={handleReply}
        />
 */