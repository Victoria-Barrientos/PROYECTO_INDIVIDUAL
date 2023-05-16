import { useState } from "react";
import styles from "./Login.module.css";
import { loginValidation } from "../../validations";

export const Login = () => {

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!form.email || !form.password){ return alert ('Fields cant be empty')}
        if(form.email && !form.password) return alert ('Please, write your password')
        if (errors.length > 0) return alert('Please, fill in all the fields before submitting')
        if (!errors.length) {
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
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      );
} 