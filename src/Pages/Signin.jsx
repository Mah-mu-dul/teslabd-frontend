import { NavLink } from "react-router-dom";

const Signin = () => {
    return (
        <div className="h-96 flex justify-center items-center w-96 mx-auto glass mt-5 rounded" >
            <NavLink to="/" className="btn ">Sign in with google</NavLink>
        </div>
    );
};

export default Signin;