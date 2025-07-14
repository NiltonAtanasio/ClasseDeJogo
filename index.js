class Heroi {

  constructor(nome, idade, tipo, ataque, emoji) {
    this.nome = nome;
    this.idade = idade;
    this.tipo = tipo;
    this.ataque = ataque;
    this.emoji = emoji;
  }

  atacar() {
    return `${this.emoji} O ${this.tipo} ${this.nome} atacou usando ${this.ataque}.`;
  }
}

class Mago extends Heroi {
  constructor(nome, idade) {
    super(nome, idade, "Mago", "magia", "🧙‍♂️");
  }
}

class Guerreiro extends Heroi {
  constructor(nome, idade) {
    super(nome, idade, "Guerreiro", "espada", "🗡️");
  }
}

class Monge extends Heroi {
  constructor(nome, idade) {
    super(nome, idade, "Monge", "artes marciais", "🧘‍♂️");
  }
}

class Ninja extends Heroi {
  constructor(nome, idade) {
    super(nome, idade, "Ninja", "shuriken", "🥷");
  }
}

function criarHeroi() {
  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value.trim());
  const tipo = document.getElementById("tipo").value.trim();
  const resultado = document.getElementById("resultado");

  if (!nome || isNaN(idade) || idade <= 0 || !tipo) {
    resultado.innerHTML = "⚠️ Preencha todos os campos corretamente.";
    return;
  }

  const heroi = instanciarHeroi(nome, idade, tipo);

  if (!heroi) {
    mostrarResultado(`❌ Tipo "${tipo}" não reconhecido. Use: Mago, Guerreiro, Monge ou Ninja.`);
    return;
  }

  const texto = heroi.atacar();
  mostrarResultado(texto);
  adicionarAoHistorico(heroi);
}

function instanciarHeroi(nome, idade, tipo) {
  switch (tipo.toLowerCase()) {
    case "mago":
      return new Mago(nome, idade);
    case "guerreiro":
      return new Guerreiro(nome, idade);
    case "monge":
      return new Monge(nome, idade);
    case "ninja":
      return new Ninja(nome, idade);
    default:
      return null;
  }
}

function mostrarResultado(texto) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = texto;
  resultado.style.animation = "none";
  void resultado.offsetWidth;
  resultado.style.animation = "aparecer 0.5s forwards";
}

const historico = [];

function adicionarAoHistorico(heroi) {
  const historicoUl = document.getElementById("historico");
  const item = document.createElement("li");
  item.innerText = `${heroi.emoji} ${heroi.tipo} ${heroi.nome}, ${heroi.idade} anos`;
  historicoUl.prepend(item);
  historico.push(heroi);
}

// 🎲 Sorteio de herói com nome aleatório
function sortearHeroi() {
  const nomesAleatorios = ["Arthas", "Luna", "Raijin", "Kael", "Aiko", "Zhao"];
  const tipos = ["mago", "guerreiro", "monge", "ninja"];

  const nome = nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];
  const idade = Math.floor(Math.random() * 100) + 18;
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];

  const heroi = instanciarHeroi(nome, idade, tipo);

  if (!heroi) {
    mostrarResultado("❌ Tipo sorteado inválido.");
    return;
  }

  const texto = `🎲 Sorteio: ${heroi.atacar()}`;
  mostrarResultado(texto);
  adicionarAoHistorico(heroi);
}