import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./UI/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Supplier from "./pages/Supplier";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Product";
import CreateBill from "./pages/CreateBill";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/suppliers",
        element: <Supplier />
      },
      {
        path: "/products",
        element: <Products />
      }, {
        path: '/create-bill',
        element: <CreateBill />
      }
    ],
  }, {
    path: '/not-found',
    element: <NotFound />
  }
]);

const App = () => {
  return <RouterProvider router={router}/>
};

export default App;
