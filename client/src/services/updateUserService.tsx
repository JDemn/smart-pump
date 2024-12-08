import { SERVER } from "@/constants/constants"

export const updateUserS = async (formState: any, userId: string) => {
    try {
        let token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${SERVER}/api/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify({ ...formState }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Update failed');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
