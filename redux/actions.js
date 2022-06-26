import axios from "axios";
import { refresh } from "../src/api/auth";
export const login = "LOGIN";
export const firstLaunch = "FIRSTLAUNCH"
export const bookmarkList = "BOOKMARKLIST"
// export const loginUser = (Email, Password) => {


//     try {

//         return async dispatch => {
//             const response = await axios(`${refresh}`, {
//                 email: Email,
//                 password: Password,
//             })

//             if (response.data) {
//                 dispatch({
//                     type: login,
//                     payload: response.data
//                 });
//             } else {
//                 console.log('Unable to fetch data from the API BASE URL!');
//             }
//         }

//     } catch (error) {
//         console.log(error);
//     }

// }