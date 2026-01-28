import { useState, useEffect } from "react";

type Lecture = {
  _id: string;
  title: string;
  subject: string;
};

export default function App() {

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  // Load token ONCE
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  // LOGIN
  async function login() {
    if (!email || !password) return alert("Enter credentials");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } else {
      alert("Login failed");
    }
  }

  function logout() {
    localStorage.clear();
    setToken(null);
  }

  // LOAD LECTURES AFTER LOGIN
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/lectures")
      .then(r => r.json())
      .then(d => setLectures(d));
  }, [token]);

  async function addLecture() {
    if (!title || !subject) return alert("Fill all fields");

    await fetch("http://localhost:5000/api/lectures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!
      },
      body: JSON.stringify({ title, subject })
    });

    setLectures([...lectures, { _id: Date.now().toString(), title, subject }]);
    setTitle("");
    setSubject("");
  }

  // LOGIN SCREEN
  if (!token) {
    return (
      <div style={{ padding: 60, background: "black", minHeight: "100vh", color: "white" }}>
        <h1 style={{ color: "red" }}>SemFlix Login</h1>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <br /><br />

        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br /><br />

        <button onClick={login}>Login</button>

        <p style={{ color: "#777" }}>Demo: any email/password</p>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div style={{ padding: 30, background: "black", minHeight: "100vh", color: "white" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "red" }}>SemFlix Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <hr />

      <h3>Add Lecture</h3>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <br />

      <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
      <br /><br />

      <button onClick={addLecture}>Add</button>

      <hr />

      <h3>Lectures</h3>

      {lectures.map(l => (
        <div key={l._id} style={{ background: "#222", padding: 10, marginBottom: 10 }}>
          <b>{l.title}</b>
          <p>{l.subject}</p>
        </div>
      ))}

    </div>
  );
}



