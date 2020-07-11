import React, { Component } from 'react';
import PersonalDetails from './PersonalDetails'
import Results from './Results'

class AgregarAnfitrion extends Component {
	constructor(){
		super()
		this.state = {
		    created_at: "",
		    email: "",
		    email_verified: false,
		    identities: [
		        {
		            user_id: "",
		            connection: "",
		            provider: "",
		            isSocial: false
		        }
		    ],
		    name: "",
		    nickname: "",
		    picture: "",
		    updated_at: "",
		    user_id: "",

		    envio: true
		}

		
	}

	toggleChange = e => {

		const {envio} = this.state
		this.setState({
			envio: !envio
		})
	}


	handleChange = input => e =>{
		const {value} = e.target
		this.setState({
			[input]: value
		})

	}


	

	


	render() {
		const {name, nickname, email} = this.state
				const values = {name, nickname, email}
				return (
					<div>
						{this.state.envio ? <PersonalDetails 
												toggleChange={this.toggleChange}
												handleChange={this.handleChange}
												values={values}
											/> 
											: 
											<Results
												toggleChange={this.toggleChange}
												handleChange={this.handleChange}
												values={values}
											/>}	
					</div>
					
				
					
				)
	}
}



export default AgregarAnfitrion