<?php
    include_once __DIR__.'/database.php';

    $idPaciente = intval($_POST['idPaciente']);
    $idServicio = intval($_POST['idServicio']);
    $mes = intval($_POST['mes']);
    $dia = intval($_POST['dia']);
    $hora = $_POST['hora'];
    $data1 = array();

    if($result = $conexion->query("SELECT * FROM servicio WHERE id = '{$idServicio}' AND eliminado = 0")){
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        if(!is_null($rows)){
            foreach($rows as $num => $row){
                foreach($row as $key => $value){
                    $data1[$num][$key] = $value;
                }
            }
        }
    } else {
        die('Query Error: '.mysqli_error($conexion));
    }
    $query1 = "INSERT INTO cita VALUES(null, '{$idServicio}', '{$idPaciente}', 1, '{$mes}', '{$dia}', '{$hora}', 0, 0)";
    if($conexion->query($query1)){
        $data2 = array(
            "estatus" => "exito",
            "mensaje" => "cita creada con exito"
        );
    }
    else{
        $data2 = array(
            "estatus" => "error",
            "mensaje" => "cita no se pudo crear"
        );
    }
    echo json_encode($data2, JSON_PRETTY_PRINT);
?>