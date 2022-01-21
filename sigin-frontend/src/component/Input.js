import React,{useEffect, useState}from 'react';
import ReactTable from "react-table";  
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Display from './Display';

export default function Input() {
    const [userName,setuserName] = useState('');
    const [password,setPassword] =useState('');
    const [email,setEmail] =useState('');
    const [users,setUsers]=useState([]);
    const getUsers=(id)=>{
       console.log('getusers')
       console.log('clicked')
       axios.delete(`http://localhost:4000/users/${id}`)
       .then(response=>{
         console.log(response)
     })
     .catch(error=>{
         console.log(error)
     })
     setUsers(users.filter(item => item._id !== id));
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/users/`)
        .then(response=>{
            console.log(response.data)
            setUsers(response.data)
        })
        .catch(error=>{
            console.log(error)
        })
       
    },[]);
    const handleEVent=(e)=>{
        e.preventDefault();
       console.log('handinf')
        axios.post('http://localhost:4000/users/',{
            userName:userName,
            password:password,
            email:email
        })
        .then(response=>{
            setUsers(prevArray => [...prevArray, response.data.message])
        })
        .catch(error=>{
            console.log(error)
        })
        setuserName('');
        setPassword('');
        setEmail('')
        console.log(userName,password,email)
    }
  return (
   
      <div>
         <form  method="post" onSubmit={handleEVent}>
         <input type="text" value={userName} name="userName" onChange={(e)=>setuserName(e.target.value)}></input>    
         <input type="text" value={email} name="email" onChange={(e)=>setEmail(e.target.value)}></input>   
         <input type="text" value={password} name="password" onChange={(e)=>setPassword(e.target.value)}></input>     
        
         <button type="submit">SUbmt</button>
            <table>
               <thead>
               <tr>
                    <th>Name</th>
                    <th>EMail</th>
                    <th>Password</th>
                    <th>Remove</th>
                </tr>
               </thead>
              <tbody>
              { users.map(post=><Display getUsers={getUsers} post={post}></Display>)}
              </tbody>
              
            </table>
      <br></br>
      </form>
   
      </div>
  );
}