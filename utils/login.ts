
// import {GET_PAGE_BY_ID} from '../queries/pages/get-page';
import { LOGIN } from "../lib/mutations/login";
import { v4 } from 'uuid';

// export async function getPreviewPage( id ) {

// 	const { data, errors } = await client.query( {
// 		query: GET_PAGE_BY_ID,
// 		variables: {
// 			id: Number( id ),
// 		},
// 	} );


// 	return data || {};
// }

export async function loginUser( {username, password}: {username: string; password: string}) {
 
	
  const data = await LOGIN(password || '', username || '', v4())

	return data || {};
}

