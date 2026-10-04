import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplicationForm({ job }) {

    const navigate = useNavigate();

    const user =
        JSON.parse(
            localStorage.getItem(
                "jobhubUser"
            )
        );

    const [phone, setPhone] =
        useState("");

    const [resume, setResume] =
        useState("");

    const [coverLetter, setCoverLetter] =
        useState("");

    const handleResumeChange = (event) => {
        const file = event.target.files && event.target.files[0];
        setResume(file ? file.name : "");
    };

    const [message, setMessage] =
        useState("");

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            if (!user) {

                setMessage(
                    "Please login before applying."
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/applications",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                jobId: job.id,
                                jobTitle: job.title,
                                applicantName:
                                    user.name,
                                applicantEmail:
                                    user.email,
                                phone,
                                resume,
                                coverLetter
                            })
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    setMessage(
                        data.message
                    );

                    return;
                }

                setMessage(
                    "Application submitted successfully!"
                );

                setPhone("");
                setResume("");
                setCoverLetter("");

                setTimeout(() => {

                    navigate(
                        "/applications"
                    );

                }, 1000);

            } catch (error) {

                console.error(error);

                setMessage(
                    "Unable to submit application."
                );
            }
        };

    return (
        <form
            className="application-form"
            onSubmit={handleSubmit}
        >

            <h2>
                Apply for this Position
            </h2>

            {!user && (
                <p className="form-message">
                    Please login before applying.
                </p>
            )}

            <label>
                Full Name
            </label>

            <input
                type="text"
                value={
                    user?.name || ""
                }
                disabled
            />

            <label>
                Email
            </label>

            <input
                type="email"
                value={
                    user?.email || ""
                }
                disabled
            />

            <label>
                Phone Number
            </label>

            <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(event) =>
                    setPhone(
                        event.target.value
                    )
                }
                required
            />

            <label>
                Resume
            </label>

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                required
            />

            {resume && (
                <p className="file-selected">
                    Selected file: {resume}
                </p>
            )}

            <label>
                Cover Letter
            </label>

            <textarea
                placeholder="Write a short cover letter"
                value={coverLetter}
                onChange={(event) =>
                    setCoverLetter(
                        event.target.value
                    )
                }
                rows="5"
            />

            <button
                type="submit"
            >
                Submit Application
            </button>

            {message && (
                <p className="form-message">
                    {message}
                </p>
            )}

        </form>
    );
}

export default ApplicationForm;