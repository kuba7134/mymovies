import { useForm } from "react-hook-form";
import axios from 'axios'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [response, setResponse] = useState("")

    const onSubmit = (data) => {
        console.log(data)
        axios.post('https://my-movies7.herokuapp.com/register', data)
            .then(function (response) {
                setResponse(response)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error.response);
                setResponse(error.response)
            });
    }

    return (
        <motion.div
            className='register'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: .3 } }}
            exit={{ x: "100vw", transition: { duration: .3 } }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                Sign up:
                <input
                    type="text"
                    placeholder="Login"
                    name="login"
                    {...register(
                        "login",
                        {
                            minLength: { value: 6, message: "Login must contain atleast 6 characters" },
                            required: "Login is required"
                        }
                    )}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register(
                        "password",
                        {
                            minLength: { value: 6, message: "Password must contain atleast 6 characters" },
                            required: "Password is required"
                        }
                    )}
                />
                <div className="errormsg">
                    {errors.login && <p>{errors.login.message}</p>}
                    {!errors.login && errors.password && <p>{errors.password.message}</p>}
                    {response.status === 409 && !errors.login && !errors.password && response.data}
                    {response.status === 201 && !errors.login && !errors.password && response.data}
                </div>
                <input type="submit" value="Sign up" />
                <p>You already have an account? <Link to="/login">Sign in here!</Link></p>
            </form>
        </motion.div>
    );
}

export default Register;