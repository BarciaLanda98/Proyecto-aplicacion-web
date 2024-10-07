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
