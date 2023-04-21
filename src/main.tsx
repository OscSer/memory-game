import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Board } from './views/board/Board';
import { SetupForm } from './views/setup-form/SetupForm';
import './main.css';

const router = createBrowserRouter([
  { path: '/', element: <SetupForm /> },
  { path: 'board', element: <Board /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
