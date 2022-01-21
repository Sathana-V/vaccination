import axios from 'axios';
import React from 'react';


export default function Display(props) {
 
  return (
    <React.Fragment>
        <tr key={props.post._id}>
          <td>{props.post.userName}</td>
          <td>{props.post.password}</td>
          <td>{props.post.email}</td>
          <td><button onClick={()=>props.getUsers(props.post._id)}>Delete</button></td>
        </tr>
    </React.Fragment>
  );
}