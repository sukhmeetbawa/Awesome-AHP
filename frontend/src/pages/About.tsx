import { Box, Stack, Typography } from "@mui/material";

const About = () => {
    return <Stack
    alignItems="center"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    spacing={4}>

    <Box width="150vh">
        <br/>
        <Typography variant="h3" textAlign="center">
        AHP Calculator with ChatGPT Integration
        </Typography>
        <br/>
        <Typography variant="h6" textAlign="justify">
        This project is an Analytic Hierarchy Process (AHP) calculator integrated with ChatGPT. The Analytic Hierarchy Process is a decision-making tool that helps to prioritize alternatives by comparing their attributes and criteria. The integration with ChatGPT allows you to generate textual insights and suggestions based on AHP results.
        </Typography>
        <br/>
        <Typography variant="h6" textAlign="justify">
        This project serves as a proof of concept, showcasing the utilization of Large Language Models (LLMs) to generate criteria and alternative values within the context of the Analytical Hierarchy Process (AHP) algorithm, with the ultimate aim of providing personalized recommendations to the end user. In essence, it explores the feasibility and potential applications of employing LLMs in the decision-making process, particularly in the realm of AHP, to enhance the user's decision-making experience.
        </Typography>
        <br/>
        <Typography variant="h6" textAlign="justify">
        The AHP Calculator with ChatGPT Integration is a web-based tool designed to streamline your decision-making process. You can create and manage decision hierarchies, input criteria and alternatives, and perform AHP calculations. With ChatGPT integration, you can receive textual summaries, recommendations, and insights to support your decisions.
        </Typography>
    </Box>
</Stack>
};

export default About;
