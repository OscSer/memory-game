import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './main.css';
import { SetupForm } from '@views/setup-form/SetupForm';
import { UserProvider } from '@contexts/user-context/UserContext';
import { GameBoard } from '@views/game-board/GameBoard';

const queryClient = new QueryClient();

const router = createHashRouter([
  { path: '/', element: <SetupForm /> },
  { path: 'board', element: <GameBoard /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
