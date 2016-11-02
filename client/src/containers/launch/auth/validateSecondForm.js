const validateSecondForm = values => {
    const errors = {};
    if (!values.email) {
        errors.email = '이메일을 입력하세요.'
    }
    else if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(values.email)) {
        errors.email = '이메일 형식에 맞게 입력하세요.'
        console.log("6");
    }
    // if (!values.sex) {
    //     errors.sex = 'Required'
    // }
    // if (!values.favoriteColor) {
    //     errors.favoriteColor = 'Required'
    // }
    // if (!values.age) {
    //     errors.age = '나이를 입력하세요'
    // }
    // if (!values.address) {
    //     errors.address = '*위치기반 추천을 위해 최소 \'동\'까지 입력'
    // }
    console.log(errors);
    return errors
};

export default validateSecondForm