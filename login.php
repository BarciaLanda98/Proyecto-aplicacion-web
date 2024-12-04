<?php
header('Content-Type: application/json');

// Obtener los datos enviados en la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Leer los usuarios existentes
$file = 'usuarios.json';
if (!file_exists($file)) {
    echo json_encode(['success' => false, 'message' => 'No se encontraron usuarios registrados.']);
    exit;
}
$users = json_decode(file_get_contents($file), true);

// Buscar el usuario
foreach ($users as $user) {
    if ($user['username'] === $data['username'] && password_verify($data['password'], $user['password'])) {
        echo json_encode(['success' => true]);
        exit;
    }
}

echo json_encode(['success' => false, 'message' => 'Usuario o contraseña incorrectos.']);
