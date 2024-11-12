// Manejo de Reservas
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const guestName = document.getElementById('guestName').value;
    const roomType = document.getElementById('roomType').value;
    alert(`Reserva confirmada para ${guestName} en una habitación ${roomType}`);
});

// Generación de Factura
document.getElementById('generateInvoice').addEventListener('click', function() {
    alert('Factura generada. Total a pagar: $250');
});

// Cambio de estado de habitaciones
function changeStatus(button) {
    if (button.classList.contains('available')) {
        button.classList.remove('available');
        button.classList.add('occupied');
        button.innerText = button.innerText.replace('Disponible', 'Ocupada');
    } else if (button.classList.contains('occupied')) {
        button.classList.remove('occupied');
        button.classList.add('maintenance');
        button.innerText = button.innerText.replace('Ocupada', 'En Mantenimiento');
    } else if (button.classList.contains('maintenance')) {
        button.classList.remove('maintenance');
        button.classList.add('available');
        button.innerText = button.innerText.replace('En Mantenimiento', 'Disponible');
    }
}

// Cargar datos desde un archivo XML
function cargarHabitacionesXML() {
    fetch('habitaciones.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const habitaciones = xmlDoc.getElementsByTagName("habitacion");
            let html = '<h2>Listado de Habitaciones</h2><ul>';
            for (let i = 0; i < habitaciones.length; i++) {
                const numero = habitaciones[i].getElementsByTagName("numero")[0].textContent;
                const tipo = habitaciones[i].getElementsByTagName("tipo")[0].textContent;
                const estado = habitaciones[i].getElementsByTagName("estado")[0].textContent;
                html += `<li>Habitación ${numero} - ${tipo} - Estado: ${estado}</li>`;
            }
            html += '</ul>';
            document.getElementById('habitaciones-list').innerHTML = html;
        });
}

// Cargar datos desde un archivo JSON
function cargarReservasJSON() {
    fetch('reservas.json')
        .then(response => response.json())
        .then(data => {
            let html = '<h2>Listado de Reservas</h2><ul>';
            data.forEach(reserva => {
                html += `<li>Código de Reserva: ${reserva.codigoReserva} - Nombre: ${reserva.nombre} - Habitación: ${reserva.habitacion} - Check-In: ${reserva.fechaCheckIn} - Check-Out: ${reserva.fechaCheckOut} - Huéspedes: ${reserva.huespedes}</li>`;
            });
            html += '</ul>';
            document.getElementById('reservas-list').innerHTML = html;
        });
}

// Ejecutar funciones de carga cuando se carga la página de reportes
document.addEventListener('DOMContentLoaded', function() {
    cargarHabitacionesXML();
    cargarReservasJSON();
});
