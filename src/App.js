import './App.css';
import Quiz from './Components/Quiz'
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Quiz/>}/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
