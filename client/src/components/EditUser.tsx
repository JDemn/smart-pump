import { useAppContext } from "@/context/AppContext";
import { useForm } from "@/hooks/useForm";
import { Alert, Box, Button, TextField, Typography } from "@mui/material"

export const EditUser = () => {
    const { user, error, gralMsg , updateUser} = useAppContext(); 
    
    const { onInputChange , formState } = useForm({
        name: {
            first: user?.name?.first || '',
            last: user?.name?.last || ''
        },
        email: user?.email || '',
        age: Number(user?.age) || '',
        company: user?.company || '',
        address: user?.address || '',
        phone: user?.phone || ''
    });

    const editData = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(formState, user?._id as string);
        } catch (error) {
            console.error('failed editing user', error);
        }
    }

    return (
        <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
                Edit your personal data:
            </Typography>
            <TextField
                label="First name"
                name="name.first"
                value={formState.name?.first || ''}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Last name"
                name="name.last"
                value={formState.name?.last || ''}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Age"
                name="age"
                value={formState.age}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
                type='number'
            />
            <TextField
                label="Company"
                name="company"
                value={formState.company}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Address"
                name="address"
                value={formState.address}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Phone"
                name="phone"
                value={formState?.phone}
                onChange={onInputChange}
                fullWidth
                sx={{ mb: 2 }}
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {gralMsg && <Alert severity="success" sx={{ mt: 2 }}>{gralMsg}</Alert>}
            <Button variant="contained" onClick={editData} sx={{ width: '100%' }}>Edit data</Button>
        </Box>
    )
}