import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter} from 'react-router-dom'

import Table from './Table'

function Root() {
  return (
    <div>
       <HashRouter>
      <Table />
      </HashRouter>
      
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("page loaded");
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
  
});

