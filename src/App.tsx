import React from 'react';
import { Container, Typography } from '@mui/material';
import { PostsProvider } from './providers/PostsContextProvider';
import PostsTable from './components/PostsTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <PostsProvider>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
          <div className="content-container">
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                color: 'white',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Posts List
            </Typography>
            <PostsTable />
          </div>
        </Container>
      </PostsProvider>
    </div>
  );
}

export default App;
