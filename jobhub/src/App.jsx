import {
    Routes,
    Route
} from "react-router-dom";

import Authentication from "./pages/Authentication";
import JobDashboard from "./pages/JobDashboard";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";

function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<Authentication />}
            />

            <Route
                path="/jobs"
                element={<JobDashboard />}
            />

            <Route
                path="/jobs/:id"
                element={<JobDetails />}
            />

            <Route
                path="/applications"
                element={<MyApplications />}
            />

        </Routes>
    );
}

export default App;