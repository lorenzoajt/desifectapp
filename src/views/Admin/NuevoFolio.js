import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';



const opcionesFolios = [
  {
    value: '50',
    label: '50',
  },
  {
    value: '100',
    label: '100',
  },
  {
    value: '500',
    label: '500',
  },
  {
    value: '1000',
    label: '1,000',
  },
  {
    value: '10000',
    label: '10,000',
  },
  {
    value: '1000000',
    label: '1,000,000',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function NuevoFolio({match}) {
  const classes = useStyles();
  const [numFoliosDengue, setNumFoliosDengue] = React.useState('');
  const [numFoliosDesinfeccion, setNumFoliosDesinfeccion] = React.useState('');
  const [numFoliosLimpieza, setNumFoliosLimpieza] = React.useState('');
  const { getAccessTokenSilently } = useAuth0();
  const {hostId} = match.params
  const numTickets = 50

  const agregarFolios = async () => {

    try {
      const token = await getAccessTokenSilently();

      //Crear Folios de dengue
      if(numFoliosDengue > 0){
        let url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/create/${numFoliosDengue}` //agregar el num de tickets
        const post = {
            createdFor: hostId,
            "tipoServicio": "Dengue" 
        }
        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        });
        const responseData = await response.json();
      }
      //Crear Folios de desinfeccion
      if(numFoliosDesinfeccion > 0){
        let url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/create/${numFoliosDesinfeccion}` //agregar el num de tickets
        const post = {
            createdFor: hostId, 
            "tipoServicio": "Desinfeccion" 
        }
        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        });
        const responseData = await response.json();
      }
      //Crear Folios de Limpieza
      if(numFoliosLimpieza > 0){
        let url = `https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/desinfectiontickets/create/${numFoliosLimpieza}` //agregar el num de tickets
        const post = {
            createdFor: hostId, 
            "tipoServicio": "Limpieza" 
        }
        
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {          
            "Authorization": "Bearer "+ token
          }
        });
        const responseData = await response.json();
      }
      
    } catch (error) {
      console.error(error);
    }
  };





  const handleChange = servicio => (event) => {
    
    switch (servicio){
      case 'Dengue':
          setNumFoliosDengue(event.target.value)
          break
      case 'Desinfeccion':
          setNumFoliosDesinfeccion(event.target.value)
          break
      case 'Limpieza':
          setNumFoliosLimpieza(event.target.value)
          break
      default:
          setNumFoliosDengue(0)
          setNumFoliosDesinfeccion(0)
          setNumFoliosLimpieza(0)

    }
    
  };

  return (
    <div>
      <h1>{hostId}</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            select
            label="Número de folios"
            value={numFoliosDengue}
            onChange={handleChange('Dengue')}
            helperText="Dengue"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Número de folios"
            value={numFoliosDesinfeccion}
            onChange={handleChange('Desinfeccion')}
            helperText="Desinfeccion"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField          
            select
            label="Número de folios"
            value={numFoliosLimpieza}
            onChange={handleChange('Limpieza')}
            helperText="Limpieza"
          >
            {opcionesFolios.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
       
          
        </div>
      </form>

      <h1>Se crearán: </h1>
      <h3>{numFoliosDengue} folios de Dengue</h3>
      <h3>{numFoliosLimpieza} folios de Limpieza</h3>
      <h3>{numFoliosDesinfeccion} folios de Desinfección</h3>

      <Button 
        variant="contained" 
        color="primary"
        component={Link} to="Admin/folios"
        onClick={agregarFolios}

        >Agregar Folios
      </Button>
    </div>
  );
}
