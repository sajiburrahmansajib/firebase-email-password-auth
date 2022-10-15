import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Components/Layout/Main';
import LoginForm from './Components/LoginForm/LoginForm';
import SingUp from './Components/SingUp/SingUp';




const route = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/singUp',
        element: <LoginForm></LoginForm>
      },
      {
        path: '/login',
        element: <SingUp></SingUp>

      }
    ]
  }
])


function App() {
  return (
    <div className="w-50 mx-auto">

      <RouterProvider router={route}></RouterProvider>

    </div>
  );
}

export default App;
