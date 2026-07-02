var fondo;
var carro;
var cursores;

var enemigos;
var gasolinas;
var barriles;

var timerEnemigos;
var timerGasolina;
var timerBarriles;

var puntos = 0;
var score = 0;
var vidas = 3;
var nivel = 1;

var txtPuntos;
var txtScore;
var txtVidas;
var txtNivel;
var txtMensaje;

var velocidadFondo = 3;
var velocidadEnemigos = 200;
var velocidadGasolina = 200;
var velocidadBarriles = 230;

var acumuladorScore = 0;

var musicaFondo;
var sonidoChoque;
var sonidoPunto;

var estadoFinal = "";
var scoreFinal = 0;

var Juego = {
    preload: function () {
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('carroMalo1', 'img/carroMalo1.png');
        juego.load.image('gasolina', 'img/gas.png');
        juego.load.image('explosion', 'img/explosion.png');

        juego.load.audio('musicaFondo', 'audio/fondo.mp3');
        juego.load.audio('sonidoChoque', 'audio/choque.mp3');
        juego.load.audio('sonidoPunto', 'audio/punto.mp3');

        juego.forceSingleUpdate = true;
    },

    create: function () {
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        puntos = 0;
        score = 0;
        vidas = 3;
        nivel = 1;
        estadoFinal = "";
        scoreFinal = 0;
        acumuladorScore = 0;

        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');

        carro = juego.add.sprite(juego.width / 2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro);

        carro.body.setSize(carro.width * 0.7, carro.height * 0.8);
        carro.body.collideWorldBounds = true;

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;

        gasolinas = juego.add.group();
        gasolinas.enableBody = true;
        gasolinas.physicsBodyType = Phaser.Physics.ARCADE;

        barriles = juego.add.group();
        barriles.enableBody = true;
        barriles.physicsBodyType = Phaser.Physics.ARCADE;

        cursores = juego.input.keyboard.createCursorKeys();

        txtScore = juego.add.text(10, 10, "Score: 0", {
            font: "16px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });

        txtPuntos = juego.add.text(10, 32, "Puntos: 0/3", {
            font: "16px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });

        txtVidas = juego.add.text(10, 54, "Vidas: 3", {
            font: "16px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });

        txtNivel = juego.add.text(190, 10, "Nivel: 1", {
            font: "16px Arial",
            fill: "#FFFFFF",
            fontWeight: "bold"
        });

        txtMensaje = juego.add.text(juego.width / 2, juego.height / 2, "", {
            font: "26px Arial",
            fill: "#FFFF00",
            fontWeight: "bold",
            align: "center"
        });
        txtMensaje.anchor.setTo(0.5);

        musicaFondo = juego.add.audio('musicaFondo');
        sonidoChoque = juego.add.audio('sonidoChoque');
        sonidoPunto = juego.add.audio('sonidoPunto');

        musicaFondo.loopFull(0.4);

        this.configurarNivel();
    },

    update: function () {
        fondo.tilePosition.y += velocidadFondo;

        acumuladorScore += juego.time.elapsed;

        if (acumuladorScore >= 100) {
            score += 1;
            acumuladorScore = 0;
            txtScore.text = "Score: " + score;
        }

        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += 5;
        } else if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= 5;
        }

        juego.physics.arcade.overlap(carro, enemigos, this.chocarEnemigo, null, this);
        juego.physics.arcade.overlap(carro, barriles, this.chocarBarril, null, this);
        juego.physics.arcade.overlap(carro, gasolinas, this.cogerGasolina, null, this);
    },

    configurarNivel: function () {
        if (timerEnemigos) {
            juego.time.events.remove(timerEnemigos);
        }

        if (timerGasolina) {
            juego.time.events.remove(timerGasolina);
        }

        if (timerBarriles) {
            juego.time.events.remove(timerBarriles);
        }

        if (nivel === 1) {
            velocidadFondo = 3;
            velocidadEnemigos = 200;
            velocidadGasolina = 200;
            velocidadBarriles = 0;

            timerEnemigos = juego.time.events.loop(1500, this.crearCarroMalo, this);
            timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);
        }

        if (nivel === 2) {
            velocidadFondo = 5;
            velocidadEnemigos = 330;
            velocidadGasolina = 260;
            velocidadBarriles = 360;

            timerEnemigos = juego.time.events.loop(900, this.crearCarroMalo, this);
            timerGasolina = juego.time.events.loop(1800, this.crearGasolina, this);
            timerBarriles = juego.time.events.loop(1300, this.crearBarril, this);
        }

        txtNivel.text = "Nivel: " + nivel;
        txtPuntos.text = "Puntos: " + puntos + "/3";
    },

    crearCarroMalo: function () {
        var posicion = Math.floor(Math.random() * 3) + 1;
        var textura = nivel === 1 ? 'carroMalo' : 'carroMalo1';

        var enemigo = enemigos.getFirstDead();

        if (!enemigo) {
            enemigo = enemigos.create(0, 0, textura);
        } else {
            enemigo.loadTexture(textura);
        }

        enemigo.reset(posicion * 73, -40);
        enemigo.anchor.setTo(0.5);
        enemigo.body.velocity.y = velocidadEnemigos;
        enemigo.body.setSize(enemigo.width * 0.7, enemigo.height * 0.8);
        enemigo.outOfBoundsKill = true;
        enemigo.checkWorldBounds = true;
    },

    crearGasolina: function () {
        var posicion = Math.floor(Math.random() * 3) + 1;

        var gasolina = gasolinas.getFirstDead();

        if (!gasolina) {
            gasolina = gasolinas.create(0, 0, 'gasolina');
        }

        gasolina.reset(posicion * 73, -40);
        gasolina.anchor.setTo(0.5);
        gasolina.body.velocity.y = velocidadGasolina;
        gasolina.body.setSize(gasolina.width * 0.7, gasolina.height * 0.7);
        gasolina.outOfBoundsKill = true;
        gasolina.checkWorldBounds = true;
    },

    crearBarril: function () {
        var posicion = Math.floor(Math.random() * 3) + 1;

        var barril = barriles.getFirstDead();

        if (!barril) {
            barril = barriles.create(0, 0, 'gasolina');
        }

        barril.reset(posicion * 73, -40);
        barril.anchor.setTo(0.5);
        barril.scale.setTo(0.8);
        barril.body.velocity.y = velocidadBarriles;
        barril.body.setSize(barril.width * 0.75, barril.height * 0.75);
        barril.outOfBoundsKill = true;
        barril.checkWorldBounds = true;
    },

    chocarEnemigo: function (carro, enemigo) {
        enemigo.kill();
        this.quitarVida();
    },

    chocarBarril: function (carro, barril) {
        barril.kill();
        this.quitarVida();
    },

    quitarVida: function () {
        vidas--;
        txtVidas.text = "Vidas: " + vidas;

        sonidoChoque.play();

        var explosion = juego.add.sprite(carro.x, carro.y, 'explosion');
        explosion.anchor.setTo(0.5);
        explosion.scale.setTo(0.5);

        juego.time.events.add(300, function () {
            explosion.kill();
        }, this);

        carro.alpha = 0.4;

        juego.time.events.add(300, function () {
            carro.alpha = 1;
        }, this);

        if (vidas <= 0) {
            this.perderJuego();
        }
    },

    cogerGasolina: function (carro, gasolina) {
        gasolina.kill();

        puntos++;
        score += 10;

        sonidoPunto.play();

        txtPuntos.text = "Puntos: " + puntos + "/3";
        txtScore.text = "Score: " + score;

        if (puntos >= 3) {
            if (nivel === 1) {
                this.pasarNivelDos();
            } else if (nivel === 2) {
                this.ganarJuego();
            }
        }
    },

    pasarNivelDos: function () {
        nivel = 2;
        puntos = 0;

        enemigos.callAll('kill');
        gasolinas.callAll('kill');
        barriles.callAll('kill');

        txtMensaje.text = "NIVEL 2";
        txtPuntos.text = "Puntos: 0/3";

        this.configurarNivel();

        juego.time.events.add(1200, function () {
            txtMensaje.text = "";
        }, this);
    },

    ganarJuego: function () {
        estadoFinal = "gano";
        scoreFinal = score;

        juego.sound.stopAll();
        juego.state.start('Terminado');
    },

    perderJuego: function () {
        estadoFinal = "perdio";
        scoreFinal = score;

        juego.sound.stopAll();
        juego.state.start('Terminado');
    }
};