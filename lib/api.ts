const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"; // Fallback URL for development

// Helper function to handle API requests
async function apiRequest(endpoint: string, method: string, body?: any): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Request failed");
    }

    return response.json();
  } catch (error: any) {
    console.error(`Error in API request: ${method} ${endpoint}`, error);
    return { error: error.message || "Unknown error occurred" };
  }
}

// Function to register a new user
export async function registerUser(email: string, password: string): Promise<any> {
  return apiRequest("/auth/register", "POST", { email, password });
}

// Function to log in a user
export async function loginUser(email: string, password: string): Promise<any> {
  return apiRequest("/auth/login", "POST", { email, password });
}

// Function to send a thought to the backend
export async function processThought(user_id: string, thought: string): Promise<any> {
  return apiRequest("/thoughts/process", "POST", { user_id, thought });
}

// Function to get thoughts for a user
export async function getUserThoughts(user_id: string): Promise<any> {
  return apiRequest(`/thoughts/get/${user_id}`, "GET");
}
