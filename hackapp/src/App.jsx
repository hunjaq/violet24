import React, { useState } from 'react';
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
  const [gptResponse, setGptResponse] = useState('gpt response');

  // Track text box data
  const handleReply = (event) => {
    setReplyValue(event.target.value);
  };

  // Submit text box
  const handleSubmit = async () => {
    try {
      // API call
      const response = await axios.post('_ENDPOINT', {
        data: replyValue
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setGptResponse(response.data);
    }
    catch(error) {
      console.error('fetch operation failed', error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      }
      else if (error.request) {
        console.error(error.request);
      }
      else {
        console.error('Error', error.message);
      }
    } 
  };


  return (
    <Box 
      className="App" 
      display="flex" 
      flexDirection="column" 
      justifyContent="space-between"
      alignItems="center" 
      height="100vh"
      style={{ marginTop: '20px' }}
      flexGrow={1}
    >
      <header className="Chat-Gpt">
        <h1>Interview App</h1>
      </header>
      <Card sx={{ minWidth: 500, flexGrow: 1, marginBottom: '10px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Chat-GPT 
          </Typography>
          <Typography variant="body2">
            {gptResponse}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 500, marginBottom: '10px' }}>
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard" // Change from 'outlined' to 'standard'
          sx={{ minWidth: 500 }}
          value={replyValue}
          onChange={handleReply}
        />
        <Button variant="contained" onClick={handleSubmit}>Button</Button>
      </Card>
    </Box>
  );
  }

export default App;
