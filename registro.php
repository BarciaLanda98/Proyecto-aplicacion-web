<?php
header('Content-Type: application/json');

// Obtener los datos enviados en la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos
if (!isset($data['username']) || !isset($data['password']) || !isset($data['email'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
    exit;
}

// Leer el archivo JSON existente
$file = 'usuarios.json';
if (!file_exists($file)) {
    file_put_contents($file, '[]');
}
$users = json_decode(file_get_contents($file), true);

// Verificar si el usuario ya existe
foreach ($users as $user) {
    if ($user['username'] === $data['username']) {
        echo json_encode(['success' => false, 'message' => 'El usuario ya existe.']);
        exit;
    }
}

// Agregar el nuevo usuario
$users[] = [
    'username' => $data['username'],
    'password' => password_hash($data['password'], PASSWORD_DEFAULT),
    'email' => $data['email']
];
file_put_contents($file, json_encode($users));

echo json_encode(['success' => true]);
