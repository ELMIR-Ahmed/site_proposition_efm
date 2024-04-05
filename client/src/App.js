import './styles/App.css'
import SideBar from './components/Layout';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DirecteurRoutes from './routes/DirecteurRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/directeur/*" element={<DirecteurRoutes />} />
        </Routes>
      </BrowserRouter>
      {/* <SideBar/> */}
    </div>
  );
}

export default App;
