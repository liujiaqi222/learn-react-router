import { Route, Routes, Link } from "react-router-dom"
import BookList from "./pages/BookList"
import Home from "./pages/Home"
function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
        <button><Link to='/'>Home</Link></button>
        <button> <Link to='/books'>BookList</Link></button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </>
  )
}

export default App
