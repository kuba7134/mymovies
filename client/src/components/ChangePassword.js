import { useForm } from "react-hook-form";
import axios from 'axios'
import { motion } from "framer-motion";
import { useState } from "react";

const ChangePassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ response, setResponse ]   = useState(false)
    const onSubmit = (data) => {
        data.token = localStorage.token
        console.log(data)
        axios.post('https://my-movies7.herokuapp.com/changepassword', data)
            .then(function (response) {
                setResponse(true)
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
            {}
            <form onSubmit={handleSubmit(onSubmit)}>
                Type in a new password:
                <input
                    type="password"
                    placeholder="Password"
                    name="newPassword"
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
                    {!errors.login && !errors.password && response && <p>Password has been changed.</p>}
                </div>

                <input type="submit" value="Change password" />
            </form>
        </motion.div>
    );
}

export default ChangePassword;
