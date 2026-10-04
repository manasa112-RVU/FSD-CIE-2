import React, { Component } from "react";

class WelcomeBanner extends Component {
    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();
        this.state = {
            selectedFileName: "Upload resume"
        };
    }

    handleResumeUpload = (event) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            this.setState({ selectedFileName: file.name });
        }
    };

    render() {

        const { jobs = [] } = this.props;
        const featuredSkills = [
            "React",
            "Product",
            "Data",
            "Design"
        ];

        return (
            <div className="welcome-banner">

                <div className="banner-copy">
                    <span className="banner-label">
                        Your next opportunity starts here
                    </span>

                    <h2>
                        Discover jobs that match your ambition.
                    </h2>

                    <p>
                        Explore handpicked roles from top companies and fast-growing teams.
                    </p>

                    <div className="banner-actions">
                        <a href="#job-board" className="primary-action">
                            Browse jobs
                        </a>

                        <>
                            <input
                                type="file"
                                ref={this.fileInputRef}
                                accept=".pdf,.doc,.docx"
                                onChange={this.handleResumeUpload}
                                className="hidden-file-input"
                            />

                            <button
                                type="button"
                                className="secondary-action"
                                onClick={() => this.fileInputRef.current?.click()}
                            >
                                {this.state.selectedFileName}
                            </button>
                        </>
                    </div>

                    <div className="banner-mini-stats">
                        <div>
                            <strong>{jobs.length}</strong>
                            <span>Live jobs</span>
                        </div>
                        <div>
                            <strong>12k+</strong>
                            <span>Talent matched</span>
                        </div>
                        <div>
                            <strong>4.9/5</strong>
                            <span>Candidate rating</span>
                        </div>
                    </div>
                </div>

                <div className="banner-highlight">
                    <p className="highlight-title">Trending roles</p>

                    <div className="skill-list">
                        {featuredSkills.map((skill) => (
                            <span key={skill} className="skill-chip">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="highlight-box">
                        <p>Top employers</p>
                        <strong>4,800+ companies hiring</strong>
                    </div>
                </div>

            </div>
        );
    }
}

export default WelcomeBanner;