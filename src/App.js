import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Navbar/Nav';
import Home from './pages/Home';
import SingleCoinPage from './pages/SingleCoinPage';

function App() {
    return (
    <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/coins/:id' Component={SingleCoinPage}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
