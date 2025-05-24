import { useEffect, useState } from 'react';
import axios from 'axios';

export const TestComponent = () => {
  const [ data, setData ] = useState( null );
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    axios.get( 'http://localhost:3000/api/test' )
      .then( response => {
        setData( response.data );
        setLoading( false );
      } )
      .catch( error => {
        console.error( 'API Error:', error );
        setLoading( false );
      } );
  }, [] );

  if ( loading ) return <div>Loading...</div>;

  return (
    <div>
      <h2>Тест API</h2>
      <pre>{JSON.stringify( data, null, 2 )}</pre>
    </div>
  );
};