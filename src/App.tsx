import { Route, Routes } from "react-router-dom"
import BookList from "./pages/BookList"
import Home from "./pages/Home"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookList />} />
    </Routes>
  )
}

export default App
