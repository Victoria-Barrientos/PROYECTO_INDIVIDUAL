import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import NewGame from './components/NewGame';

function App() {

  const location = useLocation();

  return (
    <div className="App">
      {
         location.pathname !== "/" && <Nav/>
      }
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/detail/:id" element={<Detail></Detail>}></Route>
        <Route path="/new" element={<NewGame></NewGame>}></Route>
      </Routes>
    </div>
  );
}

export default App;
