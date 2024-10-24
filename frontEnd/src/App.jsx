import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import GuestProfessor from "./Components/Signup/GuestProfessor";
import GuestStudent from "./Components/Signup/GuestStudent";
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
          <Route path="/signup/guestProfessor" element={<GuestProfessor />} />
          <Route path="/signup/student" element={<Student />} />
          <Route path="/signup/guestStudent" element={<GuestStudent />} />
          <Route path="/StudentView/*" element={<StudentStore />} />
          <Route path="/ProfessorView/*" element={<ProfessorView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
