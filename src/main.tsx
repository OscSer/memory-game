import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { Board } from './views/board/Board';
import { Setup } from './views/setup/Setup';

import './main.css';

const router = createBrowserRouter([
  { path: '/', element: <Setup /> },
  { path: 'board', element: <Board /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
