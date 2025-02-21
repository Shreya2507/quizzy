import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizScreen from "./pages/QuizScreen";
import History from "./pages/History";
import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz" element={<QuizScreen />} />
        <Route path="history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
