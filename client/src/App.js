import { useEffect, useState } from 'react';
import './styles/App.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DirecteurRoutes from './routes/DirecteurRoutes';
import NoteFound from './pages/NoteFound';
import FormateurRoutes from './routes/FormateurRoutes';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/directeur/*" element={<DirecteurRoutes />} />
          <Route path="/formateur/*" element={<FormateurRoutes/>} />
          <Route path='*' element={<NoteFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
