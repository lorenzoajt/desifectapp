import React, { useMemo, useState, useEffect } from "react";
import TableComponent from './TableComponent'

import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Anfitriones.css'

export default function Folios() {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState([]);
  
  
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch("https://8v2y1j7bf2.execute-api.us-east-1.amazonaws.com/dev/users/hosts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseData = await response.json();

        setData(responseData);
        console.log(responseData)
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const columns = useMemo(
      () => [
        {
          Header: "Anfitriones Registrados",
          columns: [
            {
              Header: "Accion",
              accessor: "user_id",
              Cell: ({value}) => (<Button 
                                    onClick={()=>{console.log('clicked value', value)}}
                                    color="primary"
                                    variant="contained"
                                    style={{textTransform: 'none'}}
                                    size="small"
                                    component={Link} to={`/nuevoFolio/${value}`}
                                  >Agregar Folio
                                  </Button>)
            },
            {
              Header: "Nombre",
              accessor: "name"
            },
            {
              Header: "E-mail",
              accessor: "email"
            },
            {
              Header: "Id de usuario",
              accessor: ""
            }
          ]
        }
      ],
      []
    );
  
  
  
  

  return (

    
//TODO: Desplegar tabla de anfitriones con opcion para editar folios
    <div>

      <TableComponent columns={columns} data={data} />
      

     

    </div>
  );
}
