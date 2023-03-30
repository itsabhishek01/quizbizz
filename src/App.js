import "./App.css";
import { Quiz, Score } from "./pages";

import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/Score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
