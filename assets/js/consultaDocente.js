async function consultarAsignatura(materia) {
    try {
        const response = await fetch(`http://localhost:3000/profesor/${materia}`);
        
        if (!response.ok) {
            throw new Error(`Error al consultar la asignatura: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Datos de la asignatura: ", data);
        const profesorInfoDivs = document.querySelectorAll(`.col[data-subject*="${materia}"] #profesor-info`);

        if (data.length > 0) {
            data.forEach((item, index) => {
                if (profesorInfoDivs[index]) {
                    const { nombre, materia: subject, hora, fechas } = item;
                    profesorInfoDivs[index].innerHTML = `
                        <div>
                            <strong>Nombre:</strong> ${nombre}<br>
                            <strong>Materia:</strong> ${subject}<br>
                            <strong>Hora:</strong> ${hora}<br>
                            <strong>Fecha:</strong> ${new Date(fechas).toLocaleDateString()}
                        </div>
                    `;
                }
            });
        } else {
            // Muestra un mensaje si no hay datos para la materia.
            profesorInfoDivs.forEach(div => {
                div.innerHTML = '<div>No se encontró información del profesor.</div>';
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al consultar la asignatura.');
    }
}
