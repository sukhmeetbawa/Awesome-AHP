import MenuIcon from "@mui/icons-material/Menu";

import {
    AppBar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Credits", path: "/credits" },
    { name: "Preferences", path: "/preferences" },
];

const NavigationBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const updateWindowSize = () => {
        setIsMobile(window.innerWidth < 600);
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {navLinks.map((link) => (
                                <MenuItem
                                    key={link.path}
                                    onClick={handleMenuClose}
                                    component={Link}
                                    to={link.path}
                                >
                                    {link.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                ) : (
                    <List
                        sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                    >
                        {navLinks.map((link) => (
                            <ListItem
                                button
                                key={link.path}
                                to={link.path}
                                component={Link}
                                sx={{
                                    "&:hover": {
                                        borderRadius: "8px", // Adjust the value as needed
                                    },
                                }}
                            >
                                <ListItemText primary={link.name} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
