const validate = values => {
    const errors = {};
    console.log(values);
    if (!values.sex) {
        errors.sex = 'Required'
    }

    if (!values.age) {
        errors.age = '나이를 입력하세요'
    }
    // if (!values.address) {
    //     errors.address = '*위치기반 추천을 위해 최소 \'동\'까지 입력'
    // }
    console.log(errors);
    return errors
};

export default validate;