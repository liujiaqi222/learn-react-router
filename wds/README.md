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

```tsx
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
function App() {
  return (
    <Routes>
      {/* 如果在根路径就渲染Home组件 */}
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookList />} />
    </Routes>
  )
}

export default App
```

![image-20221129235413058](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20221129235413058.png)

为了不用手动在浏览器中输入path来切换路由，我们做几个按钮来帮助我们切换。

这个时候，我们用的react的`Link`组件，最终会被渲染成`a`标签。它和a标签的区别在于，使用`Link`组件，点击跳转不会**刷新页面**，只是会替换成对应的组件。

![动画](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/%E5%8A%A8%E7%94%BB.gif)

```jsx
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
```

## Router Components

### HashRouter

除了`BrowserRouter`外，`react-router-dom`还提供了`HashRouter`。

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"

const route = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

route.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
```

此时就是hash模式

![image-20221203191909286](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/image-20221203191909286.png)

### MemoryRouter

使用`MemoryRouter`切换不会改变url，所有变化都存在内存中。

![动画4141](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/%E5%8A%A8%E7%94%BB4141.gif)

如果对你写的路由代码做测试，肯定是用`MemoryRouter`做测试更好，因为有可能你的代码不在浏览器中运行，就用不了`BrowserRouter`了。

### StaticRouter

`StaticRouter`是用在node server中渲染页面的，必须要给它一个特定的url用作`location`prop，不允许我们改变。

这个组件的目的是告诉服务器渲染正确的页面。

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { StaticRouter } from "react-router-dom/server"

const route = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
route.render(
  <React.StrictMode>
    <StaticRouter location="/books">
      <App />
    </StaticRouter>
  </React.StrictMode>
)
```

## Routers

在`v6.4`中引入了支持data api的新routers。

- [`createBrowserRouter`](https://reactrouter.com/en/main/routers/create-browser-router)
- [`createMemoryRouter`](https://reactrouter.com/en/main/routers/create-memory-router)
- [`createHashRouter`](https://reactrouter.com/en/main/routers/create-hash-router)

之前的这些router不支持data api：

- [`<BrowserRouter>`](https://reactrouter.com/en/main/router-components/browser-router)
- [`<MemoryRouter>`](https://reactrouter.com/en/main/router-components/memory-router)
- [`<HashRouter>`](https://reactrouter.com/en/main/router-components/hash-router)
- [`<StaticRouter>`](https://reactrouter.com/en/main/router-components/static-router)

### createBrowserRouter

这是最推荐的router，如果React Router构建web项目。它使用[DOM History API](https://developer.mozilla.org/en-US/docs/Web/API/History)来更新URL 和管理历史记录栈。

它还支持v6.4数据API，如 [loaders](https://reactrouter.com/en/main/route/loader), [actions](https://reactrouter.com/en/main/route/action), [fetchers](https://reactrouter.com/en/main/hooks/use-fetcher) 等。

