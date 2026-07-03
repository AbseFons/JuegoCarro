var Terminado = {
    create: function() {
        var mensaje = "Ha perdido. Su puntaje final fue: " + puntos + "\n\n¿Desea reiniciar?";
        var reiniciar = confirm(mensaje);
        
        if (reiniciar) {
            juego.state.start('Juego');
        }
    }
};