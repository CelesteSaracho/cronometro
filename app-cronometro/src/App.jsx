import React, { useState, useEffect } from 'react';
import './index.css'; // Importa los estilos del archivo CSS

function App() {
  // Estado para llevar el tiempo transcurrido en segundos (con decimales para centésimas)
  const [seconds, setSeconds] = useState(0);

  // Estado para determinar si el cronómetro está activo (corriendo)
  const [isActive, setIsActive] = useState(false);

  // Estado para almacenar los tiempos guardados (laps o parciales)
  const [lapTimes, setLapTimes] = useState([]);

  // Hook useEffect: administra el intervalo del cronómetro
  useEffect(() => {
    let interval = null;

    // Si el cronómetro está activo, inicia un intervalo que incrementa el tiempo
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((sec) => sec + 0.01); // Incrementa el tiempo en centésimas de segundo
      }, 10); // Intervalo de 10 milisegundos (para precisión de centésimas)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval); // Detiene el intervalo si el cronómetro no está activo
    }

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [isActive, seconds]); // Se ejecuta cada vez que cambia `isActive` o `seconds`

  // Función para iniciar o detener el cronómetro
  const handleStartStop = () => {
    setIsActive((prev) => !prev); // Alterna el estado de `isActive` entre true y false
  };

  // Función para guardar el tiempo actual como parcial
  const handlePartial = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, formatTime(seconds)]); // Agrega el tiempo actual al arreglo de parciales
  };

  // Función para reiniciar el cronómetro y borrar los tiempos guardados
  const handleReset = () => {
    setIsActive(false); // Detiene el cronómetro
    setSeconds(0); // Reinicia el tiempo a 0
    setLapTimes([]); // Borra los tiempos guardados
  };

  // Función para formatear el tiempo en el formato `MM:SS.CC` (minutos, segundos, centésimas)
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60); // Obtiene los minutos completos
    const remainingSeconds = Math.floor(sec % 60); // Obtiene los segundos completos restantes
    const centiseconds = Math.floor((sec % 1) * 100); // Obtiene las centésimas de segundo

    // Devuelve el tiempo formateado con ceros a la izquierda (dos dígitos)
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="timer-box">
        {/* Título del cronómetro */}
        <h1>Cronómetro</h1>

        {/* Muestra el tiempo actual formateado */}
        <div className="time-display">{formatTime(seconds)}</div>

        {/* Botón para iniciar o detener el cronómetro */}
        <button onClick={handleStartStop} className={`start-stop-button ${isActive ? 'active' : ''}`}>
          {isActive ? 'Detener' : 'Iniciar'} {/* Cambia el texto según el estado de `isActive` */}
        </button>

        {/* Botón para guardar un tiempo parcial */}
        <button onClick={handlePartial} className="partial-button">
          Parcial
        </button>

        {/* Botón para reiniciar el cronómetro */}
        <button onClick={handleReset} className="reset-button">
          Restablecer
        </button>

        {/* Sección para mostrar los tiempos parciales guardados */}
        <div className="lap-times">
          <h2>Tiempos Guardados:</h2>
          <ul>
            {/* Recorre el arreglo de parciales y los muestra como una lista */}
            {lapTimes.map((time, index) => (
              <li key={index}>{time}</li> // Cada tiempo parcial es un elemento de la lista
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App; // Exporta el componente para usarlo en otros archivos
