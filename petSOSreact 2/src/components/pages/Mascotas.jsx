import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, where, serverTimestamp,
} from "firebase/firestore";
import { LuPawPrint, LuPencil, LuTrash2, LuPlus, LuX } from "react-icons/lu";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import "./Mascotas.css";

const ESPECIES = ["Perro", "Gato", "Otro"];
const ESTADOS = ["En casa", "Perdido", "Encontrado"];

const emptyForm = {
  nombre: "",
  especie: "Perro",
  raza: "",
  edad: "",
  estado: "En casa",
  fotoUrl: "",
  descripcion: "",
};

function Mascotas() {
  const { user } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // READ: escuchar en tiempo real solo las mascotas del usuario logueado
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "mascotas"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (b.creadoEn?.seconds || 0) - (a.creadoEn?.seconds || 0));
        setMascotas(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("No se pudieron cargar las mascotas.");
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const openNewForm = () => {
    setEditId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (mascota) => {
    setEditId(mascota.id);
    setForm({
      nombre: mascota.nombre || "",
      especie: mascota.especie || "Perro",
      raza: mascota.raza || "",
      edad: mascota.edad || "",
      estado: mascota.estado || "En casa",
      fotoUrl: mascota.fotoUrl || "",
      descripcion: mascota.descripcion || "",
    });
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editId) {
        await updateDoc(doc(db, "mascotas", editId), { ...form });
      } else {
        await addDoc(collection(db, "mascotas"), {
          ...form,
          uid: user.uid,
          creadoEn: serverTimestamp(),
        });
      }
      closeForm();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta mascota?")) return;
    try {
      await deleteDoc(doc(db, "mascotas", id));
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar. Intenta de nuevo.");
    }
  };

  return (
    <section className="pets-section">
      <div className="container">
        <div className="pets-header">
          <div>
            <h1>Mis Mascotas</h1>
            <p>Gestiona el perfil de tus compañeros: crea, edita y elimina cuando quieras.</p>
          </div>
          <motion.button
            className="button pets-add-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={openNewForm}
          >
            <LuPlus /> Agregar mascota
          </motion.button>
        </div>

        {error && !showForm && <p className="pets-error">{error}</p>}

        {loading ? (
          <p className="pets-empty">Cargando mascotas...</p>
        ) : mascotas.length === 0 ? (
          <div className="pets-empty">
            <LuPawPrint size={48} />
            <p>Aún no has registrado ninguna mascota.</p>
          </div>
        ) : (
          <motion.div className="pets-grid" layout>
            <AnimatePresence>
              {mascotas.map((m) => (
                <motion.div
                  key={m.id}
                  className="pet-card"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pet-card__photo">
                    {m.fotoUrl ? (
                      <img src={m.fotoUrl} alt={m.nombre} />
                    ) : (
                      <LuPawPrint size={36} />
                    )}
                    <span className={`pet-card__badge pet-card__badge--${m.estado?.replace(/\s/g, "").toLowerCase()}`}>
                      {m.estado}
                    </span>
                  </div>
                  <div className="pet-card__body">
                    <h3>{m.nombre}</h3>
                    <p className="pet-card__meta">
                      {m.especie}{m.raza ? ` · ${m.raza}` : ""}{m.edad ? ` · ${m.edad} años` : ""}
                    </p>
                    {m.descripcion && <p className="pet-card__desc">{m.descripcion}</p>}
                    <div className="pet-card__actions">
                      <button onClick={() => openEditForm(m)} className="pet-card__icon-btn">
                        <LuPencil /> Editar
                      </button>
                      <button onClick={() => handleDelete(m.id)} className="pet-card__icon-btn pet-card__icon-btn--danger">
                        <LuTrash2 /> Eliminar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="pets-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
          >
            <motion.div
              className="pets-modal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="pets-modal__close" onClick={closeForm}><LuX /></button>
              <h2>{editId ? "Editar mascota" : "Nueva mascota"}</h2>

              <form onSubmit={handleSubmit} className="pets-form">
                <label>
                  Nombre *
                  <input name="nombre" value={form.nombre} onChange={handleChange} required />
                </label>

                <div className="pets-form__row">
                  <label>
                    Especie
                    <select name="especie" value={form.especie} onChange={handleChange}>
                      {ESPECIES.map((op) => <option key={op} value={op}>{op}</option>)}
                    </select>
                  </label>
                  <label>
                    Estado
                    <select name="estado" value={form.estado} onChange={handleChange}>
                      {ESTADOS.map((op) => <option key={op} value={op}>{op}</option>)}
                    </select>
                  </label>
                </div>

                <div className="pets-form__row">
                  <label>
                    Raza
                    <input name="raza" value={form.raza} onChange={handleChange} />
                  </label>
                  <label>
                    Edad (años)
                    <input name="edad" type="number" min="0" value={form.edad} onChange={handleChange} />
                  </label>
                </div>

                <label>
                  URL de la foto
                  <input name="fotoUrl" value={form.fotoUrl} onChange={handleChange} placeholder="https://..." />
                </label>

                <label>
                  Descripción
                  <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} />
                </label>

                {error && <p className="pets-error">{error}</p>}

                <button type="submit" className="button pets-submit-btn" disabled={saving}>
                  {saving ? "Guardando..." : editId ? "Guardar cambios" : "Crear mascota"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Mascotas;
