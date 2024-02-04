import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AppBar, Toolbar } from '@mui/material';
import qApi from './api/axiosConfig';
import useSpeechRecognition from './hooks/useSpeechRecogniztionHook';
import useGPTAPI from './hooks/useGPTAPI'; 
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon'

const SquareIcon = (props) => (
  <SvgIcon {...props}>
    <rect x="4" y="4" width="16" height="16"/>
  </SvgIcon>
);

const CircleIcon = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="8"/>
  </SvgIcon>
)

function App() {

  const { text, startListening, stopListening, isListening, hasRecognitionSupport,} = useSpeechRecognition();
  const { sendTextToGPTAPI } = useGPTAPI(); // Use the new hook
  const [questions, setQuestions] = useState(null);
  const [quest, setQuest] = useState(""); //the current question

  // User text input
  const [replyValue, setReplyValue] = useState('');

  // Chat gpt reply
  const [gptResponse, setGptResponse] = useState('Hello! Send anything to begin.');

  // message history
  const [messages, setMessages] = useState(
    [
      {
        text: quest,
        sender: 'receive'
      }
  ]);

  const toggleRecording = () => {
    if (!messages[messages.length - 1].text === "...") {
      return;
      
    }
    // code for listening
    if (!isListening) {
      startListening();
    }
    else {
      stopListening();
    }
  
  }

  useEffect(() => {
    if (text !== "") {
      setReplyValue(text);
    }
  }, [text])

  // function to load the questions from the db
  const loadQuestions = async () => {
    try {
      const response = await qApi.get('/api/questions/all');
      setQuestions(response.data);
      console.log(response.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  //function to load new question
  function newQ() {
    //get max index
    let max = Math.floor(questions.length);
    let rand = Math.floor(Math.random() * max);

    //update question
    setQuest(questions[rand].question);

    return questions[rand].question;
  }

  //load questions from db
  useEffect(() => {
    loadQuestions();
    
  }, []);

  //get random question when populating
  useEffect(() => {
    if (questions) {
      newQ();

      setMessages([
        {
          text: quest,
          sender: 'receive'
        }
      ])
    }

  }, [questions]);

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
    if (replyValue === "") { //string replace for new lines?
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
    setMessages(messages => [...messages, placeholder, placeholder]);

    //get gpt response
    try {
      const response = await sendTextToGPTAPI(replyValue, quest);

      setMessages(currentMessages => {
        //send feedback
        let updatedMessages = [...currentMessages];
        updatedMessages[updatedMessages.length - 2] = {text: response, sender: 'receive'};

        //send new question
        let q = newQ();
        updatedMessages[currentMessages.length - 1] = {text: q, sender: 'receive'};
        console.log(updatedMessages);

        return updatedMessages;
      });
    } catch (error) {
      console.error(error);
    }
      
  }

  return (
    <div className="AppContainer"> 
      {/*Page title*/}
      <AppBar position='static' sx={{backgroundColor:'skyblue'}}>
        <Toolbar>
          <h1 class="App-header"> AInterviewer </h1>
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
        { hasRecognitionSupport ? (
          <div class="Button-wrapper">
            <Button variant="contained" sx={{maxHeight:"55px"}} onClick={handleSubmit}>Send</Button>
            <IconButton
              onClick={toggleRecording}
              sx={{
                marginLeft: '10px',
                '&&': {
                  backgroundColor: isListening ? 'darkred' : 'red',
                  color: 'white',
                },
                maxHeight: "55px",
              }}
            >
              {isListening ? <SquareIcon /> : <CircleIcon />}
            </IconButton>
          </div>
          ) :
          ( window.alert("No Microphone Support") )
        }
      </Box>
    </div>
     );
    }
  
export default App;
