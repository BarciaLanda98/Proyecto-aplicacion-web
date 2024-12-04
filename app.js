const app = Vue.createApp({
    data() {
        return {
            mensaje: "¡Bienvenido a Hotel ULEAM!",
            usuarios: JSON.parse(localStorage.getItem('usuarios')) || [], // Cargar usuarios del localStorage
            nuevoUsuario: {
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        registrarUsuario() {
            // Validar contraseñas
            if (this.nuevoUsuario.password !== this.nuevoUsuario.confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            // Verificar si el usuario ya está registrado
            const usuarioExistente = this.usuarios.find(user => user.username === this.nuevoUsuario.username || user.email === this.nuevoUsuario.email);
            if (usuarioExistente) {
                alert("El usuario o el correo electrónico ya están registrados.");
                return;
            }

            // Registrar usuario
            const nuevoUsuario = {
                username: this.nuevoUsuario.username,
                email: this.nuevoUsuario.email,
                password: this.nuevoUsuario.password
            };

            this.usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(this.usuarios)); // Guardar en localStorage

            alert("Registro exitoso.");
            this.nuevoUsuario = { username: "", email: "", password: "", confirmPassword: "" };
        },
        
    }
});

app.mount('#app');
