import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Genfield from "./Genformfield";
// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Signin Component
function Signin() {
  const navigate = useNavigate();

  // State Definitions
  const [errorMessage, setErrorMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    surveyTopic: "",
    technology: {
      favoriteLanguage: "",
      yearsExperience: "",
    },
    health: {
      exerciseFrequency: "",
      dietPreference: "",
    },
    education: {
      highestQualification: "",
      fieldOfStudy: "",
    },
    feedback: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    surveyTopic: "",
    feedback: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    surveyTopic: false,
    feedback: false,
  });

  // Touched State Handler
  const handleTouchedState = (field) => {
    setTouched((prevTouch) => ({
      ...prevTouch,
      [field]: true,
    }));
  };

  // Field Validation
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value && touched.name) error = "Full Name is required";
        break;
      case "email":
        if ((!value || !/\S+@\S+\.\S+/.test(value)) && touched.email)
          error = "A valid email is required";
        break;
      case "surveyTopic":
        if (!value && touched.surveyTopic) error = "Survey Topic is required";
        break;
      case "feedback":
        if (value.length < 50 && touched.feedback)
          error = "Feedback must be at least 50 characters";
        break;
      // Additional validations for technology, health, and education sections
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // useEffect to handle validation
  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      validateField(key, value);
    });
  }, [formData, touched]);

  // Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle surveyTopic change
    if (name === "surveyTopic") {
      const selectedTopic = value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        surveyTopic: selectedTopic,
        technology:
          selectedTopic === "Technology"
            ? {
                ...prevFormData.technology,
                favoriteLanguage: "",
                yearsExperience: "",
              }
            : {
                ...prevFormData.technology,
                favoriteLanguage: "",
                yearsExperience: "",
              },
        health:
          selectedTopic === "Health"
            ? {
                ...prevFormData.health,
                exerciseFrequency: "",
                dietPreference: "",
              }
            : {
                ...prevFormData.health,
                exerciseFrequency: "",
                dietPreference: "",
              },
        education:
          selectedTopic === "Education"
            ? {
                ...prevFormData.education,
                highestQualification: "",
                fieldOfStudy: "",
              }
            : {
                ...prevFormData.education,
                highestQualification: "",
                fieldOfStudy: "",
              },
      }));
    } else if (
      name.startsWith("technology") ||
      name.startsWith("health") ||
      name.startsWith("education")
    ) {
      // Handle nested state updates
      const [section, field] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [section]: {
          ...prevFormData[section],
          [field]: value,
        },
      }));
    } else {
      // Handle other fields directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    let hasError = false;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        hasError = true;
      }
    });

    if (hasError) {
      setErrorMessage("Form has errors. Please fix them before submitting.");
    } else {
      // Perform API integration to fetch additional questions based on formData.surveyTopic
      // Example: fetchAdditionalQuestions(formData.surveyTopic);
      navigate("/success", { replace: true, state: { formData: formData } });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              position: "fixed",
              top: 0,
              zIndex: 9999,
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Survey
            </Typography>
            <Genfield
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleTouchedState={handleTouchedState}
            />
            <form onSubmit={handleSubmit}>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button fullWidth size="large" type="submit" variant="outlined">
                  Submit
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default Signin;
