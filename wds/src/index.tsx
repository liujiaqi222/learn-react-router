import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
// import { BrowserRouter,HashRouter,MemoryRouter } from "react-router-dom"
import { StaticRouter } from "react-router-dom/server"

const route = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
route.render(
  <React.StrictMode>
    <StaticRouter location="/books">
      <App />
    </StaticRouter>
  </React.StrictMode>
)