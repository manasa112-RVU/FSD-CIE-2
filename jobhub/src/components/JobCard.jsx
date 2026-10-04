import { Link } from "react-router-dom";

function JobCard({ job }) {
    const skillTags = job.skills
        ? job.skills.split(",").slice(0, 3)
        : [];

    return (
        <article className="job-card">
            <div className="job-card-header">
                <div>
                    <span className="job-badge">{job.category}</span>
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                </div>

                <span className="job-type">{job.type}</span>
            </div>

            <div className="job-info">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="job-skills">
                {skillTags.map((skill) => (
                    <span key={skill} className="skill-tag">
                        {skill.trim()}
                    </span>
                ))}
            </div>

            <Link to={`/jobs/${job.id}`} className="view-button">
                View Details
            </Link>
        </article>
    );
}

export default JobCard;