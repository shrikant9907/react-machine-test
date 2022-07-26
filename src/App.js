import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { pageRoutes } from './_routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {
            pageRoutes && pageRoutes.map((route, idx) => <Route key={idx} path={route.path} element={route.component} />)
          }
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.Fragment>
  )
}

export default App