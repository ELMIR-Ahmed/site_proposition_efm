import { useEffect, useState } from 'react';
import './styles/App.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DirecteurRoutes from './routes/DirecteurRoutes';
import NoteFound from './pages/NoteFound';

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('token')))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/directeur/*" element={<DirecteurRoutes />} />
          <Route path='*' element={<NoteFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
