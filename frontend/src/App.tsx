import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import axios from "axios";
import type { Session } from "./types/session.types";
import { Discipline } from "./types/descipline.enum";

function App() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sessions")
      .then((response) => {
        console.log(response);
        setSessions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de récupérer les sessions");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <Header />

        <main>
          <h2>Planning des sessions</h2>

          {loading && <p>Chargement...</p>}
          {error && <p>{error}</p>}

          <div>
            {sessions.map((session) => (
              <div>
                <p>
                  {session.discipline === Discipline.SURF
                    ? "Stage de surf"
                    : "Session de skate"}
                </p>
                <p>
                  Coach: {session.coach.prenom}
                  <br />
                  Eleve: {session.eleve.prenom}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
