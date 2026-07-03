var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;
var puntos;      
var txtPuntos;   

var Juego = {
    preload: function(){
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('gasolina', 'img/gas.png');
        juego.forceSingleUpdate = true;
    },

    create: function(){
        juego.physics.startSystem(Phaser.Physics.ARCADE);

        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');
        
        carro = juego.add.sprite(juego.width/2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro);

        // Enemigos
        enemigos = juego.add.group();
        juego.physics.arcade.enable(enemigos, true);
        enemigos.enableBody = true;
        enemigos.createMultiple(20, 'carroMalo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);

        // Gasolinas
        gasolinas = juego.add.group();
        juego.physics.arcade.enable(gasolinas, true);
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'gasolina');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);

        // Timers
        timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
        timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);

        cursores = juego.input.keyboard.createCursorKeys();

        
        puntos = 0;
        txtPuntos = juego.add.text(20, 20, "0", { font: "30px Arial", fill: "#FFF", fontWeight: "bold" });
    },

    update: function(){
        fondo.tilePosition.y += 3;

        // Movimiento
        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += 5;
        } else if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= 5;
        }

        // Detección de Colisiones
        juego.physics.arcade.overlap(carro, enemigos, this.chocarEnemigo, null, this);
        
        // Colisión beneficiosa (Puntaje)
        juego.physics.arcade.overlap(carro, gasolinas, this.cogerGasolina, null, this);
    },

    crearCarroMalo: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var enemigo = enemigos.getFirstDead();
        if(enemigo){
            enemigo.physicsBodyType = Phaser.Physics.ARCADE;
            enemigo.reset(posicion * 73, 0);
            enemigo.body.velocity.y = 200;
            enemigo.anchor.setTo(0.5);
        }
    },

    crearGasolina: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var gasolina = gasolinas.getFirstDead();
        if(gasolina){
            gasolina.physicsBodyType = Phaser.Physics.ARCADE;
            gasolina.reset(posicion * 73, 0);
            gasolina.body.velocity.y = 200;
            gasolina.anchor.setTo(0.5);
        }
    },

    chocarEnemigo: function(){
        juego.state.start('Terminado');
    },

    cogerGasolina: function(carro, gasolina){
        gasolina.kill(); 
        puntos += 10;
        txtPuntos.text = puntos;
    }
};