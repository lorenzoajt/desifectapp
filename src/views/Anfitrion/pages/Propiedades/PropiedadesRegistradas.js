import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import image from "./brown-and-white-wooden-house-164558.jpg"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ListSubheader from '@material-ui/core/ListSubheader';

import AreasRegistradas from './AreasRegistradas'

import Tile from './Tile'

import defaultImage from './brown-and-white-wooden-house-164558.jpg'
function PropiedadesRegistradas(props){
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([])
  const [imgUrl, setImgUrl] = useState("")  

  const {values, handleChange, nextNextStep, getPropertyId} = props

  useEffect(() => {
      mostrarPropiedades()
    }, [data]);


  

  const mostrarPropiedades = async () => {
    try {
      const token = await getAccessTokenSilently();  
      const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/properties", {
        method: 'GET',        
          headers: {
            Authorization: `Bearer ${token}`
          }
      });      
      const responseData = await response.json();           
      setData(responseData.items)      
    } catch (error) {
      console.error(error);
    }
  };
  




  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  const classes = useStyles();
 
  
  
  return(



    <div className={classes.root}>
            
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            
          </GridListTile>
          
          {data && data.map((tile) => (            
              <div key={tile.propertyId}> 
                <Tile tile={tile} />
              </div>
            ))
          }
        </GridList>

        

    </div>
  )
}

export default PropiedadesRegistradas