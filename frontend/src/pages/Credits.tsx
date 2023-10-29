import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid, Link, Typography } from "@mui/material";

const teamMembers = [
    {
        name: "Sukhmeet Singh Bawa",
        linkedin: "https://www.linkedin.com/in/sukhmeet-bawa/",
        github: "https://github.com/sukhmeetbawa",
    },
    {
        name: "Devarsh Ukani",
        linkedin: "https://www.linkedin.com/in/devarshukani/",
        github: "https://github.com/devarshukani",
    },
    {
        name: "Sneh Patel",
        linkedin: "https://www.linkedin.com/in/ssnehppatel/",
        github: "https://github.com/Patel-Sneh",
    },
    {
        name: "Vaishnavi Diwan",
        linkedin: "https://www.linkedin.com/in/vaishnavi-diwan-231850267/",
        github: "https://github.com/vaishnavidiwan",
    },
];

const Credits = () => {
    return (
        <Grid container>
            {teamMembers.map((member, index) => (
                <Grid key={index} item xs={12} sm={6}>
                    <Typography variant="h6" display="flex" alignItems="center">
                        {member.name}
                        <Link
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            underline="none"
                        >
                            <LinkedInIcon
                                sx={{ marginLeft: 1, marginRight: 1 }}
                            />
                        </Link>
                        <Link
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            underline="none"
                        >
                            <GitHubIcon sx={{ marginLeft: 1 }} />
                        </Link>
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default Credits;
