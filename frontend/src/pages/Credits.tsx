import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid, Link, Typography } from "@mui/material";

const teamMembers = [
    {
        name: "Sukhmeet Singh Bawa",
        link: "https://www.linkedin.com/in/sukhmeet-bawa/",
    },
    {
        name: "Devarsh Ukani",
        link: "https://www.linkedin.com/in/devarshukani/",
    },
    { name: "Sneh Patel", link: "https://www.linkedin.com/in/ssnehppatel/" },
    {
        name: "Vaishnavi Diwan",
        link: "https://www.linkedin.com/in/vaishnavi-diwan-231850267/",
    },
];

const Credits = () => {
    return (
        <Grid container>
            {teamMembers.map((member, index) => (
                <Grid key={index} container item xs={12} sm={6}>
                    <Grid item xs>
                        <Typography variant="h6">
                            <Link
                                href={member.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                                underline="none"
                                display="flex"
                                alignItems="center"
                            >
                                {member.name}
                                <LinkedInIcon
                                    sx={{
                                        margin: 1,
                                    }}
                                />
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default Credits;
