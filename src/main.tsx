import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { LoadingPage } from './lib/component/loading-component';
import router from "./router";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingPage/>}/>
  </StrictMode>
);
