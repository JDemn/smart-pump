'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile() {
    const [selectedOption, setSelectedOption] = useState<'balance' | 'edit' | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const isMobile = useMediaQuery('(max-width: 600px)');
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);


    return (
        <Box>
            <AppBar position="static" sx={ { display: { xs: 'block', md: 'none' } ,backgroundColor: '#f5f5f5',color: '#333',boxShadow: 'none'}}>
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
                    src="/path-to-avatar.png"
                    sx={{ width: { xs : 100 , md : 150 }, height: { xs : 100 , md : 150 }, mb: { xs: 2, md: 3 }, mr: { md: 4 } }}
                />

                {/* Options */}
                <Box>
                    <Box sx={{ display: 'flex',justifyContent: 'center', mb: 2 }}>
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
                            Your current balance is: <strong>$1,000</strong>
                        </Typography>
                    )}
                    {selectedOption === 'edit' && (
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                Edit your personal data:
                            </Typography>
                            <Typography variant="body2">Name: John Doe</Typography>
                            <Typography variant="body2">Email: john.doe@example.com</Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            
        </Box>
    );
}
