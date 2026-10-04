function JobStatsComponent({ jobs }) {
    const totalJobs = jobs.length;

    const fullTimeJobs = jobs.filter(
        (job) => job.type === "Full Time"
    ).length;

    const internshipJobs = jobs.filter(
        (job) => job.type === "Internship"
    ).length;

    return (
        <div className="job-stats">

            <div className="stat-card">
                <h3>{totalJobs}</h3>
                <p>Total Jobs</p>
            </div>

            <div className="stat-card">
                <h3>{fullTimeJobs}</h3>
                <p>Full Time</p>
            </div>

            <div className="stat-card">
                <h3>{internshipJobs}</h3>
                <p>Internships</p>
            </div>

        </div>
    );
}

export default JobStatsComponent;