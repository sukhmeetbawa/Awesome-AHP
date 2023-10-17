import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import Credits from "./pages/Credits";
import Form from "./pages/Form";
import Preferences from "./pages/Prefrences";

const theme = createTheme({
    shape: { borderRadius: 8 },
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

const newApp = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Form />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/credits" element={<Credits />}></Route>
                    <Route path="/prefrences" element={<Preferences />}></Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default newApp;
