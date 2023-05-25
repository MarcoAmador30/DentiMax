<?php
    include_once __DIR__.'/database.php';

    $mes = intval($_GET['mes']);
    $dia = intval($_GET['dia']);
    $data1 = array();

    if($result = $conexion->query("SELECT C.id AS 'id', C.dia AS 'dia', C.hora AS 'hora', S.duracion AS 'duracion' FROM cita C JOIN servicio S ON C.idServicio = S.id WHERE C.mes = '{$mes}' AND C.dia >= '{$dia}' AND C.completado = 0")){
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