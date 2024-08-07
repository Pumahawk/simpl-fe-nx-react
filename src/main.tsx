import { ReactNode, StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from "./router";
import Loading, { LoadingPage } from './lib/component/loading-component';
import { initKeycloak } from './lib/auth';
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
  initKeycloak.then(() => setStatus("end"));

  switch(status) {
      case "load":
          return <LoadingPage/>;
      case "end":
          return children;
  }
}