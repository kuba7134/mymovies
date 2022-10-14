import { useForm } from "react-hook-form";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { useState } from "react";


const Login = (props) => {

    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ denial, setDenial ] = useState(false)
    const onSubmit = (data) => {
        axios.post('https://my-movies7.herokuapp.com/login', data)
            .then(function (response) {
                if (response.data.status === "ok") {
                    console.log("got the token:", response.data.data);
                    localStorage.setItem('token', response.data.data);
                    localStorage.setItem('user', response.data.username);
                    navigate("/", { replace: true })
                } else {
                    console.log(response.data.data)
                    setDenial(response.data.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
            <motion.div
                className='register'
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: .3}}}
                exit={{x: "100vw", transition: { duration: .3}}}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    Sign in:
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
                        {denial && !errors.login && !errors.password && <p>{denial}</p>}
                    </div>
                    <input type="submit" value="Sign in" />
                    <p>Don't have an account? <Link to="/register">Sign up here!</Link></p>
                </form>
            </motion.div>
    );
}

export default Login;