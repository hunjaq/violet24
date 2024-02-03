import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
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
            Chat-GPT response
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
        />
        <Button variant="contained">Button</Button>
      </Card>
    </Box>
  );
}

export default App;
