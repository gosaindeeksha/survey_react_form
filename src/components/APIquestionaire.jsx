import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import axios from "axios";

function ApiQ({ topic }) {
  let UrL;
  switch (topic) {
    case "Technology":
      UrL = "https://opentdb.com/api.php?amount=5&category=18&type=multiple";
      break;
    case "Health":
      UrL = "https://opentdb.com/api.php?amount=5&category=21&type=multiple";
      break;
    case "Education":
      UrL = "https://opentdb.com/api.php?amount=5&category=22&type=multiple";
      break;
    default:
      break;
  }

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchAdditionalQuestions = async () => {
      if (!UrL) {
        console.error("No URL provided for the topic:", topic);
        return;
      }

      try {
        const response = await axios.get(UrL);
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }
    };

    fetchAdditionalQuestions();
  }, [UrL]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
  };

  return (
    <>
      {questions.map((question, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {question.question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label={`choices-${index}`}
                name={`choices-${index}`}
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                {[...question.incorrect_answers, question.correct_answer]
                  .sort()
                  .map((answer, idx) => (
                    <FormControlLabel
                      key={idx}
                      value={answer}
                      control={<Radio />}
                      label={answer}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Answers
      </Button>
    </>
  );
}

export default ApiQ;
