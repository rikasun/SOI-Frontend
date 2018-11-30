import React from 'react';
import TableItem from './table_item';

class Table extends React.Component {
 constructor(props){
  super(props);
 }

 render(){
   return (
     <div>

     <h3>Krakatoa Ventures Fund I, L.P.</h3>
     <p>{`As of ${new Date()}`}</p>
    
     <div className="table">
       <ul className="titles">
         <li>Investment</li>
         <li>Assets</li>
         <li>Investment date</li>
         <li>Shares</li>
         <li>Cost</li>
       </ul>
        <TableItem />
     </div>

     </div>
   )
 }
}

export default Table;



