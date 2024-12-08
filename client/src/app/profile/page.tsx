'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemText, useMediaQuery, TextField, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppContext } from '@/context/AppContext';
import { useForm } from '@/hooks/useForm';

export default function Profile() {
    const [selectedOption, setSelectedOption] = useState<'balance' | 'edit' | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 600px)');
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
    const { user, error, updateUser, gralMsg } = useAppContext();
    console.log("user en profile", user);

    const { onInputChange, formState } = useForm({
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
            <AppBar position="static" sx={{ display: { xs: 'block', md: 'none' }, backgroundColor: '#f5f5f5', color: '#333', boxShadow: 'none' }}>
                {
                    isMobile && (
                        <>
                            <Toolbar>
                                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                    Profile
                                </Typography>
                                <IconButton edge="end" color="inherit" onClick={toggleMobileMenu}>
                                    <MenuIcon />
                                </IconButton>
                            </Toolbar>

                            <Drawer
                                anchor="right"
                                open={mobileMenuOpen}
                                onClose={toggleMobileMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <List>
                                    <ListItem
                                        component="button"
                                        button
                                        onClick={() => console.log('Logout clicked')}
                                    >
                                        <LogoutIcon />
                                        <ListItemText primary="Logout" sx={{ ml: 1 }} />
                                    </ListItem>
                                </List>
                            </Drawer></>
                    )
                }

            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'column' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4,
                    px: 2,
                }}
            >
                {/* Avatar */}
                <Avatar
                    alt="User Avatar"
                    src={user?.picture}
                    sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 }, mb: { xs: 2, md: 3 }, mr: { md: 4 } }}
                />

                {/* Options */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{ mr: 1 }}
                            onClick={() => setSelectedOption('balance')}
                        >
                            Balance
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setSelectedOption('edit')}
                        >
                            Edit
                        </Button>
                    </Box>

                    {/* Content based on selection */}
                    {selectedOption === 'balance' && (
                        <Typography variant="body1">
                            Your current balance is: <strong>{user?.balance}</strong>
                        </Typography>
                    )}
                    {selectedOption === 'edit' && (
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
                    )}
                </Box>
            </Box>

        </Box>
    );
}
