import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete, Button } from "@mui/material";
import styles from "./question2.styles.module.css";
const timeOfYear = ["Winter", "Spring", "Summer", "Autumn"];
export default function Question2Page() {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [timeSelecting, setTimeSelecting] = useState<number[]>([]);
  useEffect(() => {
    !startTime && setStartTime(Date.now);
  }, []);

  function send() {
    if (setSelected.length) {
      const question2 = {
        time: Date.now() - startTime,
        listSelected: selected,
        selectTimeYearLength: selected.length,
        timeSelecting:
          timeSelecting[timeSelecting.length - 1] - timeSelecting[0],
      };
      localStorage.setItem("question2", JSON.stringify(question2));
      navigate("/result");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>What time of the year do you like the most?</h1>
        <Autocomplete
          sx={{ m: 1, width: 500, color: "red" }}
          multiple
          options={timeOfYear}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          onChange={(_, value) => {
            setSelected(value);
            setTimeSelecting((times) => [...times, Date.now()]);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Time of year"
              placeholder="Time of year"
            />
          )}
        />
        {selected.length ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              marginTop: "10px",
              ":hover": {
                backgroundColor: "#3e3e3e", // theme.palette.primary.main
                color: "white",
              },
            }}
            className={styles.buttonLogin}
            onClick={send}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              marginTop: "10px",
            }}
            disabled
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
