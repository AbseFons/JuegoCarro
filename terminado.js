var Terminado = {
    create: function() {
        var mensaje = "Ha perdido.\nPuntaje final: " + puntos + "\n\nPresione ENTER\npara reiniciar";

        var texto = juego.add.text(juego.width / 2, juego.height / 2, mensaje, {
            font: "22px Arial",
            fill: "#FFF",
            align: "center",
            fontWeight: "bold"
        });

        texto.anchor.setTo(0.5);

        var teclaEnter = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        teclaEnter.onDown.add(function(){
            juego.state.start('Juego');
        }, this);
    }
};