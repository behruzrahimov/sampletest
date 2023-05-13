import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import styles from "./question1.styles.module.css";
export default function Question1Page() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState(0);
  const [timeNumber, setTimeNumber] = useState<number[]>([]);
  const [listAges, setListAges] = useState<number[]>([]);

  // ---------------------------------------------------------------------------
  // effects
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/");
    }
    !startTime && setStartTime(Date.now);
    const delayDebounceFn = setTimeout(() => {
      const find = listAges.find((age) => age === number);
      number && !find && setListAges((ages) => [...ages, number]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [number]);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------
  function send() {
    if (number) {
      const question1 = {
        year: number,
        time: Date.now() - startTime,
        timeNumber: timeNumber[timeNumber.length - 1] - timeNumber[0],
        listAges: listAges,
      };
      localStorage.setItem("question1", JSON.stringify(question1));
      navigate("/question2");
    }
  }

  // ---------------------------------------------------------------------------

  return (
    <div className={styles.container}>
      <div className={styles.questionContainer}>
        <h1>How old are you?</h1>
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setNumber(Number(e.target.value));
            setTimeNumber((times) => [...times, Date.now()]);
          }}
        />
        {number ? (
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
