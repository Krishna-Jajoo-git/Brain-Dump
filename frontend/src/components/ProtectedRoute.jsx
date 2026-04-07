import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 1. Check: Is the 'Passport' (Token) in the browser's memory?
    const token = localStorage.getItem('token');

    // 2. The Decision:
    if (!token) {
        // If no token, kick them to the login page
        return <Navigate to="/login" replace />;
    }

    // 3. The Green Light:
    // If token exists, show the "children" (the actual page content)
    return children;
};

export default ProtectedRoute;