export const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {        
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Login failed');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};  