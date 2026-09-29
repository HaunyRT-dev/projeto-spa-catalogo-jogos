
    const jogos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "estatisticas") mostrarEstatisticas();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
  app.innerHTML = `
    <h1>Catálogo de Jogos</h1>
    <p>
      Bem-vindo ao seu acervo pessoal de games. 
      A navegação acontece sem recarregar a página, no formato SPA.
    </p>

    <p>
      Os títulos cadastrados ficam temporariamente guardados em um array JavaScript.
    </p>

    <div class="contador">
      Jogos cadastrados nesta sessão: <strong>${jogos.length}</strong>
    </div>

    <div class="acoes">
      <button class="botao" id="btnCadastrar">Adicionar Jogo</button>
      <button class="botao secundario" id="btnVerJogos">Meus Jogos</button>
    </div>
  `;

  document.querySelector("#btnCadastrar")
    .addEventListener("click", () => irPara("cadastro"));

  document.querySelector("#btnVerJogos")
    .addEventListener("click", () => irPara("lista"));
}

    function mostrarCadastro() {
  app.innerHTML = `
    <h1>Adicionar Jogo</h1>

    <form id="formJogo">
      <div class="campo">
        <label for="nome">Nome do Jogo</label>
        <input id="nome" type="text" placeholder="Ex: Detroit: Become Human" required />
      </div>

      <div class="campo">
  <label for="plataforma">Plataforma</label>
  <input id="plataforma" list="opcoes-plataforma" type="text" placeholder="Ex: PS5, PC..." required />
  
  <datalist id="opcoes-plataforma">
    <option value="Playstation 5 (PS5)"></option>
    <option value="Nintendo Switch"></option>
    <option value="Nintendo Switch 2"></option>
    <option value="PC"></option>
    <option value="Xbox Series X"></option>
    <option value="Playstation 4 (PS4)"></option>
    <option value="Xbox One"></option>
    <option value="Mobile"></option>
    <option value="Xbox Series S"></option>
    <option value="Xbox Series X"></option>
    <option value="MetaQuest 3/3s"></option>

  </datalist>
</div>

      <div class="campo">
        <label for="genero">Gênero</label>
        <input id="genero" list="opcoes-genero" type="text" placeholder="Ex: Ação, RPG, Plataforma" required />
        <datalist id="opcoes-genero">
          <option value="Ação"></option>
          <option value="RPG"></option>
          <option value="Plataforma"></option>
          <option value="Simulação"></option>
          <option value="Esportes"></option>
          <option value="Tiro"></option>
          <option value="Aventura"></option>
          <option value="Corrida"></option>
          <option value="Luta"></option>
          <option value="Realidade Virtual"></option>
        </datalist>
      </div>

      <button class="botao" type="submit">Salvar Jogo</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formJogo").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const plataforma = document.querySelector("#plataforma").value.trim();
    const genero = document.querySelector("#genero").value.trim();
    const opcoesValidas = Array.from(document.querySelectorAll("#opcoes-plataforma option")).map(opt => opt.value);
    if (!opcoesValidas.includes(plataforma)) {
      alert("Por favor, clique e escolha uma plataforma válida da lista!");
      return;
    }
    const opcoesGenero = Array.from(document.querySelectorAll("#opcoes-genero option")).map(opt => opt.value);
    if (!opcoesGenero.includes(genero)) {
      alert("Por favor, escolha um gênero válido da lista!");
      return;
    }

    jogos.push({
      nome,
      plataforma,
      genero,
      favorito: false
    });

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Jogo adicionado com sucesso ao catálogo!</div>`;

    evento.target.reset();
  });
}

    function mostrarLista() {
  app.innerHTML = `
    <h1>Meus Jogos</h1>
    <p>Lista dos seus títulos cadastrados.</p>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (jogos.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum jogo cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  jogos.forEach((jogo, indice) => {

    const textoEstrela = jogo.favorito ? "★ Favorito" : "☆ Favoritar";
    const classeFav = jogo.favorito ? "favoritar ativo" : "favoritar";

    linhas += `
      <tr>
        <td>${jogo.nome}</td>
        <td>${jogo.plataforma}</td>
        <td>${jogo.genero}</td>
        <td>
          <button class="${classeFav}" data-indice="${indice}">${textoEstrela}</button>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Plataforma</th>
          <th>Gênero</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      jogos.splice(indice, 1);
      renderizarTabela();
    });
  });

  document.querySelectorAll(".favoritar").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      jogos[indice].favorito = !jogos[indice].favorito;
      renderizarTabela();
    });
  });
}

function mostrarSobre() {
  app.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://img.icons8.com/fluency/256/controller.png" alt="Controle de Videogame" style="width: 100px; filter: drop-shadow(0 0 10px #8c7ae6); margin-bottom: 10px;">
      <h1>Sobre o Catálogo</h1>
    </div>
    
    <p>
      Este Catálogo de Jogos foi desenvolvido no formato <strong>Single Page Application (SPA)</strong>, garantindo uma navegação fluida e sem recarregamento de páginas.
    </p>
    
    <p>
      O projeto acadêmico foi criado para colocar em prática os fundamentos de desenvolvimento front-end, a manipulação dinâmica do DOM e a gestão de arrays no curso de Análise e Desenvolvimento de Sistemas da UNINASSAU.
    </p>

    <div style="margin-top: 25px; padding: 15px; background: #2d2d34; border-radius: 6px; border-left: 4px solid #8c7ae6;">
      <h3 style="margin-top: 0; color: #8c7ae6;">Tecnologias Utilizadas</h3>
      <ul style="line-height: 1.8; margin-bottom: 0;">
        <li><strong>HTML5 & CSS3:</strong> Estruturação semântica e estilização com variáveis (Dark Mode).</li>
        <li><strong>JavaScript (Vanilla):</strong> Lógica de validação de formulários com datalist e manipulação do DOM.</li>
        <li><strong>Chart.js:</strong> Renderização gráfica via CDN para estatísticas do acervo.</li>
      </ul>
    </div>
  `;
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

function mostrarEstatisticas() {
  Chart.defaults.color = '#a0a0a8';
  app.innerHTML = `
    <h1>Estatísticas do Acervo</h1>
    <p>Distribuição dos seus jogos por plataforma.</p>
    
    <div style="display: flex; flex-wrap: wrap; justify-content: space-around; margin-top: 30px;">
      <div style="width: 300px; max-width: 100%; margin-bottom: 20px;">
        <h3 style="text-align: center;">Plataformas</h3>
        <canvas id="graficoPlataformas"></canvas>
      </div>
      <div style="width: 300px; max-width: 100%; margin-bottom: 20px;">
        <h3 style="text-align: center;">Gêneros</h3>
        <canvas id="graficoGeneros"></canvas>
      </div>
    </div>
  `;
  let nomesPlataformas = [];
  let quantidadesPlataformas = [];
  let coresPlataformas = [];

  let nomesGeneros = [];
  let quantidadesGeneros = [];
  let coresGeneros = [];

  if (jogos.length === 0) {
    nomesPlataformas = ["Sem dados"];
    quantidadesPlataformas = [1];
    coresPlataformas = ["#4CAF50"];

    nomesGeneros = ["Sem dados"];
    quantidadesGeneros = [1];
    coresGeneros = ["#4CAF50"];

  } else {
    const contagemPlataforma = {};
    const contagemGenero = {};

    jogos.forEach(jogo => {
      if (contagemPlataforma[jogo.plataforma]) {
        contagemPlataforma[jogo.plataforma]++;
      } else {
        contagemPlataforma[jogo.plataforma] = 1;
      }

      if (contagemGenero[jogo.genero]) {
        contagemGenero[jogo.genero]++;
      } else {
        contagemGenero[jogo.genero] = 1;
      }
    });

    nomesPlataformas = Object.keys(contagemPlataforma);
    quantidadesPlataformas = Object.values(contagemPlataforma);
    coresPlataformas = [
      '#003399',
      '#E60012',
      '#107C10', 
      '#333333', 
      '#F4C300', 
      '#9B59B6',
      '#E67E22',
      '#1ABC9C', 
      '#E74C3C', 
      '#34495E', 
      '#2ECC71'  
    ];

    nomesGeneros = Object.keys(contagemGenero);
    quantidadesGeneros = Object.values(contagemGenero);
    coresGeneros = [
      '#FF6384',
      '#36A2EB', 
      '#FFCE56', 
      '#4BC0C0', 
      '#9966FF', 
      '#FF9F40', 
      '#C9CBCF', 
      '#8E44AD', 
      '#27AE60', 
      '#F39C12' 
    ];
}   
    new Chart(document.querySelector("#graficoPlataformas"), {
    type: 'pie',
    data: {
      labels: nomesPlataformas,
      datasets: [{
        label: 'Quantidade',
        data: quantidadesPlataformas,
        backgroundColor: coresPlataformas
      }]
    }
  });

  new Chart(document.querySelector("#graficoGeneros"), {
    type: 'pie',
    data: {
      labels: nomesGeneros,
      datasets: [{
        label: 'Quantidade',
        data: quantidadesGeneros,
        backgroundColor: coresGeneros
      }]
    }
  });
} 

    mostrarInicio();