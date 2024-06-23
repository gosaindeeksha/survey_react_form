import React from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
function Genfield({ formData, errors, handleChange, handleTouchedState }) {
  return (
    <>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        error={!!errors.name}
        helperText={errors.name}
        onBlur={() => handleTouchedState("name")}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
        error={!!errors.email}
        helperText={errors.email}
        onBlur={() => handleTouchedState("email")}
      />
      <TextField
        label="Survey Topic"
        variant="outlined"
        fullWidth
        margin="normal"
        name="surveyTopic"
        value={formData.surveyTopic}
        onChange={handleChange}
        select
        required
        error={!!errors.surveyTopic}
        helperText={errors.surveyTopic}
        onBlur={() => handleTouchedState("surveyTopic")}
      >
        <MenuItem value="Technology">Technology</MenuItem>
        <MenuItem value="Health">Health</MenuItem>
        <MenuItem value="Education">Education</MenuItem>
      </TextField>

      {formData.surveyTopic === "Technology" && (
        <>
          <TextField
            label="Favorite Programming Language"
            variant="outlined"
            fullWidth
            margin="normal"
            name="technology.favoriteLanguage"
            value={formData.technology.favoriteLanguage}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
          </TextField>
          <TextField
            label="Years of Experience"
            variant="outlined"
            fullWidth
            margin="normal"
            name="technology.yearsExperience"
            value={formData.technology.yearsExperience}
            onChange={handleChange}
            type="number"
            required
          />
        </>
      )}

      {formData.surveyTopic === "Health" && (
        <>
          <TextField
            label="Exercise Frequency"
            variant="outlined"
            fullWidth
            margin="normal"
            name="health.exerciseFrequency"
            value={formData.health.exerciseFrequency}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Rarely">Rarely</MenuItem>
          </TextField>
          <TextField
            label="Diet Preference"
            variant="outlined"
            fullWidth
            margin="normal"
            name="health.dietPreference"
            value={formData.health.dietPreference}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
            <MenuItem value="Vegan">Vegan</MenuItem>
            <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
          </TextField>
        </>
      )}

      {formData.surveyTopic === "Education" && (
        <>
          <TextField
            label="Highest Qualification"
            variant="outlined"
            fullWidth
            margin="normal"
            name="education.highestQualification"
            value={formData.education.highestQualification}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="High School">High School</MenuItem>
            <MenuItem value="Bachelor's">Bachelor's</MenuItem>
            <MenuItem value="Master's">Master's</MenuItem>
            <MenuItem value="PhD">PhD</MenuItem>
          </TextField>
          <TextField
            label="Field of Study"
            variant="outlined"
            fullWidth
            margin="normal"
            name="education.fieldOfStudy"
            value={formData.education.fieldOfStudy}
            onChange={handleChange}
            required
          />
        </>
      )}

      <TextField
        label="Feedback"
        variant="outlined"
        fullWidth
        margin="normal"
        name="feedback"
        value={formData.feedback}
        onChange={handleChange}
        multiline
        rows={4}
        required
        error={!!errors.feedback}
        helperText={errors.feedback}
        onBlur={() => handleTouchedState("feedback")}
      />
    </>
  );
}
export default Genfield;
