import './App.css';
import Quiz from './Components/Quiz/Quiz'
import Score from './Components/Score/Score';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Quiz/>}/>
      <Route path='/Score' element={<Score/>}/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
