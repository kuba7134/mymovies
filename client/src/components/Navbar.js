import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const [toggle, setToggle] = useState(true)
    let navigate = useNavigate();

    useEffect(() => {
    }, [toggle])

    return (
        <nav>
            <Link style={{ textDecoration: 'none', color: "black" }} to={`/`}>
                <motion.h1 initial={{ fontSize: 0, opacity: 0 }} animate={{ fontSize: "1.5em", opacity: 1, transition: { duration: .3 } }}>My movies</motion.h1>
            </Link>
            <motion.div
                className="rightSide"
                initial={{ scale: .1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: .3 } }}
            >
                {localStorage.user ?
                    <>
                        {localStorage.user &&
                            <>
                                User: <Link style={{ textDecoration: 'none', color: "black", fontWeight: "650" }} to="/changepassword">{localStorage.user}</Link>
                            </>}
                        <button className="navbar-button" onClick={() => {
                            navigate("/login", { replace: true })
                            localStorage.clear()
                            props.setFav("")
                            setToggle(!toggle)
                        }
                        }>Logout</button>
                    </>
                    :
                    <button className="navbar-button" onClick={() => {
                        navigate("/login", { replace: true })
                    }
                    }>Login</button>
                }

            </motion.div>
            <form onSubmit={props.handleSubmit}>
                    <div id="title" className="fancy-input">
                        <input
                            type="text"
                            placeholder=" "
                            required
                            className="form-input"
                            id="search"
                            value={props.title}
                            onChange={(e) => props.setTitle(e.target.value)}
                        />
                        <label htmlFor="search" className="form-label">Title</label>
                    </div>
                    <div className="fancy-input">
                        <select
                            name="Type"
                            className="select-type"
                            value={props.type}
                            onChange={(e) => props.setType(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                    <div className="fancy-input">
                        <input
                            type="number"
                            min={1900}
                            max={2030}
                            id="year"
                            placeholder=" "
                            className="form-input"
                            value={props.year}
                            onChange={(e) => props.setYear(e.target.value)}
                        />
                        <label htmlFor="year" className="form-label">Year</label>
                    </div>
                    <button onClick={() => navigate("/search", { replace: true })}>Search</button>
                </form>
        </nav>
    );
}

export default Navbar;