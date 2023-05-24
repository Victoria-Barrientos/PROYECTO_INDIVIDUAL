import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { loginValidation } from "../../validations";

export const Login = ({login}) => {

    const [isFormValid, setIsFormValid] = useState(false);
    
    const [form, setForm] = useState(
        {
        email: "",
        password: ""
        }
    );

    const [errors, setErrors] = useState(
        {}
    );

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm(
            {
                ...form,
                [property]: value
            }
        )
        loginValidation(property, value, errors, setErrors)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid) {
        login(form)
        setForm({
            email: "",
            password: ""
            }
        )
        setErrors(
            {}
        )
        }
    };

    useEffect(() => {
      const isValid = (Object.keys(errors).length === Object.keys(form).length) && Object.values(errors).every((error) => error === "");
      setIsFormValid(isValid);
    }, [errors, form]);

    return (
        <div className={styles.container}>
          <h2>Login</h2>
          <div className={styles.imageContainer}>
            <img src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="login-img" />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
              <div>{errors?.email}</div>
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} />
              <div>{errors?.password}</div>
            </div>
            <div>
              <button type="submit" disabled={!isFormValid} className={`${styles.loginButton} ${isFormValid ? '' : styles.disabledLoginButton}`}>Login</button>
            </div>
          </form>
        </div>
      );
} 