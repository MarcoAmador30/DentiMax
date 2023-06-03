<?php
    include_once __DIR__.'/database.php';

    $idCuenta = intval($_GET['id']);
    $data1 = array();
    
    if($result = $conexion->query("SELECT C.id AS 'id', C.mes AS 'mes', C.dia AS 'dia', C.hora AS 'hora', C.completado AS 'completado', S.nombre AS 'nombre' FROM cita C JOIN servicio S ON C.idServicio = S.id WHERE C.idPaciente = '{$idCuenta}' AND C.eliminado = 0 ORDER BY C.completado ASC, C.mes ASC, C.dia ASC")){
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
    echo json_encode($data1, JSON_PRETTY_PRINT);
?>