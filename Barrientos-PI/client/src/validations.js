const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexPassword = /^(?=.*?[a-z]).{8,16}$/;
const regexNumbers = /[0-9]/;
const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

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
        if(!value) {
            setErrors({
                ...errors,
                [property]: "This field cant be empty"
            })
        }
        if(isNaN(Date.parse(value))) {
            setErrors({
                ...errors,
                [property]: "This field must be a Date"
            })
        }
        else {
            setErrors({
              ...errors,
              [property]: "",
            });
        }
    }
    // if (property === "rating") {
    //     if (!value) {
    //       setErrors({
    //         ...errors,
    //         [property]: "This field can't be empty",
    //       });
    //     } else if (typeof value !== "number" || value < 0 || value > 5) {
    //       setErrors({
    //         ...errors,
    //         [property]: "Rating must be a number between 0 and 5",
    //       });
    //     } else {
    //       setErrors({
    //         ...errors,
    //         [property]: "",
    //       });
    //     }
    //   }     
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
        if(!value.length) {
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
        if(!value.length) {
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