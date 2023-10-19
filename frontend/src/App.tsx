import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import Credits from "./pages/Credits";
import Form from "./pages/Form";
import Preferences from "./pages/Prefrences";
import "./styles/Fonts.css";
const theme = createTheme({
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: "San Francisco",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                fontFamily: "San Francisco",
            },
        },
    },
});

const newApp = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavigationBar />
                <Box margin={2}>
                    <Routes>
                        <Route path="/" element={<Form />}></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route path="/credits" element={<Credits />}></Route>
                        <Route
                            path="/prefrences"
                            element={<Preferences />}
                        ></Route>
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default newApp;
