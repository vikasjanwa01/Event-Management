import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box } from '@mui/material';
import { People as PeopleIcon, Event as EventIcon, Assignment as AssignmentIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { userTypeContext } from '../context/context';
import EventManagementPage from './EventManagementPage';
import AttendeeManagementPage from './AttendeeManagementPage';
import ManageTask from './ManageTask';
import TaskPage from './TaskPage';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const drawerWidth = 240;

const Dashboard = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const [loading, setLoading] = useState(true);
    const [attende, setAttende] = useState({});
    const[selectedID, setSelectedID] = useState('');

    const updateSelectedID = (id) => {
        setSelectedID(id);
        setSelectedSection('task');
    }

    const { userType, setUserType } = useContext(userTypeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userType) {
            navigate('/login');
        }
        else if (userType === 'attendee') {
            const id = localStorage.getItem('userId');
            getAttende(id);
        }
        setLoading(false);

    }, []);

    const getAttende = async (id) => {
        const response = await axios.get(`/attendees/${id}`);
        console.log(response.data);
        setAttende(response.data);
    }

    const handleClick = (section) => {
        setSelectedSection(section);
    };

    const attendeeLogout = () => {
        localStorage.removeItem('userId');
        setUserType('');
        navigate('/login');
    }

    const adminLogout = () => {
        setUserType('');
        navigate('/login');
    }

    const renderContent = () => {
        switch (selectedSection) {
            case '':
                return (
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Welcome to the Admin Dashboard
                        </Typography>
                        <Typography paragraph>
                            Use the navigation menu to manage attendees, events, and tasks.
                        </Typography>
                    </Box>
                );
            case 'attendees':
                return (
                    <Box>
                        <AttendeeManagementPage />
                    </Box>
                );
            case 'events':
                return (
                    <Box>
                        <EventManagementPage taskDetail={updateSelectedID} />
                    </Box>
                );
            case 'tasks':
                return (
                    <Box>
                        <ManageTask data={attende} />
                    </Box>
                );
            case 'task':
                return (
                    <Box>
                        <TaskPage id={selectedID} />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {!loading && (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div">
                                {userType === "admin" && "Admin"}
                                {userType === "attendee" && `${attende.name}'s`} Dashboard
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            {userType === "admin" && (<List>
                                    <ListItem
                                        button
                                        onClick={() => handleClick('events')}
                                        sx={{
                                            backgroundColor: selectedSection === 'events' ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: selectedSection === 'events' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <EventIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Manage Events" />
                                    </ListItem>
                                <ListItem
                                    button
                                    onClick={() => handleClick('attendees')}
                                    sx={{
                                        backgroundColor: selectedSection === 'attendees' ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedSection === 'attendees' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Attendees" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={adminLogout}
                                    sx={{
                                        backgroundColor: selectedSection === 'logout' ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedSection === 'logout' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>)}
                            {userType === "attendee" && (<List>
                                <ListItem
                                    button
                                    onClick={() => handleClick('tasks')}
                                    sx={{
                                        backgroundColor: selectedSection === 'tasks' ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedSection === 'tasks' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Tasks" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={attendeeLogout}
                                    sx={{
                                        backgroundColor: selectedSection === 'logout' ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedSection === 'logout' ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>)}
                        </Box>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Toolbar />
                        {renderContent()}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Dashboard;
