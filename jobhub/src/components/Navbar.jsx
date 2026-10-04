import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem(
                "jobhubUser"
            )
        );

    const handleLogout = () => {

        localStorage.removeItem(
            "jobhubUser"
        );

        navigate("/");
    };

    return (
        <nav className="navbar">

            <Link
                to="/jobs"
                className="logo"
            >
                JobHub
            </Link>

            <div className="nav-links">

                <Link to="/jobs">
                    Jobs
                </Link>

                <Link to="/applications">
                    My Applications
                </Link>

                <span className="user-name">
                    {user?.name || "User"}
                </span>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;