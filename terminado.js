var Terminado = {
    create: function () {
        juego.stage.backgroundColor = "#000000";

        var titulo = "";

        if (estadoFinal === "gano") {
            titulo = "GANASTE";
        } else {
            titulo = "VUELVE A INTENTARLO";
        }

        var textoTitulo = juego.add.text(juego.width / 2, 180, titulo, {
            font: "32px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold",
            align: "center"
        });
        textoTitulo.anchor.setTo(0.5);

        var textoScore = juego.add.text(juego.width / 2, 245, "Score final: " + scoreFinal, {
            font: "20px Arial",
            fill: "#FFFF00",
            fontWeight: "bold",
            align: "center"
        });
        textoScore.anchor.setTo(0.5);

        var textoReiniciar = juego.add.text(juego.width / 2, 330, "Presiona ESPACIO o haz clic\npara reiniciar", {
            font: "18px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        textoReiniciar.anchor.setTo(0.5);

        var teclaEspacio = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        teclaEspacio.onDown.addOnce(function () {
            juego.state.start('Juego');
        }, this);

        juego.input.onDown.addOnce(function () {
            juego.state.start('Juego');
        }, this);
    }
};