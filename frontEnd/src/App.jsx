import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Student from "./Components/Signup/Student";
import Professor from "./Components/Signup/Professor";
import StudentStore from "./Components/Users/Student/StudentStore";
import ProfessorView from "./Components/Users/Professor/ProfessorView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/professor" element={<Professor />} />
          <Route path="/signup/student" element={<Student />} />
          <Route path="/StudentView/*" element={<StudentStore />} />
          <Route path="/ProfessorView/*" element={<ProfessorView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
