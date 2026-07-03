var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;

var puntos;
var txtPuntos;

var vidas;
var txtVidas;

var nivel;
var txtNivel;

var gasolinasConsumidas;

var velocidadFondo;
var velocidadEnemigo;
var velocidadGasolina;

var sonidoChoque;
var sonidoPunto;
var musicaFondo;

var invulnerable = false;

var Juego = {
    preload: function(){
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('carroMalo1', 'img/carroMalo1.png');
        juego.load.image('gasolina', 'img/gas.png');

        juego.load.audio('choque', 'audio/choque.mp3');
        juego.load.audio('punto', 'audio/punto.mp3');
        juego.load.audio('fondoMusica', 'audio/fondo.mp3');

        juego.forceSingleUpdate = true;
    },

    create: function(){
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');

        carro = juego.add.sprite(juego.width / 2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro);

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.createMultiple(20, 'carroMalo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);

        gasolinas = juego.add.group();
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'gasolina');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);

        cursores = juego.input.keyboard.createCursorKeys();

        puntos = 0;
        vidas = 3;
        nivel = 1;
        gasolinasConsumidas = 0;

        velocidadFondo = 3;
        velocidadEnemigo = 200;
        velocidadGasolina = 200;

        txtPuntos = juego.add.text(15, 15, "Puntos: 0", {
            font: "20px Arial",
            fill: "#FFF",
            fontWeight: "bold"
        });

        txtVidas = juego.add.text(15, 45, "Vidas: 3", {
            font: "20px Arial",
            fill: "#FFF",
            fontWeight: "bold"
        });

        txtNivel = juego.add.text(15, 75, "Nivel: 1", {
            font: "20px Arial",
            fill: "#FFF",
            fontWeight: "bold"
        });

        sonidoChoque = juego.add.audio('choque');
        sonidoPunto = juego.add.audio('punto');
        musicaFondo = juego.add.audio('fondoMusica');

        musicaFondo.loopFull(0.4);

        timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
        timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);
    },

    update: function(){
        fondo.tilePosition.y += velocidadFondo;

        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += 5;
        } else if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= 5;
        }

        juego.physics.arcade.overlap(carro, enemigos, this.chocarEnemigo, null, this);
        juego.physics.arcade.overlap(carro, gasolinas, this.cogerGasolina, null, this);
    },

    crearCarroMalo: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var enemigo = enemigos.getFirstDead();

        if (enemigo) {
            enemigo.reset(posicion * 73, 0);

            if (nivel === 2) {
                enemigo.loadTexture('carroMalo1');
            } else {
                enemigo.loadTexture('carroMalo');
            }

            enemigo.body.velocity.y = velocidadEnemigo;
        }
    },

    crearGasolina: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var gasolina = gasolinas.getFirstDead();

        if (gasolina) {
            gasolina.reset(posicion * 73, 0);
            gasolina.body.velocity.y = velocidadGasolina;
        }
    },

    chocarEnemigo: function(jugador, enemigo){
        if (invulnerable) {
            return;
        }

        enemigo.kill();
        vidas--;
        txtVidas.text = "Vidas: " + vidas;

        sonidoChoque.play();

        invulnerable = true;
        carro.alpha = 0.5;

        juego.time.events.add(1000, function(){
            invulnerable = false;
            carro.alpha = 1;
        }, this);

        if (vidas <= 0) {
            musicaFondo.stop();
            juego.state.start('Terminado');
        }
    },

    cogerGasolina: function(jugador, gasolina){
        gasolina.kill();

        puntos += 10;
        gasolinasConsumidas++;

        txtPuntos.text = "Puntos: " + puntos;

        sonidoPunto.play();

        if (gasolinasConsumidas >= 3 && nivel === 1) {
            this.pasarNivelDos();
        }
    },

    pasarNivelDos: function(){
        nivel = 2;
        txtNivel.text = "Nivel: 2";

        velocidadFondo = 5;
        velocidadEnemigo = 300;
        velocidadGasolina = 300;

        juego.time.events.remove(timer);
        juego.time.events.remove(timerGasolina);

        timer = juego.time.events.loop(1000, this.crearCarroMalo, this);
        timerGasolina = juego.time.events.loop(1700, this.crearGasolina, this);

        var aviso = juego.add.text(juego.width / 2, juego.height / 2, "NIVEL 2", {
            font: "38px Arial",
            fill: "#FFD700",
            fontWeight: "bold"
        });

        aviso.anchor.setTo(0.5);

        juego.time.events.add(1200, function(){
            aviso.destroy();
        }, this);
    }
};