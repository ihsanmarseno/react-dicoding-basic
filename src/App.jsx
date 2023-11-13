import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getInitialData, showFormattedDate } from "./utils";

function App() {
  const getDatafromLS = () => {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : getInitialData();
  };

  const setDataToLS = (data) => {
    localStorage.setItem("notes", JSON.stringify(data));
  };

  const [notes, setNotes] = useState(getDatafromLS);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    const newId = Date.now();
    const newNote = {
      id: newId,
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setDataToLS([...notes, newNote]);
    setTitle("");
    setBody("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setDataToLS(updatedNotes);
  };

  useEffect(() => {
    // Set initial data when the component mounts
    const initialData = getInitialData();
    setNotes(initialData);
    setDataToLS(initialData);
  }, []);

  useEffect(() => {
    setDataToLS(notes);
  }, [notes]);

  return (
    <>
      <h1 className="m-5 text-5xl">Selamat Datang di Aplikasi Catatanku</h1>
      <Form className="m-5" onSubmit={handleAddNote}>
        <Form.Group className="mb-3">
          <Form.Label>Judul Catatan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Judul Catatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Deskripsi Catatan</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Masukkan Deskripsi Catatan"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Buat
        </Button>
      </Form>

      {notes.length === 0 ? (
        <p className="m-5">Tidak ada catatan.</p>
      ) : (
        <div className="card-container m-5">
          {notes.map((note) => (
            <Card key={note.id} className="mb-3">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text className="mb-4">{note.body}</Card.Text>
                <p className="text-muted">
                  {showFormattedDate(note.createdAt)}
                </p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteNote(note.id)}
                  className="bg-red"
                >
                  Hapus
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
