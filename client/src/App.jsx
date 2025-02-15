import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Createpost from './pages/Createpost';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/media/:id" element={<VideoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<Createpost/>} />
        </Routes>
      </Layout>
    </Router>
  
  );
}

export default App;

