const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ==========================================
// TEMPORARY USER STORAGE
// ==========================================

const users = [];


// ==========================================
// TEMPORARY APPLICATION STORAGE
// ==========================================

const applications = [];


// ==========================================
// JOB DATA
// ==========================================

const jobs = [
    {
        id: 1,
        title: "Data Analyst",
        company: "TechNova Solutions",
        location: "Bengaluru",
        category: "Data",
        type: "Full Time",
        salary: "₹5 - 8 LPA",
        description:
            "Analyze business data and create reports to support decision making.",
        skills:
            "Python, SQL, Excel, Pandas, Data Visualization"
    },

    {
        id: 2,
        title: "Frontend Developer",
        company: "WebWorks India",
        location: "Hyderabad",
        category: "Development",
        type: "Full Time",
        salary: "₹6 - 10 LPA",
        description:
            "Build responsive and interactive web applications using modern frontend technologies.",
        skills:
            "HTML, CSS, JavaScript, React"
    },

    {
        id: 3,
        title: "Python Developer",
        company: "CodeCraft Technologies",
        location: "Pune",
        category: "Development",
        type: "Full Time",
        salary: "₹5 - 9 LPA",
        description:
            "Develop Python applications and automation solutions.",
        skills:
            "Python, Django, Flask, REST API"
    },

    {
        id: 4,
        title: "UI/UX Designer",
        company: "Creative Labs",
        location: "Mumbai",
        category: "Design",
        type: "Internship",
        salary: "₹20,000/month",
        description:
            "Design user-friendly interfaces and improve digital experiences.",
        skills:
            "Figma, Wireframing, Prototyping, UI Design"
    },

    {
        id: 5,
        title: "Business Analyst",
        company: "Insight Corp",
        location: "Chennai",
        category: "Business",
        type: "Full Time",
        salary: "₹5 - 7 LPA",
        description:
            "Analyze business requirements and support data-driven decisions.",
        skills:
            "Excel, SQL, Communication, Data Analysis"
    }
];


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "JobHub server is running"
    });
});


// ==========================================
// REGISTER
// ==========================================

app.post("/api/auth/register", (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const existingUser = users.find(
        (user) => user.email === email
    );

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "Registration successful",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
});


// ==========================================
// LOGIN
// ==========================================

app.post("/api/auth/login", (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = users.find(
        (user) =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});


// ==========================================
// GET ALL JOBS
// ==========================================

app.get("/api/jobs", (req, res) => {
    res.json(jobs);
});


// ==========================================
// GET SINGLE JOB
// ==========================================

app.get("/api/jobs/:id", (req, res) => {

    const jobId = Number(req.params.id);

    const job = jobs.find(
        (job) => job.id === jobId
    );

    if (!job) {
        return res.status(404).json({
            message: "Job not found"
        });
    }

    res.json(job);
});


// ==========================================
// SUBMIT APPLICATION
// ==========================================

app.post("/api/applications", (req, res) => {

    const {
        jobId,
        jobTitle,
        applicantName,
        applicantEmail,
        phone,
        resume,
        coverLetter
    } = req.body;

    if (
        !jobId ||
        !applicantName ||
        !applicantEmail ||
        !phone ||
        !resume
    ) {
        return res.status(400).json({
            message: "Please fill all required fields"
        });
    }

    const newApplication = {
        id: applications.length + 1,
        jobId,
        jobTitle,
        applicantName,
        applicantEmail,
        phone,
        resume,
        coverLetter,
        status: "Applied"
    };

    applications.push(newApplication);

    res.status(201).json({
        message: "Application submitted successfully",
        application: newApplication
    });
});


// ==========================================
// GET APPLICATIONS FOR A USER
// ==========================================

app.get("/api/applications", (req, res) => {

    const email = req.query.email;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const userApplications =
        applications.filter(
            (application) =>
                application.applicantEmail === email
        );

    res.json(userApplications);
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

    console.log(
        `JobHub server running on http://localhost:${PORT}`
    );

});