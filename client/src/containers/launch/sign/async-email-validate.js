import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:3000';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            axios.post(`${ROOT_URL}/isEmailExisted`, {email: values.email})
                .then(response => {
                    // If request is good...
                    const errors = {};
                    if(response.data.error){
                        errors.email = response.data.error;
                        reject(errors);
                    }
                    resolve();

                })
                .catch(response => {
                    reject('server error!');

                });
        }, 500)
    });
};

export default asyncValidate
