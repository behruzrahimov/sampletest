import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.page.tsx";
import Question1Page from "./pages/question1/question1.page.tsx";
import Question2Page from "./pages/question2/question2.page.tsx";
import ResultPage from "./pages/result/resultPage.tsx";
import { useState } from "react";
import PageNotFound from "./pages/404/page-not-found.tsx";

function App() {
  const data = localStorage.getItem("login");
  const [login, setLogin] = useState<boolean>(Boolean(data));
  function callBackLogined(e: boolean) {
    setLogin(e);
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Routes>
        <Route
          index={true}
          path={"/"}
          element={<Login logined={callBackLogined} />}
        />
        <Route
          path={"/question1"}
          element={login ? <Question1Page /> : <Navigate to="/" />}
        />
        <Route
          path={"/question2"}
          element={login ? <Question2Page /> : <Navigate to="/" />}
        />
        <Route
          path={"/result"}
          element={login ? <ResultPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
