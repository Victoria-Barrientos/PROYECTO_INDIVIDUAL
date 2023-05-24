import './App.css';
// import { useState, useEffect } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
// import axios from "axios";
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import NewGame from './components/NewGame/NewGame';
// import { Login } from './components/Login/Login';

function App() {

  const location = useLocation();
  // const navigate = useNavigate();
  // const [access, setAccess] = useState(false);

  // const login = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:3001/login', userData);
  //     const { success } = response.data;

  //     if (success) {
  //       setAccess(true);
  //     } else {
  //       console.log('Invalid credentials');
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // useEffect(() => {
  //   !access && navigate('/');
  // }, [access, navigate])

  return (
    <div className="App">
      {
         location.pathname !== "/" && <Nav/>
      }
      <Routes>
        <Route path="/" element={<Landing></Landing>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/detail/:id" element={<Detail></Detail>}></Route>
        <Route path="/saved" element={<Home></Home>}></Route>
        {/* <Route path="login" element={<Login login={login}></Login>}></Route> */}
        <Route path="/new" element={<NewGame></NewGame>}></Route>
      </Routes>
    </div>
  );
}

export default App;
