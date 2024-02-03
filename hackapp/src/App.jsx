import React, { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
      const response = await fetch('_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: replyValue }),
        });
        if (!response.ok) throw new Error('Network response error.');
        const data = await response.json();
        setGptResponse(data); // Output response to gpt box
    }
    catch (error) {
      console.error('Problem with fetch operation.', error);
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
