import React from "react";
import StudentForm from "./components/StudentForm";
 // ✅ consistent name

const App = () => {
  return (
    <div className="app-container bg-light min-vh-100">
      {/* Header */}
      <header className="text-center py-4 bg-primary text-white shadow-sm">
        <h2 className="fw-bold mb-0">🎓 Student Query Portal</h2>
        <p className="mb-0">
          Submit and manage your course-related questions easily
        </p>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        <StudentForm />
      </main>

      {/* Footer */}
      <footer className="text-center py-3 border-top text-muted small">
        © {new Date().getFullYear()} Learnify | Developed by Ibrar Ul Haq
      </footer>
    </div>
  );
};

export default App;
