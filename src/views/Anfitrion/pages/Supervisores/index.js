import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SupervisoresRegistrados from './SupervisoresRegistrados'

function Supervisores(){
	const [supervisores, setSupervisores] = useState({});
	const [newSupervisor, setNewSupervisor] = useState();
	const { getAccessTokenSilently } = useAuth0();

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	
	useEffect(() => {
	getSupervisores()
	},[newSupervisor]);

	const getSupervisores = async () => {
	  try {
	    const token = await getAccessTokenSilently();	    
	    const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/inspectors", {
	      headers: {
	        Authorization: `Bearer ${token}`
	      }
	    });

	    const responseData = await response.json();

	    setSupervisores(responseData);	    	    
	  } catch (error) {
	    console.error(error);
	  }
	};

	const agregarSup = async () => {
		try {
		const token = await getAccessTokenSilently();
		const post = {
		    "name": name,
		    "email": email   
		}

		const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/inspectors", {
			method: 'POST',
			body: JSON.stringify(post),
		  	headers: {
		    	Authorization: `Bearer ${token}`
		  	}
		});
		const responseData = await response.json();
		console.log(responseData)		
		setNewSupervisor(responseData);
		} catch (error) {
		console.error(error);
		}

	}




	return (
	  <div>
	  	
	    <h1>Agregar Supervisor</h1>

	    <form noValidate autoComplete="off">
	    	<TextField   
	    		label="Nombre"    		
	    		onChange={e => setName(e.target.value)}
	    	/>
	    	<br/>
	    	<TextField	    		
	    		label="Email"       		
	    		onChange={e => setEmail(e.target.value)}	    		
	    	/>
	            
	    </form>	    	    
	    <Button onClick={agregarSup}>Agregar Supervisor</Button>

	    <SupervisoresRegistrados supervisores = {supervisores}/>
	  </div>
	);
}

export default Supervisores