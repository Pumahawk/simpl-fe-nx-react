import { ReactNode, StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import Loading from './lib/component/loading-component';
import { KeycloakApp } from './lib/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <KeycloakInit>
      <RouterProvider router={router} fallbackElement={<Loading/>}/>
    </KeycloakInit>
  </StrictMode>
);

function KeycloakInit({children}: {children: ReactNode}) {
  const [status, setStatus] = useState<"load" | "end">("load");
  KeycloakApp.initPromise.then(() => setStatus("end"));

  switch(status) {
      case "load":
          return <Loading/>;
      case "end":
          return children;
  }
}