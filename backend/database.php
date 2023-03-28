<?php
    $conexion = @mysqli_connect(
        'localhost',
        'root',
        'Chabeleitor777',
        'dentista'
    );
    if(!$conexion){
        die('Base de datos no conectada');
    }
?>