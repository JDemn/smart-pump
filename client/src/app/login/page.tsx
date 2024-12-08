'use client';
import React from 'react';
import { TextField, Button, Box, Container, Alert } from '@mui/material';
import Logo from '../../assets/logo.png';
import Image from 'next/image';
import { useForm } from '@/hooks/useForm';
import { useAppContext } from '@/context/AppContext';
export default function Login() {
    const { onInputChange, formState } = useForm({
        email: '',
        password: ''
    });
    const { loginUser , error } = useAppContext();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginUser(formState.email as string, formState.password as string);            
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Image
                    alt="Logo"
                    src={Logo}
                    layout="responsive"
                    width={150}
                    height={150}
                    style={{ marginBottom: '20px' }}
                />                
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        type="email"
                        name="email"
                        fullWidth
                        required
                        margin="normal"
                        value={formState?.email}
                        onChange={onInputChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        required
                        margin="normal"
                        value={formState?.password}
                        onChange={onInputChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
                {error && <Alert severity="error" sx={{ mt : 2 }}>{error}</Alert>}
            </Box>
        </Container>
    );
}
