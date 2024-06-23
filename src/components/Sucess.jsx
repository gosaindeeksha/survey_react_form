import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ApiQ from "./APIquestionaire";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function Success() {
  const location = useLocation();
  if (location.state) {
    const formData = location.state.formData;

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Welcome {formData.name}!
        </Typography>
        <Typography variant="h6" component="h2">
          Your Name: {formData.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Your email: {formData.email}
        </Typography>
        <Typography variant="h6" component="h2">
          Survey Topic: {formData.surveyTopic}
        </Typography>
        {/* conditional tech rendering */}
        {formData.surveyTopic === "Technology" ? (
          <>
            <Typography variant="h6" component="h2">
              Favourite Language : {formData.technology.favoriteLanguage}
            </Typography>
            <Typography variant="h6" component="h2">
              Years Of Experience: {formData.technology.yearsExperience}
            </Typography>
          </>
        ) : null}
        {formData.surveyTopic === "Education" ? (
          <>
            <Typography variant="h6" component="h2">
              Highest Qualification : {formData.education.highestQualification}
            </Typography>
            <Typography variant="h6" component="h2">
              Field of Study: {formData.education.fieldOfStudy}
            </Typography>
          </>
        ) : null}
        {formData.surveyTopic === "Health" ? (
          <>
            <Typography variant="h6" component="h2">
              Exercise Frequency : {formData.health.exerciseFrequency}
            </Typography>
            <Typography variant="h6" component="h2">
              Diet Preference: {formData.health.dietPreference}
            </Typography>
          </>
        ) : null}
                    <Typography variant="h6" component="h2">
            Feedback : {formData.feedback}
            </Typography>

        <Typography variant="h6" component="h2">
          Additional Questions:
        </Typography>

        <ApiQ topic={formData.surveyTopic} />
      </ThemeProvider>
    );
  } else {
    return <></>;
  }
}
export default Success;
