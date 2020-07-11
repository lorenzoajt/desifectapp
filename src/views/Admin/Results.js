import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import {List, ListItem} from 'material-ui/List'
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


function Results (props) {
	const { getAccessTokenSilently } = useAuth0();
	
	const postToAPI = async () => {
	  try {
	    const token = await getAccessTokenSilently();	
	    const post = {
	        "email": email,		        
	        "name": name		    
	    }	  
	    const response = await fetch('https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/hosts', {
	      method: 'POST',
	      body: JSON.stringify(post),
	      headers: {
	        Authorization: `Bearer ${token}`
	      }
	    });

	    const responseData = await response.json();
	    console.log("responseData del crear usuario: ", responseData)
	  } catch (error) {
	    console.error(error);
	  }
	};






	
	const {values: {name, nickname, email }} = props
	return (
		<MuiThemeProvider>
			<React.Fragment>
				<h1>Confirme los datos del Anfitrión</h1>
				<List>
					<ListItem	
						primaryText="Name"
						secondaryText={name}
					/>
					
					<ListItem
						primaryText="email"
						secondaryText={email}
					/>
				</List>


				<Button 
					variant="contained" 
					
					onClick={props.toggleChange}
					>Atras
				</Button>
				<Button 
					variant="contained"
					color="primary" 						
					onClick={postToAPI}
					component={Link} to="Admin/anfitriones"
					>Confirmar
				</Button>
				

				
				
			</React.Fragment>
		</MuiThemeProvider>

	);
	
}

const styles = {
	button:{
		margin:15
	}
}
export default Results