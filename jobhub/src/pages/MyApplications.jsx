import {
    useEffect,
    useState
} from "react";

import Navbar from "../components/Navbar";

function MyApplications() {

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const user =
        JSON.parse(
            localStorage.getItem(
                "jobhubUser"
            )
        );

    useEffect(() => {

        const fetchApplications =
            async () => {

                if (!user) {
                    setLoading(false);
                    return;
                }

                try {

                    const response =
                        await fetch(
                            `http://localhost:5000/api/applications?email=${encodeURIComponent(
                                user.email
                            )}`
                        );

                    const data =
                        await response.json();

                    setApplications(data);

                } catch (error) {

                    console.error(
                        "Error fetching applications:",
                        error
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchApplications();

    }, []);

    return (
        <div className="dashboard">

            <Navbar />

            <main className="dashboard-content">

                <div className="page-heading">

                    <h1>
                        My Applications
                    </h1>

                    <p>
                        Track the jobs you have
                        applied for.
                    </p>

                </div>

                {loading ? (

                    <div className="no-jobs">
                        Loading applications...
                    </div>

                ) : applications.length === 0 ? (

                    <div className="no-jobs">

                        <h3>
                            No applications yet
                        </h3>

                        <p>
                            Apply for a job and
                            it will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="applications-list">

                        {applications.map(
                            (application) => (

                                <div
                                    className="application-card"
                                    key={
                                        application.id
                                    }
                                >

                                    <div>

                                        <h3>
                                            {
                                                application.jobTitle
                                            }
                                        </h3>

                                        <p>
                                            Applicant:
                                            {" "}
                                            {
                                                application.applicantName
                                            }
                                        </p>

                                        <p>
                                            Phone:
                                            {" "}
                                            {
                                                application.phone
                                            }
                                        </p>

                                    </div>

                                    <span className="status">
                                        {
                                            application.status
                                        }
                                    </span>

                                </div>
                            )
                        )}

                    </div>

                )}

            </main>

        </div>
    );
}

export default MyApplications;