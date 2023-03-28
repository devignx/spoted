import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import Room from './pages/Room';
import { ThemeProvider } from 'styled-components';
import useStore from './store/store';
import { GlobalStyles, darkTheme, lightTheme } from './Theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Why from './pages/Why';
import Private from './pages/Private';

function App() {

  const theme = useStore((state) => state.theme)

  return (
    <ThemeProvider theme = {theme === "light"? lightTheme:darkTheme} >
      <GlobalStyles/>
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/room' element={<Room/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/why' element={<Why/>}/>
          <Route path='/private' element={<Private/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
