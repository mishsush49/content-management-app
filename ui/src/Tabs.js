import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ContentGeneration from './ContentGeneration';
import ShowAllContents from './ShowAllContents';

const Tabs = () => {
  const location = useLocation();

  return (
    <div>
      <div className="tabs">
        <Link to="/content-generation" className={`tab ${location.pathname === '/content-generation' ? 'active' : ''}`}>
          Content Generation
        </Link>
        <Link to="/show-all-contents" className={`tab ${location.pathname === '/show-all-contents' ? 'active' : ''}`}>
          Show All Contents
        </Link>
      </div>

      <Routes>
        <Route path="/content-generation" element={<ContentGeneration />} />
        <Route path="/show-all-contents" element={<ShowAllContents />} />
      </Routes>
    </div>
  );
};

export default Tabs;