import {
    cartas
} from "./cartas.js"
//---------------------------------
var cartaMaquina;
var cartaJogador;
var pontosJogador = 0;
var pontosMaquina = 0;
var deck = [];
var flipCardAudio = document.querySelector("#flipCard");
var winAudio = document.querySelector("#win");
var loseAudio = document.querySelector("#lose");
for (var i = 0; i < cartas.length; i++) {
    deck.push(cartas[i]);
}

var state = 0;
var flipCard1 = document.querySelector(".flip-card1");
var flipCard2 = document.querySelector(".flip-card2");
var flipCardInner1 = document.querySelector(".flip-card-inner1");
var flipCardInner2 = document.querySelector(".flip-card-inner2");
var sortear = document.querySelector(".sortear");

sortear.addEventListener("click", sortearCarta);

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * deck.length);
    cartaMaquina = deck[numeroCartaMaquina];

    var numeroCartajogador = parseInt(Math.random() * deck.length);
    while (numeroCartajogador == numeroCartaMaquina) {
        numeroCartajogador = parseInt(Math.random() * deck.length);
    }
    cartaJogador = deck[numeroCartajogador];

    document.querySelector('.sortear').style.display = "none";

    updateData();
    exibirOpcoes();
}

function updateData() {
    var nomeCard1 = document.querySelector(".frontCardTitulo1");
    var nomeCard2 = document.querySelector(".frontCardTitulo2");
    var imgCard1 = document.querySelector(".frontCardImage1");
    var imgCard2 = document.querySelector(".frontCardImage2");
    var forca1 = document.querySelector(".forca1");
    var defesa1 = document.querySelector(".defesa1");
    var magia1 = document.querySelector(".magia1");
    var forca2 = document.querySelector(".forca2");
    var defesa2 = document.querySelector(".defesa2");
    var magia2 = document.querySelector(".magia2");

    nomeCard1.innerText = cartaJogador.nome;
    imgCard1.src = cartaJogador.url;
    forca1.innerText = cartaJogador.atributos.forca;
    defesa1.innerText = cartaJogador.atributos.defesa;
    magia1.innerText = cartaJogador.atributos.magia;

    nomeCard2.innerText = cartaMaquina.nome;
    imgCard2.src = cartaMaquina.url;
    forca2.innerText = cartaMaquina.atributos.forca;
    defesa2.innerText = cartaMaquina.atributos.defesa;
    magia2.innerText = cartaMaquina.atributos.magia;
    
    setTimeout(()=>{
        flipCard1.classList.add("pulse");
        flipCardInner1.style.transform = "rotateY(180deg)";
        flipCardAudio.play();
    }, 50);
}

function exibirOpcoes() {
    var opcoes = document.querySelector(".options");
    var opcoesTexto = "";
    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += `<button id="btn${atributo}" class="btnatributo">${atributo}</button>`;
    }

    var template = `<p>Que atributo você deseja comparar?</p><br>
	${opcoesTexto}`;
    opcoes.innerHTML = template;
    adicionarEventos();
}

function adicionarEventos() {
    var btns = document.querySelectorAll(".btnatributo");
    btns.forEach(button => {
        button.addEventListener("click", () => {
            obtemAtributoSelecionado(button.innerText);
        })
    })
}

function obtemAtributoSelecionado(atributo) {
    jogar(atributo);
}

function jogar(atributoSelecionado) {
    var placarJogador = document.querySelector("#placarJogador");
    var placarMaquina = document.querySelector("#placarMaquina");

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        mostraResultado("Você venceu!");
        pontosJogador++;
        placarJogador.innerText = pontosJogador;
        winAudio.play();
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        mostraResultado("Você perdeu!");
        pontosMaquina++;
        placarMaquina.innerText = pontosMaquina;
        loseAudio.play();
    } else {
        mostraResultado("Empatou!");
    }

    if (state == 0) {
        flipCard2.classList.add("pulse");
        flipCardInner2.style.transform = "rotateY(180deg)";
        flipCardAudio.play();
        state = 1;
    }
}

function mostraResultado(msg) {
    var resultado = document.querySelector(".comandos");
    var template = `<h1>${msg}</h1><br><button class="jogarNovamente">Jogar Novamente</button>`;
    resultado.innerHTML = template;
    var jogarNovamente = document.querySelector(".jogarNovamente");
    jogarNovamente.addEventListener("click", reiniciar);
}

function reiniciar() {
    flipCardInner1.style.transform = "rotateY(0deg)";
    flipCardInner2.style.transform = "rotateY(0deg)";
    flipCard1.classList.remove("pulse");
    flipCard2.classList.remove("pulse");
    state = 0;

    var comandos = document.querySelector(".comandos");
    var template = `<button class="sortear">Sortear carta</button>
			<div class="options"></div>
			`;

    setTimeout(() => {
        comandos.innerHTML = template;
        var sortearbtn = document.querySelector(".sortear");
        sortearbtn.addEventListener("click", sortearCarta);
    }, 500);
}