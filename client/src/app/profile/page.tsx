'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Avatar, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppContext } from '@/context/AppContext';
import { EditUser } from '@/components/EditUser';
import { Buton } from '@/components/atom/Buton';

export default function Profile() {
    const [selectedOption, setSelectedOption] = useState<'balance' | 'edit' | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isMobile = useMediaQuery('(max-width: 600px)');
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
    const { user, logoutUser } = useAppContext();    

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
                                        onClick={logoutUser}
                                    >
                                        <LogoutIcon />
                                        <ListItemText primary="Logout" sx={{ ml: 1 }} />
                                    </ListItem>
                                </List>
                            </Drawer></>
                    )
                }

            </AppBar>
            <AppBar position="sticky" sx={{ backgroundColor: '#f5f5f5', color: '#333', boxShadow: 'none', display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Profile
                    </Typography>
                    <Buton 
                        method={ logoutUser }
                        text='Logout'
                        icon = {<LogoutIcon sx={{ mr: 1 }} />} 
                    />
                </Toolbar>
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
                <Avatar
                    alt="User Avatar"
                    src={user?.picture}
                    sx={{ width: { xs: 100, md: 150 }, height: { xs: 100, md: 150 }, mb: { xs: 2, md: 3 }, mr: { md: 4 } }}
                />

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

                    {selectedOption === 'balance' && (
                        <Typography variant="body1">
                            Your current balance is: <strong>{user?.balance}</strong>
                        </Typography>
                    )}
                    {selectedOption === 'edit' && (
                        <EditUser/>
                    )}
                </Box>
            </Box>

        </Box>
    );
}
