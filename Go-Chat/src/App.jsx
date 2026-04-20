import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage   from './pages/LoginPage';
import HomePage    from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Chat from './Chat';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Navigate to="/login" replace />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/home"    element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat"    element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
