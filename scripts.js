

// Lógica para el registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar recargar la página

        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        // Validación de contraseñas
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Obtener los usuarios almacenados en localStorage o inicializar un array vacío
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el usuario ya existe
        const usuarioExistente = usuarios.find(user => user.username === username || user.email === email);
        if (usuarioExistente) {
            alert('El usuario o correo ya están registrados.');
            return;
        }

        // Registrar usuario
        usuarios.push({ username, email, password });

        // Guardar el array de usuarios actualizado en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Registro exitoso.');

        // Redirigir al login
        window.location.href = 'login.html';
    });
}

// Lógica para el inicio de sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar recargar la página

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Validar campos
        if (!username || !password) {
            document.getElementById('errorMessage').textContent = 'Por favor, ingresa usuario y contraseña.';
            return;
        }

        // Obtener los usuarios almacenados en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar el usuario en el array
        const usuario = usuarios.find(user => user.username === username && user.password === password);

        if (usuario) {
            alert(`¡Bienvenido, ${username}!`);
            // Guardar el estado de la sesión
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
            // Redirigir al inicio
            window.location.href = 'index.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Usuario o contraseña incorrectos.';
        }
    });
    if (typeof(Storage) !== "undefined") {
        // Se puede usar localStorage
    } else {
        alert("Tu navegador no soporta localStorage.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Recuperar datos del usuario logueado desde localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    const logoutBtn = document.getElementById('logout-btn');
    const iniciarSesionBtn = document.getElementById('botonIniciarSesion');

    if (usuarioLogueado) {
        // Parsear el objeto JSON almacenado en localStorage
        const usuario = JSON.parse(usuarioLogueado);

        // Asegurarse de que el nombre del usuario está disponible
        if (usuario.username) {
            document.getElementById('user-name').textContent = usuario.username;
        } else {
            document.getElementById('user-name').textContent = 'Usuario';
        }

        // Mostrar un ícono de usuario
        const userIcon = document.getElementById('user-icon');
        userIcon.src = './img/usuario.jpg'; // Ruta a tu imagen
        userIcon.alt = 'Ícono de usuario';

        // Mostrar el botón de Cerrar Sesión
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        if (iniciarSesionBtn) {
            iniciarSesionBtn.style.display = 'none';  // Ocultar el botón de inicio de sesión
        }
    } else {
        // Si no hay usuario logueado, ocultar la sección de usuario
        document.getElementById('user-info').style.display = 'none';
        if (iniciarSesionBtn) {
            iniciarSesionBtn.style.display = 'block';  // Mostrar el botón de inicio de sesión
        }
    }

    // Manejar el clic en el botón de Cerrar Sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Eliminar el usuario del localStorage
            localStorage.removeItem('usuarioLogueado');

            // Redirigir a la página de inicio de sesión o inicio
            window.location.href = 'login.html';  // Cambiar a la página de inicio si lo prefieres
        });
    }
});
//Reservas guardadas en usuario
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar recargar la página

            // Obtener los datos de la reserva
            const destination = document.getElementById('destination').value.trim();
            const checkin = document.getElementById('checkin').value.trim();
            const checkout = document.getElementById('checkout').value;
            const rooms = document.getElementById('rooms').value;
            const guests = document.getElementById('guests').value;
            const checkinDate = document.getElementById('checkin-date').value;
            const checkoutDate = document.getElementById('checkout-date').value;

            // Validar que el usuario esté logueado
            const usuarioLogueado = localStorage.getItem('usuarioLogueado');
            if (!usuarioLogueado) {
                alert('Debes iniciar sesión para hacer una reserva.');
                return;
            }

            // Parsear el usuario logueado desde localStorage
            const usuario = JSON.parse(usuarioLogueado);

            // Crear el objeto de reserva
            const reserva = {
                destination: destination,
                checkin: checkin,
                checkout: checkout,
                rooms: rooms,
                guests: guests,
                checkinDate: checkinDate,
                checkoutDate: checkoutDate
            };

            // Verificar si el usuario tiene reservas, si no, crear un array vacío
            if (!usuario.reservas) {
                usuario.reservas = [];
            }

            // Agregar la nueva reserva al array de reservas del usuario
            usuario.reservas.push(reserva);

            // Actualizar el objeto del usuario en localStorage
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

            alert('¡Reserva realizada con éxito!');

            // Redirigir a Mis reservas
            window.location.href = 'Mis reservas.html';  // Redirige a la página Mis reservas
        });
    }
});
