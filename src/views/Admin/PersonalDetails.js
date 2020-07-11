import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import Button from '@material-ui/core/Button';

class PersonalDetails extends Component {

	render() {
		const {values, handleChange} = this.props
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<h1>Introducir datos del Usuario</h1>
					<TextField 
						hintText="Introduzca el nombre"
						floatingLabelText="Nombre"
						onChange={handleChange('name')}
						defaultValue={values.name}
						
					/>
					<br/>
					
					<TextField 
						hintText="Introduzca email"
						floatingLabelText="Email"
						onChange={handleChange('email')}
						defaultValue={values.email}
						
					/>
					<br/>
			        
			    	<Button 
			    		variant="contained" 
			    		color="primary"
			    		onClick={this.props.toggleChange}
			    		>Continuar
			    	</Button>

					
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button:{
		margin:15
	}
}

export  default PersonalDetails

