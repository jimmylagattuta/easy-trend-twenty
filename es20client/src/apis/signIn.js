import axios from 'axios';

// live and long to update
export default axios.create({
	baseURL: "https://easytrendapi.herokuapp.com/api/v1"
});

// local for effecient developement
// export default axios.create({
// 	baseURL: "http://localhost:3000/api/v1"
// });