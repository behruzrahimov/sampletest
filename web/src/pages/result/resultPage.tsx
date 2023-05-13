import styles from "./result.style.module.css";
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
} from "@mui/material";
import { browserName, browserVersion } from "react-device-detect";
export default function ResultPage() {
  const login = JSON.parse(localStorage.getItem("login")!);
  const question1 = JSON.parse(localStorage.getItem("question1")!);
  const question2 = JSON.parse(localStorage.getItem("question2")!);
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(true);
  const [ip, setIP] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    getData().then((data) => setIP(data.IPv4));
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  async function getData() {
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();
    return await data;
  }

  function handleClick() {
    setOpen(!open);
  }
  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        <h1>Collected data</h1>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(_, newValue: string) => {
                  setValue(newValue);
                }}
              >
                <Tab label="Login" value="1" />
                <Tab label="Question page 1" value="2" />
                <Tab label="Question page 2" value="3" />
                <Tab label="Other" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <List component="nav" aria-label="secondary mailbox folder">
                  <ListItemButton>
                    <ListItemText
                      primary={`Total time spent on the page: ${
                        login.time / 1000
                      }`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Time spent between first input and last input (username):
                    ${login.timeUsername / 1000} second`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Time spent between first input and last input (password):
                    ${login.timePassword / 1000} second`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Number of changes (edits) made to the input (username):
                    ${login.usernameChanges}`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Number of changes (edits) made to the input (password):
                    ${login.passwordChanges}`}
                    />
                  </ListItemButton>
                </List>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div>
                <List component="nav">
                  <ListItemButton>
                    <ListItemText
                      primary={`Total time : ${question1.time / 1000} second`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`  Time spent between first input and last input:
                    ${question1.timeNumber / 1000} second`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Number of changes: ${question1.listAges.length}`}
                    />
                  </ListItemButton>

                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary="The list of saved ages" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {question1.listAges.map((age: number, i: number) => (
                        <ListItemButton key={i} sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <span>{i + 1}</span>
                          </ListItemIcon>
                          <ListItemText primary={`${age}`} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div>
                <List component="nav">
                  <ListItemButton>
                    <ListItemText
                      primary={`Total time: ${question2.time / 1000} second `}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Time spent between first and last selection:
                    ${question2.timeSelecting / 1000} second`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`Number of selections: ${question2.selectTimeYearLength}`}
                    />
                  </ListItemButton>

                  <ListItemButton onClick={handleClick}>
                    <ListItemText primary="The list of selected options by the user" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {question2.listSelected.map(
                        (select: string, i: number) => (
                          <ListItemButton key={i} sx={{ pl: 4 }}>
                            <ListItemIcon>
                              <span>{i + 1}</span>
                            </ListItemIcon>
                            <ListItemText primary={`${select}`} />
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </Collapse>
                </List>
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div>
                <List component="nav">
                  <ListItemButton>
                    <ListItemText primary={`IP address: ${ip}`} />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText primary={`Browser: ${browserName}`} />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText
                      primary={`${browserName} version: ${browserVersion}`}
                    />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemText primary={`Latitude: ${latitude}`} />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary={`Longitude: ${longitude}`} />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary={`Date: ${date}`} />
                  </ListItemButton>
                </List>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
