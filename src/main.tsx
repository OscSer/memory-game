import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SetupForm } from '@views/setup-form/SetupForm';
import { Board } from '@views/board/Board';
import { UserProvider } from '@contexts/user-context/UserContext';

import './main.css';

const router = createBrowserRouter([
  { path: '/', element: <SetupForm /> },
  { path: 'board', element: <Board /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
