import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <ProtectedRoute>
      <Layout/>
    </ProtectedRoute>,
    children: [
      {
        path: "/home",
        element: <Home/>
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;