var Terminado = {
    create: function() {
        juego.stage.backgroundColor = '#111827';

        var fondoFinal = juego.add.tileSprite(0, 0, 290, 540, 'bg');
        fondoFinal.alpha = 0.35;

        var capaOscura = juego.add.graphics(0, 0);
        capaOscura.beginFill(0x000000, 0.55);
        capaOscura.drawRect(0, 0, juego.width, juego.height);
        capaOscura.endFill();

        var panel = juego.add.graphics(0, 0);
        panel.beginFill(0x1F2937, 0.95);
        panel.lineStyle(3, 0xFFFFFF, 0.25);
        panel.drawRoundedRect(22, 105, 246, 320, 12);
        panel.endFill();

        var titulo = juego.add.text(juego.width / 2, 145, "FIN DEL JUEGO", {
            font: "28px Arial",
            fill: "#FF4D4D",
            fontWeight: "bold"
        });
        titulo.anchor.setTo(0.5);

        var subtitulo = juego.add.text(juego.width / 2, 185, "Tu carrera terminó", {
            font: "17px Arial",
            fill: "#E5E7EB"
        });
        subtitulo.anchor.setTo(0.5);

        var linea = juego.add.graphics(0, 0);
        linea.lineStyle(2, 0xFFFFFF, 0.2);
        linea.moveTo(48, 215);
        linea.lineTo(242, 215);

        var textoPuntos = juego.add.text(juego.width / 2, 250, "PUNTAJE", {
            font: "16px Arial",
            fill: "#9CA3AF",
            fontWeight: "bold"
        });
        textoPuntos.anchor.setTo(0.5);

        var puntajeFinal = juego.add.text(juego.width / 2, 282, puntos, {
            font: "42px Arial",
            fill: "#FFD700",
            fontWeight: "bold"
        });
        puntajeFinal.anchor.setTo(0.5);

        var nivelFinal = juego.add.text(juego.width / 2, 325, "Nivel alcanzado: " + nivel, {
            font: "18px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });
        nivelFinal.anchor.setTo(0.5);

        var boton = juego.add.graphics(0, 0);
        boton.beginFill(0x2563EB, 1);
        boton.drawRoundedRect(55, 358, 180, 45, 10);
        boton.endFill();
        boton.inputEnabled = true;

        var textoBoton = juego.add.text(juego.width / 2, 381, "REINICIAR", {
            font: "19px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });
        textoBoton.anchor.setTo(0.5);

        var ayuda = juego.add.text(juego.width / 2, 448, "Presiona ENTER o haz clic", {
            font: "14px Arial",
            fill: "#D1D5DB"
        });
        ayuda.anchor.setTo(0.5);

        boton.events.onInputDown.add(this.reiniciar, this);
        textoBoton.inputEnabled = true;
        textoBoton.events.onInputDown.add(this.reiniciar, this);

        var teclaEnter = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        teclaEnter.onDown.add(this.reiniciar, this);
    },

    reiniciar: function() {
        juego.state.start('Juego');
    }
};