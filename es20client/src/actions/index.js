import axios from 'axios';
import jsonPlaceholder from '../apis/jsonPlaceholder';
import signUp from '../apis/signUp';
import signIn from '../apis/signIn';
import signOut from '../apis/signOut';
import CSRFToken from './cookies';

//Action creator
export const selectItem = (item) => {
	//Return an action
	return {
		type: 'ITEM_SELECTED',
		payload: item
	};
};

export const fetchItems = () => async dispatch => {	
		const response = await jsonPlaceholder.get('api/notes');
		dispatch({ type: 'FETCH_ITEMS', payload: response })
	};

export const signUpUser = (values) => async dispatch => {
		console.log('SignUpUser!');
		const token = values.password;
		const response = await signUp.post('/users', values,
		{
  			headers: {
    			'Authorization': `Basic ${token}` 
  			}
  		})
		dispatch({ type: 'SIGN_UP', payload: response });
};

export const signInUser = (values) => async dispatch => {
		console.log('SignInUser!');
		const token = values.password;
		const response = await signUp.post('/sessions/login', values,
		{
  			headers: {
    			'Authorization': `Basic ${token}` 
  			}
  		})
		dispatch({ type: 'SIGN_IN', payload: response });
};

export const signOutUser = (values) => async dispatch => {
		console.log('SignOutUser!');
		const token = values.password;
		const response = await signUp.post('/sessions/logout', values,
		{
  			headers: {
    			'Authorization': `Basic ${token}` 
  			}
  		})
		dispatch({ type: 'SIGN_OUT', payload: response });
};

export const addUser = (data, cookie) => (dispatch) => {
	console.log('addUser', data);
	const userCreds = data;
	console.log('document', document);
  axios
    .post(
      'http://localhost:3000/api/v1/users',
      { withCredentials: true, crossDomain : true },
      { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'X-CSRF-Token': cookie}},
      { user: data },
    )
    .then((response) => {
if (response.data.status === 500) {
      throw new Error(response.data.error)
    } 
    console.log('addUser Dispatch before LOGIN_USER response ', response);
    dispatch({ type: 'LOGIN_USER', user: response.data.user });
    dispatch({ type: 'CLEAR_ERROR' });
  })
    .catch((response) =>
      dispatch({ type: 'ADD_ERROR', error: response.message })
    );
};

export const loginUser = (data) => (dispatch) => {
	console.log('loginUser', data);
  axios
    .post(
      'http://localhost:3000/api/v1/sessions/login',
      { user: data },
      { withCredentials: true },
      { headers: {Authorization: 'XSRF-TOKEN'}}

    )
    .then((response) => {
if (response.data.status === 401) {
        throw new Error(response.data.error)
      }
    console.log('loginUser Dispatch before LOGIN_USER response ', response);

dispatch({type: 'LOGIN_USER', user: response.data.user.data.attributes});
      dispatch({ type: 'CLEAR_ERROR' });
})
    .catch((response) =>
      dispatch({ type: 'ADD_ERROR', error: response.message })
    );
};

export const logoutUser = (data) => (dispatch) => {
  axios
    .delete(
    	'http://localhost:3000/api/v1/sessions/logout',
    	{ withCredentials: true })
    .then((response) => {
      dispatch({ type: 'LOGOUT_USER' });
      dispatch({ type: 'CLEAR_ERROR' });
    })
    .catch((error) =>
      dispatch({ type: 'ADD_ERROR', error: 'Something went wrong. Try again.' })
    );
};
export const fetchCookie = () => async (dispatch) => {
		await fetch('/api/v1/home/all_items',
		    {   method: "GET", 
		       'credentials': 'include',
		        headers: new Headers({
		            'Accept': 'application/json',
		            'Content-Type': 'application/json',
		    })

		}).then((response) => {
		console.log('response fetchCookie', response);
		dispatch({ type: 'FETCH_COOKIE', payload: response })

	})
	.catch((error) => {
		console.log('fetchCookie error', error);
	});
}

export const fetchLoginStatus = () => (dispatch) => {
    fetch("/logged_in").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('user', user);
          // reimplement
          // setCurrentUser(user);
          // reimplement
          // setIsAuthenticated(true);
        });
      }
    })
};

// old axios call insidefetchLoginStatus()
  // axios
  //   .get(
  //     'http://localhost:3000/api/v1/sessions/logged_in',
  //     { withCredentials: true, crossDomain : true },
  //     { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}
  // )
  //   .then((response) => {
  //     console.log('response', response);
  //   dispatch({ type: 'FETCH_COOKIE', payload: response })

  //     if (response.data.logged_in) {
  //       dispatch({
  //         type: 'LOGIN_USER',
  //         user: response.data.user.data.attributes,
  //       });
  //       dispatch({ type: 'CLEAR_ERROR' });
  //     }
  //   })
  //   .catch((error) =>
  //     dispatch({ type: 'ADD_ERROR', error: 'Something went wrong. Try again.' })
  //   );


// export const fetchLoginStatus = () => (dispatch) => {
//   axios
//     .get(
//     	// 'http://localhost:3000/api/v1/sessions/logged_in',
//     	// "https://easytrendapi.herokuapp.com/api/v1/sessions/logged_in",
//     	"https://easytrendapi.herokuapp.com/api/v1/home/all_items",
//     	{ withCredentials: true })
//     .then((response) => {
//     	console.log('response', response);
//       if (response.data.logged_in) {
//         dispatch({
//           type: 'LOGIN_USER',
//           user: response.data.user,
//         });
//         dispatch({ type: 'CLEAR_ERROR' });
//       }
//     })
//     .catch((error) =>
//       dispatch({ type: 'ADD_ERROR', error: 'Something went wrong. Try again.' })
//     );
// };
