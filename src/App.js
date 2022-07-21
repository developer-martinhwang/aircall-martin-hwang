import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
// mui v4
import { Box } from '@material-ui/core';
// components
import Header from './components/moudle/Header.js';
import AllAirCalls from './components/page/AllAirCalls.js';
import InBoxAirCalls from './components/page/InBoxAirCalls.js';
import ArchiveAirCalls from './components/page/ArchiveAirCalls.js';
import Footer from './components/moudle/Footer.js';
function App(){
  return (
    <Box className='container'>
      <BrowserRouter>
          <Header/>
          <Box className='body'>
            <Routes>
              <Route index element={<AllAirCalls />} />
              <Route path="/inbox-aircalls" element={<InBoxAirCalls/>}/>
              <Route path="/all-aircalls" element={<AllAirCalls/>}/>
              <Route path="/archive-aircalls" element={<ArchiveAirCalls/>}/>
            </Routes>
          </Box>
          <Footer/>
      </BrowserRouter>
    </Box>
  );
};
export default App;
