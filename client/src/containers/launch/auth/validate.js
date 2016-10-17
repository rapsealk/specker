const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = '이름을 입력하세요.'
    }
    if (!values.password) {
        errors.password = ''
    }
    if(!values.passwordconfirm){
        errors.passwordconfirm="비밀번호확인을 입력하세요"
    }
    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    if (!values.email) {
        errors.email = '이메일을 입력하세요.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '이메일 형식에 맞게 입력하세요.'
    }
    if (!values.sex) {
        errors.sex = 'Required'
    }
    if (!values.favoriteColor) {
        errors.favoriteColor = 'Required'
    }
    if (!values.age) {
        errors.age = '나이를 입력하세요'
    }
    if (!values.address) {
        errors.address = '*위치기반 추천을 위해 최소 \'동\'까지 입력'
    }

    return errors
};

export default validate