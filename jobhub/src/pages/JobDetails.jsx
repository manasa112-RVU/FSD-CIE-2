import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ApplicationForm
    from "../components/ApplicationForm";

function JobDetails() {

    const { id } =
        useParams();

    const [job, setJob] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchJob = async () => {

            try {

                const response =
                    await fetch(
                        `http://localhost:5000/api/jobs/${id}`
                    );

                const data =
                    await response.json();

                setJob(data);

            } catch (error) {

                console.error(
                    "Error fetching job:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        fetchJob();

    }, [id]);

    if (loading) {

        return (
            <div className="loading">
                Loading job details...
            </div>
        );
    }

    if (!job) {

        return (
            <div className="loading">
                Job not found.
            </div>
        );
    }

    return (
        <div className="dashboard">

            <Navbar />

            <main className="details-page">

                <Link
                    to="/jobs"
                    className="back-link"
                >
                    ← Back to Jobs
                </Link>

                <div className="job-details-card">

                    <div className="details-header">

                        <div>

                            <h1>
                                {job.title}
                            </h1>

                            <h3>
                                {job.company}
                            </h3>

                        </div>

                        <span className="job-type">
                            {job.type}
                        </span>

                    </div>

                    <div className="details-info">

                        <p>
                            📍 {job.location}
                        </p>

                        <p>
                            💰 {job.salary}
                        </p>

                        <p>
                            🏷️ {job.category}
                        </p>

                    </div>

                    <hr />

                    <h2>
                        Job Description
                    </h2>

                    <p>
                        {job.description}
                    </p>

                    <h2>
                        Required Skills
                    </h2>

                    <p>
                        {job.skills}
                    </p>

                </div>

                <ApplicationForm
                    job={job}
                />

            </main>

        </div>
    );
}

export default JobDetails;