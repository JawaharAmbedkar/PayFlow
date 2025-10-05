import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Dashboard } from "./Pages/Dashboard";
import { SendMoney } from "./Pages/SendMoney"
import { Me } from "./Pages/Me"
import { Navigate } from "react-router-dom";
import { FrontPage } from "./Pages/FrontPage";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { TransferMoney } from "./Pages/TransferMoney";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/me" element={<Me />} />
          <Route path="/" element={<Navigate to="/me" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transferMoney" element={<ProtectedRoute><TransferMoney/></ProtectedRoute>} />
          <Route path="/sendMoney" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/frontPage" element={<FrontPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
