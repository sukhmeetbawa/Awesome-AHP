import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import About from "./pages/About";
import Credits from "./pages/Credits";
import Form from "./pages/Form";
import Prefrences from "./pages/Prefrences";

const newApp = () => {
    return (
        <>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Form />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/credits" element={<Credits />}></Route>
                    <Route path="/prefrences" element={<Prefrences />}></Route>
                </Routes>
            </Router>
        </>
    );
};

export default newApp;
