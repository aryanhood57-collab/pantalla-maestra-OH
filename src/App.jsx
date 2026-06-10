import { useState, useEffect, useRef } from "react";

const EQUIPOS = [
  { nombre: "ALFA", version: "A", color: "#D6EAF8", emoji: "🏛️" },
  { nombre: "BETA", version: "B", color: "#E8DAEF", emoji: "🏨" },
  { nombre: "GAMMA", version: "A", color: "#D5F5E3", emoji: "🌿" },
  { nombre: "DELTA", version: "B", color: "#D6EAF8", emoji: "💎" },
  { nombre: "ÉPSILON", version: "A", color: "#FCF3CF", emoji: "⭐" },
];

const RETOS_INFO = [
  { id: 1, bloque: "CALENTAMIENTO", min: 10, titulo: "La Huella Invisible del Hotel" },
  { id: 2, bloque: "CALENTAMIENTO", min: 10, titulo: "ODS en el Check-in" },
  { id: 3, bloque: "CALENTAMIENTO", min: 10, titulo: "La Ecuación del Turista" },
  { id: 4, bloque: "NÚCLEO TÉCNICO", min: 8, titulo: "Housekeeping / Matriz de Impactos" },
  { id: 5, bloque: "NÚCLEO TÉCNICO", min: 8, titulo: "Cocina Sostenible / La Piscina" },
  { id: 6, bloque: "NÚCLEO TÉCNICO", min: 8, titulo: "Diagnóstico / Proveedores" },
  { id: 7, bloque: "NÚCLEO TÉCNICO", min: 8, titulo: "Bar Verde / Plan de Acción" },
  { id: 8, bloque: "SPRINT FINAL", min: 5, titulo: "KPI / Certificación" },
  { id: 9, bloque: "SPRINT FINAL", min: 5, titulo: "Recepción Verde / Emergencia" },
  { id: 10, bloque: "SPRINT FINAL", min: 5, titulo: "Cierre Verde / Veredicto Final" },
];

export default function PantallaMaestra_OH() {
  const [tiempoGlobal, setTiempoGlobal] = useState(90 * 60);
  const [corriendo, setCorriendo] = useState(false);
  const [progreso, setProgreso] = useState(
    Object.fromEntries(EQUIPOS.map(e => [e.nombre, 0]))
  );
  const [retoActivo, setRetoActivo] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervalRef.current = setInterval(() => setTiempoGlobal(t => t - 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [corriendo]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const pct = tiempoGlobal / (90 * 60);
  const barColor = pct > 0.5 ? "#1E8449" : pct > 0.25 ? "#D4AC0D" : "#C0392B";

  const marcarReto = (equipo, num) => {
    setProgreso(prev => ({ ...prev, [equipo]: Math.max(prev[equipo], num) }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 13, letterSpacing: 3, color: "#AED6F1", textTransform: "uppercase" }}>ITSE · EDA1001 · II Cuatrimestre 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#F0B429", margin: "6px 0 2px", letterSpacing: 2 }}>🏨 OPERACIÓN: CÓDIGO VERDE</h1>
        <div style={{ fontSize: 14, color: "#AED6F1" }}>Operaciones Hoteleras · Pantalla Maestra</div>
      </div>

      {/* Timer global */}
      <div style={{ background: "#1C2833", borderRadius: 16, padding: "20px", marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#AED6F1", letterSpacing: 2, marginBottom: 6 }}>TIEMPO GLOBAL</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: tiempoGlobal < 300 ? "#E74C3C" : "#F0B429", letterSpacing: 4, lineHeight: 1 }}>
          {fmt(tiempoGlobal)}
        </div>
        <div style={{ background: "#2C3E50", borderRadius: 8, height: 10, margin: "12px 0", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct * 100}%`, background: barColor, transition: "width 1s, background 0.5s", borderRadius: 8 }} />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10 }}>
          <button onClick={() => setCorriendo(true)} style={{ padding: "10px 24px", background: "#1E8449", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>▶ Iniciar</button>
          <button onClick={() => setCorriendo(false)} style={{ padding: "10px 24px", background: "#D4AC0D", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>⏸ Pausar</button>
          <button onClick={() => { setCorriendo(false); setTiempoGlobal(90 * 60); }} style={{ padding: "10px 24px", background: "#922B21", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>↺ Reiniciar</button>
        </div>
      </div>

      {/* Reto activo selector */}
      <div style={{ background: "#1C2833", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#AED6F1", letterSpacing: 2, marginBottom: 10 }}>RETO EN CURSO</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {RETOS_INFO.map(r => (
            <button key={r.id} onClick={() => setRetoActivo(r.id)}
              style={{ padding: "6px 12px", background: retoActivo === r.id ? "#F0B429" : "#2C3E50", color: retoActivo === r.id ? "#1C2833" : "#AED6F1", border: "none", borderRadius: 6, fontSize: 13, fontWeight: retoActivo === r.id ? 700 : 400, cursor: "pointer" }}>
              R{r.id}
            </button>
          ))}
        </div>
        {retoActivo && (
          <div style={{ marginTop: 10, fontSize: 13, color: "#F0B429" }}>
            📍 {RETOS_INFO[retoActivo - 1].bloque} · {RETOS_INFO[retoActivo - 1].titulo} · ⏱ {RETOS_INFO[retoActivo - 1].min} min
          </div>
        )}
      </div>

      {/* Progreso por equipo */}
      <div style={{ background: "#1C2833", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#AED6F1", letterSpacing: 2, marginBottom: 12 }}>PROGRESO DE EQUIPOS</div>
        {EQUIPOS.map(eq => (
          <div key={eq.nombre} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{eq.emoji} {eq.nombre} <span style={{ fontSize: 11, color: "#AED6F1" }}>V.{eq.version}</span></span>
              <span style={{ fontSize: 12, color: "#AED6F1" }}>{progreso[eq.nombre]}/10 retos</span>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[...Array(10)].map((_, i) => (
                <button key={i} onClick={() => marcarReto(eq.nombre, i + 1)}
                  style={{ flex: 1, height: 22, background: i < progreso[eq.nombre] ? "#1E8449" : "#2C3E50", border: "none", borderRadius: 3, cursor: "pointer", transition: "background 0.3s" }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Palabras de referencia */}
      <div style={{ background: "#1C2833", borderRadius: 12, padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "#AED6F1", letterSpacing: 2, marginBottom: 10 }}>PALABRAS DE REFERENCIA (DIRECTORA)</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ background: "#1A5276", borderRadius: 8, padding: "10px 16px" }}>
            <div style={{ fontSize: 11, color: "#AED6F1", marginBottom: 4 }}>VERSIÓN A (ALFA · GAMMA · ÉPSILON)</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, color: "#F0B429" }}>HOUSKEEPER</div>
          </div>
          <div style={{ background: "#4A235A", borderRadius: 8, padding: "10px 16px" }}>
            <div style={{ fontSize: 11, color: "#E8DAEF", marginBottom: 4 }}>VERSIÓN B (BETA · DELTA)</div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 4, color: "#F0B429" }}>AMENIDADES</div>
          </div>
        </div>
      </div>
    </div>
  );
}
