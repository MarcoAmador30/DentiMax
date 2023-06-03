$(document).ready(function(){
    if('token' in localStorage == false){
        let template = `
        <ul class="navbar-nav align-items-center">
            <li class="nav-item elementoMenu">
                <a href="index.html" aria-current="page">Inicio</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="servicios.html" aria-current="page">Servicios</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="#" aria-current="page">Sobre Nosotros</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="#" aria-current="page">Contacto</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="img/perfil.png" alt="foto perfil" width="30px" height="30px">
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="login.html">Iniciar Sesión</a></li>
                <li><a class="dropdown-item" href="registro.html">Registrarse</a></li>
                </ul>
            </li>
        </ul>`;
        $("#navbarNavDropdown").html(template);
    }
    else{
        let template = `
        <ul class="navbar-nav align-items-center">
            <li class="nav-item elementoMenu">
                <a href="index.html" aria-current="page">Inicio</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="servicios.html" aria-current="page">Servicios</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="#" aria-current="page">Sobre Nosotros</a>
            </li>
            <li class="nav-item elementoMenu">
                <a href="#" aria-current="page">Contacto</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="img/perfil.png" alt="foto perfil" width="30px" height="30px">
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" id="miPanel">Mi panel</a></li>
                <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar Sesión</a></li>
                </ul>
            </li>
        </ul>
        `;
        $("#navbarNavDropdown").html(template);
    }

    $("#cerrarSesion").click(function(){
        localStorage.clear();
        window.location.replace('/dentimax/index.html');
    });

    $("#miPanel").click(function(){
        let sesion = JSON.parse(localStorage.getItem('token'));
        if(sesion.tipo == '0'){
            window.location.replace('/dentimax/panelUsuario.html');
        }
        else if(sesion.tipo == '1'){
            window.location.replace('/dentimax/panelDentista.html');
        }
    });
});