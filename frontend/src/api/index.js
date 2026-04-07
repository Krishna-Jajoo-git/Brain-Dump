import toast from 'react-hot-toast';

export const apiRequest = async (endpoint, options = {}) => {
    // 1. Networking: Get the 'Passport' from the browser's memory
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // 2. Security: Attach the Token if the user is logged in
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        // 3. Execution: Talk to your Node.js server
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Safely parse JSON in case of server crash or proxy HTML error
        let data;
        const text = await response.text();
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            data = { message: text || "An unexpected server error occurred." };
        }

        // 4. Error Handling: If the server says "No" (400, 401, 500)
        if (!response.ok) {
            // If the token is expired, clear the memory
            if (response.status === 401) {
                localStorage.clear();
            }
            throw new Error(data.message || "Request failed");
        }

        return data; 
    } catch (error) {
        // 5. THE TOAST: Show the error popup automatically
        toast.error(error.message);
        throw error;
    }
};