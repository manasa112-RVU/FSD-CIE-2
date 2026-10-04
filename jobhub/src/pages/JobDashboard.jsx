import {
    useEffect,
    useState
} from "react";

import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import JobStatsComponent
    from "../components/JobStatsComponent";
import WelcomeBanner
    from "../components/WelcomeBanner";
import CategoryPills from "../components/CategoryPills";

function JobDashboard() {

    const [jobs, setJobs] =
        useState([]);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [category, setCategory] =
        useState("All");

    const companyHighlights = [
        "Google",
        "Microsoft",
        "Amazon",
        "Meta",
        "Stripe",
        "Adobe"
    ];

    const categoryOptions = [
        "All",
        "Data",
        "Development",
        "Design",
        "Business"
    ];

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/jobs"
                    );

                const data =
                    await response.json();

                setJobs(data);

            } catch (error) {

                console.error(
                    "Error fetching jobs:",
                    error
                );
            }
        };

        fetchJobs();

    }, []);

    const filteredJobs =
        jobs.filter((job) => {

            const search =
                searchTerm.toLowerCase();

            const matchesSearch =
                job.title
                    .toLowerCase()
                    .includes(search) ||

                job.company
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "All" ||
                job.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });

    return (
        <div className="dashboard">

            <Navbar />

            <main className="dashboard-content">

                <WelcomeBanner jobs={jobs} />

                <div className="company-strip">
                    <p>Trusted by hiring teams at</p>

                    <div className="company-list">
                        {companyHighlights.map((company) => (
                            <span key={company}>{company}</span>
                        ))}
                    </div>
                </div>

                <JobStatsComponent
                    jobs={jobs}
                />

                <div className="search-section" id="job-board">

                    <div className="search-input-wrap">
                        <input
                            type="text"
                            placeholder="Search jobs or companies..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Categories
                        </option>

                        <option value="Data">
                            Data
                        </option>

                        <option value="Development">
                            Development
                        </option>

                        <option value="Design">
                            Design
                        </option>

                        <option value="Business">
                            Business
                        </option>

                    </select>

                </div>

                <CategoryPills
                    categories={categoryOptions}
                    selected={category}
                    onSelect={setCategory}
                />

                <div className="jobs-header">

                    <div>
                        <h2>
                            Available Jobs
                        </h2>

                        <p>
                            Find opportunities matching your interests.
                        </p>
                    </div>

                    <span>
                        {filteredJobs.length} jobs found
                    </span>

                </div>

                <div className="jobs-list">

                    {filteredJobs.length > 0 ? (

                        filteredJobs.map(
                            (job) => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                />
                            )
                        )

                    ) : (

                        <div className="no-jobs">

                            <h3>
                                No jobs found
                            </h3>

                            <p>
                                Try changing your search or category.
                            </p>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default JobDashboard;