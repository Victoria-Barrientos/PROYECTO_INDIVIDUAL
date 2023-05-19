const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPassword = /^(?=.*?[a-z]).{8,16}$/;
const regexNumbers = /[0-9]/;
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
const isValidDateRegex = /^\d{4}-\d{2}-\d{2}$/;

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
            setErrors({
              ...errors,
              [property]: "",
            });
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
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
};

export const newVideogameValidation = (property, value, errors, setErrors) => {
    if(property === "name") {
        if(!value) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        if(typeof (value) !== "string") {
            setErrors({
                ...errors,
                [property]: "This field must be a string"
            })
        }
        if(value.length < 1 || value.length > 25) {
            setErrors({
                ...errors,
                [property]: "This field must contain between 1 and 25 characters"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    if(property === "description") {
        if(!value) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        if(typeof (value) !== "string") {
            setErrors({
                ...errors,
                [property]: "This field must be a string"
            })
        }
        if(value.length < 10 || value.length > 500) {
            setErrors({
                ...errors,
                [property]: "This field must contain between 10 and 500 characters"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    if(property === "releaseDate") {
        if(value.length === 0) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        if (!isValidDateRegex.test(value)) {
            setErrors({
              ...errors,
              [property]: "Invalid date format",
            });
          }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    if(property === "rating") {
        if(!value) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    if (property === "image") {
        if (!value) {
          setErrors({
            ...errors,
            [property]: "This field can't be empty",
          });
        } else if (typeof value !== "string") {
          setErrors({
            ...errors,
            [property]: "This field must be a string",
          });
        } else if (!urlPattern.test(value)) {
          setErrors({
            ...errors,
            [property]: "Invalid URL format",
          });
        } else {
            setErrors({
              ...errors,
              [property]: "",
            });
          }
      }
    if(property === "platforms") {
        if(value.length === 0) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    if(property === "genres") {
        if(value.length === 0) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
}