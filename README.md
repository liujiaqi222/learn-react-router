# learn-react-router

官网：[https://reactrouter.com/en/main](https://reactrouter.com/en/main)

## 初始化

```bash
pnpm i react-router-dom
```

在文件`index.ts`中用`BrowserRouter`包裹整个应用，它其实是一个`react context`。

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

在 pages 创建几个占位的页面，如`About.tsx`,`Book.tsx`,`Home.tsx`,`Context.tsx`,`NewBook.tsx`,`NotFood.tsx`。

<img src="https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20221129234217.png" style="zoom:50%;" />

为了在这些页面中设置路由，在`App`组件中使用 react-router 的`Routes`组件。在`Routes`组件内，我们使用`Route`组件来通过 path 来定义单个的路由。

> Routes: A container for a nested tree of elements that renders the branch that best matches the current location.

> Route: Declares an element that should be rendered at a certain URL path.

```ts
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
function App() {
  return (
    <Routes>
      {/* 如果在根路径就渲染Home组件 */}
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
```

![image-20221129235413058](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20221129235413058.png)

接着，我们完成其他的占位的页面组件对应的路由。
