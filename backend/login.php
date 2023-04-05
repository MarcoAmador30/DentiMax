<?php
    include_once __DIR__.'/database.php';

    $correo = $_GET['correo'];
    $contrasena = $_GET['contrasena'];
    $data1 = array();

    if($consulta1 = $conexion->query("SELECT * from usuario WHERE correo = '$correo' AND contrasena = '$contrasena' AND tipo = 0 AND eliminado = 0")){
        $rows = $consulta1->fetch_all(MYSQLI_ASSOC);

        if(sizeof($rows) > 0){
            foreach($rows as $num => $row){
                foreach($row as $key => $value){
                    $data1[$num][$key] = $value;
                }
            }
            session_start();
            $_SESSION['autenticado'] = true;
            $_SESSION['idCuenta'] = $rows[0]['idCuenta'];
        }
    } if($consulta2 = $conexion->query("SELECT * from usuario WHERE correo = '$correo' AND contrasena = '$contrasena' AND tipo = 1 AND eliminado = 0")){
        $rows = $consulta2->fetch_all(MYSQLI_ASSOC);

        if(sizeof($rows) > 0){
            foreach($rows as $num => $row){
                foreach($row as $key => $value){
                    $data1[$num][$key] = $value;
                }
            }
            session_start();
            $_SESSION['autenticado'] = true;
            $_SESSION['idCuenta'] = $rows[0]['idCuenta'];
        }
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }
    $conexion->close();
    echo json_encode($data1, JSON_PRETTY_PRINT);
?>