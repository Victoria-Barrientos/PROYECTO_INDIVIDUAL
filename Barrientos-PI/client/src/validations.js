const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPassword = /^(?=.*?[a-z]).{8,16}$/;
const regexNumbers = /[0-9]/

export const loginValidation = (property, value, errors, setErrors) => {
    if (property === 'email') {
        if (!value) {
            setErrors({
                ...errors,
                [property]: "Email cant be an empty field"
            })
        }
        if (!regexEmail.test(value)) {
            setErrors({
                ...errors,
                [property]: "This field must be an email"
            })
        } else {
            setErrors({})
        }
    }
    if(property === 'password') {
        if(!value) {
            setErrors({
                ...errors,
                [property]: "Password cant be an empty field"
            })
        } 
        if(!(regexPassword.test(value))) {
            setErrors({
                ...errors,
                [property]: "Password should be between 8 and 16 characters"
            })
        }
        if(!regexNumbers.test(value)) {
            setErrors({
                ...errors,
                [property]: "Password should have at least one number"
            })
        }
        else {
            setErrors({})
        }
    }
};

export const newVideogameValidation = (property, value, errors, setErrors) => {
    if(property === "name") {
        if(!value) {
            setErrors({
                ...errors,
                name: "This field cant be empty"
            })
        }
        if(typeof (value) === "string") {
            setErrors({})
        }
    }
    if(property === "description") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
    if(property === "releaseDate") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
    if(property === "rating") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
    if(property === "image") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
    if(property === "platforms") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
    if(property === "genres") {
        if(!value) {
            throw Error("This field cant be empty")
        }
    }
}