async function consultarAsignatura(materia) {
    try {
        const response = await fetch(`http://localhost:3000/profesor/${materia}`);
        
        if (!response.ok) {
            throw new Error(`Error al consultar la asignatura: ${response.statusText}`);
        }
        const data = await response.json();

        console.log("Datos de la asignatura: ", data);

        const profesorInfoDiv = document.querySelector(`[data-subject="${materia} all"] #profesor-info`);

        if (data.length > 0) {
            const { nombre, materia: subject, hora, fechas } = data[0];
            console.log("nombre ", nombre)
            console.log("subject ", subject)
            console.log("hora ", hora)
            console.log("fechas ", fechas)
            profesorInfoDiv.innerHTML = `
                <div>
                    <strong>Nombre:</strong> ${nombre}<br>
                    <strong>Materia:</strong> ${subject}<br>
                    <strong>Hora:</strong> ${hora}<br>
                    <strong>Fecha:</strong> ${new Date(fechas).toLocaleDateString()}
                </div>
            `;
        } else {
            profesorInfoDiv.innerHTML = '<div>No se encontró información del profesor.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al consultar la asignatura.');
    }
}


