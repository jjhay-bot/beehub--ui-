import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import Test from "./pages/Test";
// import Home from "./pages/Home";
import AppBarContainer from "./AppBar";
import { Box } from "@mui/material";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import PhantomPage from './pages/PhantomPage';

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
        <Route path="wallet" element={<WalletPage />} />
        <Route path="phantom" element={<PhantomPage />} />
        <Route index path="" element={<HomePage />} />
        {/* RELEASE #1 */}
        {/* <Route path="main" element={<MainPage />} /> */}
        {/* <Route index path="" element={<LandingPage />} />
        <Route index path="home" element={<Home />} /> */}
        {/* <Route index path="" element={<MainPage />} />
        <Route index path="about" element={<LandingPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
