import { useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import ChartArea from "./Components/ChartArea/ChartArea";
import AlertsArea from "./Components/AlertsArea/AlertsArea";
import AlertCreationPrompt from "./Components/AlertCreationPrompt/AlertCreationPrompt";
import LoginPage from "./Components/LoginPage/LoginPage";
import AuthContext from "./contexts/AuthContext";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const { user } = useContext(AuthContext);
  const [showAlertCreationPrompt, setShowAlertCreationPrompt] = useState(false);
  const [alertsRefresh, setAlertsRefresh] = useState(false); // Toggle whenever I want to refresh displayed alerts, i.e. when a new alert is created
  const [alertsSearchInput, setAlertsSearchInput] = useState(""); // AlertsArea search bar input

  // Always render the Toaster at the root level
  const appContent = !user ? (
    // If not authenticated, show the login page
    <>
      <Header />
      <LoginPage apiUrl={apiUrl} />
    </>
  ) : (
    // If authenticated, show the main application
    <>
      <Header />
      <div id="main-area">
        <ChartArea apiUrl={apiUrl} />
        <AlertsArea
          onNewAlert={() => setShowAlertCreationPrompt(true)}
          alertsRefresh={alertsRefresh}
          alertsSearchInput={alertsSearchInput}
          setAlertsSearchInput={setAlertsSearchInput}
          apiUrl={apiUrl}
          userId={user.user_id}
        />
      </div>
      {showAlertCreationPrompt && (
        <AlertCreationPrompt
          onClose={() => setShowAlertCreationPrompt(false)}
          setAlertsRefresh={setAlertsRefresh}
          setAlertsSearchInput={setAlertsSearchInput}
          apiUrl={apiUrl}
          userId={user.user_id}
        />
      )}
    </>
  );

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e283a", // dark slate blue-gray
            color: "#e0f2fe", // soft light cyan
            border: "1px solid rgb(47, 157, 205)", // sky blue border
            fontSize: "1.05rem",
            padding: "12px 16px",
            borderRadius: "8px",
            marginTop: "76px",
            boxShadow: "0 0 9px rgba(62, 195, 200, 0.3)",
          },
        }}
      />
      {appContent}
    </>
  );
}

export default App;
