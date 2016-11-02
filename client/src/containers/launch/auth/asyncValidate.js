import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:3000';
// axios.post(`${ROOT_URL}/getClassification`,{keyword:keyword}, {
//     headers: {
//         authorization: localStorage.getItem('token'),
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => {
//         dispatch({
//             type: GET_CLASSIFICATION_TAG_DATA,
//             payload: response.data
//         });
//         callback();
//     })
//     .catch(response => {
//         console.log("whywhy?", response.response.data);
//     });
// }


// const asyncValidate = (values/*, dispatch */) => {
//     return sleep(1000) // simulate server latency
//         .then(() => {
//             if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
//                 throw { username: 'That username is taken' }
//             }
//         })
// }
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            axios.post(`${ROOT_URL}/isEmailExisted`, {email: values.email})
                .then(response => {
                    // If request is good...
                    const errors = {}

                    console.log("sdsdsd2323", response.data);
                    if(response.data.error){
                        errors.email = response.data.error;
                        reject(errors);
                    }
                    resolve();

                })
                .catch(response => {
                    console.log("sdsdsd", response);
                    reject('server error!');

                });
        }, 500)
    });
};







// const asyncValidate = (values/*, dispatch */) => {
//     return sleep(1000) // simulate server latency
//         .then(() => {
//             if ([ 'john@naver.com', 'paul', 'george', 'ringo' ].includes(values.email)) {
//                 throw { email: 'That username is taken' }
//             }
//         })
// }
export default asyncValidate




//
// const asyncValidate = (values, dispatch) => {
//     return new Promise((resolve, reject) => {
//         dispatch(validatePostFields(values))
//             .then((response) => {
//                 let data = response.payload.data;
//                 let status = response.payload.status;
//                 //if there is an error
//                 if(status != 200 || data.title || data.categories....) {
//                     //let other comps know of error by updating redux` state
//                     dispatch(validatePostFieldsFailure(response.payload));
//                     reject(data); //this is for redux-form itself
//                 } else {
//                     //let other comps know success by updating redux` state
//                     dispatch(validatePostFieldsSuccess(response.payload));
//                     resolve();//this is for redux-form itself
//                 }
//             }); //dispatch
//     }); //promise
// };