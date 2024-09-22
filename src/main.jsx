import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AllBlogs from './pages/AllBlogs.jsx'
import SingleUser from './pages/SingleUser.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ProtectedRoute component={<Dashboard />} />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'allblogs',
        element:<AllBlogs/>
      },
      {
        path: 'singleuser',
        element:<ProtectedRoute component={<SingleUser />} />
      },
    
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>

)
