import {
    cartas
} from "./cartas.js"
//---------------------------------
var cartaMaquina;
var cartaJogador;
var pontosJogador = 0;
var pontosMaquina = 0;
var deck = [];
var frenteDaCarta1;
var frenteDaCarta2;
var flipCardAudio = document.querySelector("#flipCard");
var winAudio = document.querySelector("#win");
var loseAudio = document.querySelector("#lose");
for(var i = 0; i < cartas.length; i++){
	deck.push(cartas[i]);
}
var state = 0;
var flipCard1 = document.querySelector(".flip-card1");
var flipCard2 = document.querySelector(".flip-card2");
var flipCardInner1 = document.querySelector(".flip-card-inner1");
var flipCardInner2 = document.querySelector(".flip-card-inner2");
var cartasNoDeck = document.querySelector(".cards");

function ativaBtnSortear(){
    var btnSortear = document.querySelector(".sortear");
    btnSortear.addEventListener("click", sortearCarta);
}

ativaBtnSortear()
updateDeck()

function sortearCarta(){
  var numeroCartaMaquina = parseInt(Math.random() * deck.length);
  cartaMaquina = deck[numeroCartaMaquina];
	deck.splice(numeroCartaMaquina, 1);
  
  var numeroCartajogador = parseInt(Math.random() * deck.length);
  cartaJogador = deck[numeroCartajogador];
	deck.splice(numeroCartajogador, 1);
  
  document.querySelector('.sortear').style.display = "none";
  
	updateDeck()
	updateData()
	exibirOpcoes()
	
	
}

function updateDeck(){
	var cartasNoBaralho = deck.length;
	cartasNoDeck.innerText = cartasNoBaralho;
}

function updateData(){	
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
	
	flipCard1.classList.add("pulse");
	flipCardInner1.style.transform = "rotateY(180deg)";
	flipCardAudio.play();
	state = 0;
	
	frenteDaCarta1 = document.querySelector(".flip-card-inner-front1");
	frenteDaCarta2 = document.querySelector(".flip-card-inner-front2");
	
	if(cartaJogador.numero == 11){
		frenteDaCarta1.classList.add("brilhante");
	} else if(cartaMaquina.numero == 11){
		frenteDaCarta2.classList.add("brilhante");
	} else if(cartaJogador.numero != 11 && cartaMaquina.numero != 11){
		frenteDaCarta1.classList.remove("brilhante");
		frenteDaCarta2.classList.remove("brilhante");
	}
	
	
}

function exibirOpcoes(){
  var opcoes = document.querySelector(".options");
  var opcoesTexto = "";
  for(var atributo in cartaJogador.atributos){
		opcoesTexto += `<button id="btn${atributo}" class="btnatributo">${atributo}</button>`;
  }
	
	var template = `<p>Que atributo você deseja comparar?</p><br>
	${opcoesTexto}`;
  opcoes.innerHTML = template;
	adicionarEventos();
}

function adicionarEventos(){
	var btns = document.querySelectorAll(".btnatributo");
	btns.forEach(button => {
		button.addEventListener("click", ()=>{
			obtemAtributoSelecionado(button.innerText);
		})
	})
}

function obtemAtributoSelecionado(atributo){
  jogar(atributo);
}

function jogar(atributoSelecionado){
	var placarJogador = document.querySelector("#placarJogador");
	var placarMaquina = document.querySelector("#placarMaquina");
	
  if(cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]){
    mostraResultado("Você venceu!");
		pontosJogador++;
		placarJogador.innerText = pontosJogador;
		winAudio.play();
  } else if(cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]){
    mostraResultado("Você perdeu!");
		pontosMaquina++;
		placarMaquina.innerText = pontosMaquina;
		loseAudio.play();
  } else {
    mostraResultado("Empatou!");
  }
	
	if(state == 0){
		flipCard2.classList.add("pulse");
		flipCardInner2.style.transform = "rotateY(180deg)";
		flipCardAudio.play();
 		state = 1;
 	}
}

function mostraResultado(msg){
	var resultado = document.querySelector(".comandos");
	var template = `<h1>${msg}</h1><br><button class="jogarNovamente">Jogar Novamente</button>`;
	resultado.innerHTML = template;
	var jogarNovamente = document.querySelector(".jogarNovamente");
	jogarNovamente.addEventListener("click", proximoRound);
}

function proximoRound(){
	winAudio.load();
	loseAudio.load();
	if(deck.length != 0){
		flipCardInner1.style.transform = "rotateY(0deg)";
		flipCardInner2.style.transform = "rotateY(0deg)";
		flipCard1.classList.remove("pulse");
		flipCard2.classList.remove("pulse");
		state = 0;

		var comandos = document.querySelector(".comandos");
		var template = `<button class="sortear">Sortear carta</button>
				<div class="options"></div>
				`;

		setTimeout(()=>{
			comandos.innerHTML = template;
            ativaBtnSortear();
		}, 500)
	}else{
		updateDeck()
		var split = document.querySelector(".split");
		var vencedor;
		if(pontosJogador > pontosMaquina){
			vencedor = "Uhul! Você venceu o jogo!";
		} else if(pontosJogador < pontosMaquina){
			vencedor = "Que pena. A máquina venceu o jogo!";
		}else{
			vencedor = "O jogo empatou!";
		}
		var template = `
		<div class="msgFinal">
		<h1 class="msgGrande">${vencedor}</h1>
		<h1 class="msg">Acabaram as Cartas!</h1>
		<button class="novoJogo">Novo jogo!</button>
		</div>`;
		split.innerHTML = template;
		
		var novoJogo = document.querySelector(".novoJogo");
		novoJogo.addEventListener("click", iniciarNovoJogo);
	}
}

function iniciarNovoJogo(){
	pontosMaquina = 0;
	pontosJogador = 0;
	placarJogador.innerText = pontosJogador;
	placarMaquina.innerText = pontosMaquina;
	
	
	for(var i = 0; i < cartas.length; i++){
		deck.push(cartas[i]);
	}
	
	updateDeck()
	var split = document.querySelector(".split");
	var template = `
	<div class="flip-card1">
  <div class="flip-card-inner1">
    <div class="flip-card-inner-back1">
      <img class="cardImageBack1" src="https://i.pinimg.com/originals/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg" alt="Card Back" >
    </div>
    <div class="flip-card-inner-front1">
      <h1 class="frontCardTitulo1">Goku</h1>
			<img class="frontCardImage1" src="https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/05/09/goku2.jpg" alt="">
      <ul class="frontCardAtributos1">
      	<li class="atributoForca1">Forca <span class="forca1">5</span></li>
      	<li class="atributoDefesa1">Defesa <span class="defesa1">5</span></li>
      	<li class="atributoMagia1">Magia <span class="magia1">5</span></li>
      </ul>
    </div>
  </div>
</div>
		
		<div class="comandos">
			<button class="sortear">Sortear carta</button>
			<div class="options"></div>
			
		</div>
		
		<div class="flip-card2">
  <div class="flip-card-inner2">
    <div class="flip-card-inner-back2">
      <img class="cardImageBack2" src="https://i.pinimg.com/originals/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg" alt="Card Back" >
    </div>
    <div class="flip-card-inner-front2">
      <h1 class="frontCardTitulo2">Goku</h1>
			<img class="frontCardImage2" src="https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/05/09/goku2.jpg" alt="">
      <ul class="frontCardAtributos2">
      	<li class="atributoForca2">Forca <span class="forca2">5</span></li>
      	<li class="atributoDefesa2">Defesa <span class="defesa2">5</span></li>
      	<li class="atributoMagia2">Magia <span class="magia2">5</span></li>
      </ul>
    </div>
  </div>
</div>
`;

	split.innerHTML = template;
	flipCard1 = document.querySelector(".flip-card1");
	flipCard2 = document.querySelector(".flip-card2");
	flipCardInner1 = document.querySelector(".flip-card-inner1");
	flipCardInner2 = document.querySelector(".flip-card-inner2");
    ativaBtnSortear()
}