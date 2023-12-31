import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import Test from "./pages/Test";
// import Home from "./pages/Home";
import AppBarContainer from "./AppBar";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
// import WalletPage from "./pages/WalletPage";
import NewNotePage from "./pages/NewNotePage";
import ConnectWallet from "./pages/ConnectWallet";
import BeeHubsPage from "./pages/BeeHubsPage";
// import PhantomPage from './pages/PhantomPage';

export function AppOutlet() {
  const { pathname } = useLocation();

  return pathname === "/about" ? (
    <AppBarContainer>
      <Box
        sx={{
          background: "#242424",
          minHeight: "100vh",
          color: "#fff",
          top: 0,
          left: 0,
          minWidth: "100vw",
          position: "absolute",
          overflowX: "auto",
        }}>
        <Outlet />
      </Box>
    </AppBarContainer>
  ) : (
    <AppBarContainer>
      <Outlet />
    </AppBarContainer>
  );
}

function App() {
  let location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<AppOutlet />}>
        <Route path="*" element={<Navigate to="/" state={{ from: location }} replace />} />
        <Route path="test" element={<Test />} />
        <Route path="wallet" element={<HomePage />} />
        <Route path="note" element={<NewNotePage />} />
        <Route path="buildspace" element={<ConnectWallet />} />
        <Route path="beehub" element={<BeeHubsPage />} />
        {/* <Route path="phantom" element={<PhantomPage />} /> */}
        {/* <Route index path="" element={<WalletPage />} /> */}
        <Route index path="" element={<BeeHubsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
