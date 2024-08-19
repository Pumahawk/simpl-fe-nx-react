import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import { LoadingPage } from './lib/component/loading-component/loading';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingPage/>}/>
  </StrictMode>
);
