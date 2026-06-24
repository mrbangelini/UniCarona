(() => {
    'use strict';

    const DADOS_INICIAIS_CARONAS = [
      {
        id: 'c1',
        motorista: 'Lucas Mendes',
        iniciais: 'LM',
        classeAvatar: 'avatar--laranja',
        avaliacao: 4.9,
        origem: 'Asa Norte, SQN 210',
        destino: 'Campus Universitário',
        horario: '18:15',
        periodo: 'noite',
        vagas: 2,
        valor: 8,
        veiculo: 'Honda Civic · Prata',
        dataExibicao: 'Hoje',
        observacao: 'Posso esperar até 10 minutos. Ar-condicionado e música baixa.',
        confirmacaoImediata: true,
        preferencias: ['confirmacao-imediata']
      },
      {
        id: 'c2',
        motorista: 'Camila Souza',
        iniciais: 'CS',
        classeAvatar: 'avatar--roxo',
        avaliacao: 5,
        origem: 'Águas Claras',
        destino: 'Campus Universitário',
        horario: '17:40',
        periodo: 'tarde',
        vagas: 1,
        valor: 7,
        veiculo: 'Onix · Azul',
        dataExibicao: 'Hoje',
        observacao: 'Saída perto da estação Águas Claras. Aceito mochila e bagagem pequena.',
        confirmacaoImediata: true,
        preferencias: [
          'confirmacao-imediata',
          'aceita-bagagem',
          'apenas-mulheres'
        ]
      },
      {
        id: 'c3',
        motorista: 'Rafael Barbosa',
        iniciais: 'RB',
        classeAvatar: 'avatar--verde',
        avaliacao: 4.8,
        origem: 'Sudoeste',
        destino: 'Campus Universitário',
        horario: '18:30',
        periodo: 'noite',
        vagas: 3,
        valor: 6,
        veiculo: 'Renault Kwid · Branco',
        dataExibicao: 'Hoje',
        observacao: 'Trajeto direto pela EPTG. Conversa moderada e sem cigarro.',
        confirmacaoImediata: false,
        preferencias: ['aceita-bagagem']
      },
      {
        id: 'c4',
        motorista: 'Mariana Alves',
        iniciais: 'MA',
        classeAvatar: 'avatar--roxo',
        avaliacao: 4.9,
        origem: 'Taguatinga Centro',
        destino: 'Campus Universitário',
        horario: '07:10',
        periodo: 'manha',
        vagas: 2,
        valor: 9,
        veiculo: 'Hyundai HB20 · Cinza',
        dataExibicao: 'Amanhã',
        observacao: 'Posso passar perto da estação do metrô. Pontualidade é importante.',
        confirmacaoImediata: true,
        preferencias: ['confirmacao-imediata', 'apenas-mulheres']
      },
      {
        id: 'c5',
        motorista: 'Pedro Henrique',
        iniciais: 'PH',
        classeAvatar: 'avatar--laranja',
        avaliacao: 4.7,
        origem: 'Guará II',
        destino: 'Campus Universitário',
        horario: '13:20',
        periodo: 'tarde',
        vagas: 1,
        valor: 7.5,
        veiculo: 'Fiat Argo · Preto',
        dataExibicao: 'Hoje',
        observacao: 'Saída próxima ao ParkShopping. Levo apenas bagagem pequena.',
        confirmacaoImediata: false,
        preferencias: ['aceita-bagagem']
      },
      {
        id: 'c6',
        motorista: 'Beatriz Lima',
        iniciais: 'BL',
        classeAvatar: 'avatar--roxo',
        avaliacao: 5,
        origem: 'Plano Piloto, 408 Sul',
        destino: 'Campus Universitário',
        horario: '19:05',
        periodo: 'noite',
        vagas: 2,
        valor: 5,
        veiculo: 'Nissan Versa · Branco',
        dataExibicao: 'Hoje',
        observacao: 'Posso buscar em pontos próximos da W3 Sul.',
        confirmacaoImediata: true,
        preferencias: ['confirmacao-imediata', 'apenas-mulheres']
      },
      {
        id: 'c7',
        motorista: 'Guilherme Rocha',
        iniciais: 'GR',
        classeAvatar: 'avatar--verde',
        avaliacao: 4.8,
        origem: 'Lago Norte',
        destino: 'Campus Universitário',
        horario: '08:00',
        periodo: 'manha',
        vagas: 3,
        valor: 10,
        veiculo: 'Jeep Renegade · Grafite',
        dataExibicao: 'Amanhã',
        observacao: 'Espaço no porta-malas e rota pela L4.',
        confirmacaoImediata: true,
        preferencias: ['confirmacao-imediata', 'aceita-bagagem']
      },
      {
        id: 'c8',
        motorista: 'Ana Clara',
        iniciais: 'AC',
        classeAvatar: 'avatar--laranja',
        avaliacao: 4.9,
        origem: 'Samambaia Sul',
        destino: 'Campus Universitário',
        horario: '06:45',
        periodo: 'manha',
        vagas: 1,
        valor: 11,
        veiculo: 'Volkswagen Polo · Azul',
        dataExibicao: 'Amanhã',
        observacao: 'Passo próximo à estação Furnas.',
        confirmacaoImediata: false,
        preferencias: ['apenas-mulheres']
      }
    ];

    const TITULOS_PAGINAS = {
      inicio: 'Visão geral',
      explorar: 'Encontrar carona',
      publicar: 'Oferecer carona',
      'minhas-caronas': 'Minhas caronas',
      perfil: 'Meu perfil',
      detalhes: 'Detalhes da carona'
    };

    const ESTADO = {
      paginaAtiva: 'inicio',
      usuario: null,
      abaAtiva: 'proximas',
      idCaronaSelecionada: 'c1',
      ordenarCrescente: true,
      entradaAppEmAndamento: false,
      caronas: [...DADOS_INICIAIS_CARONAS],
      filtros: {
        texto: '',
        periodo: 'todos',
        preferencias: new Set()
      }
    };

    const ELEMENTOS = {};

    const API = {
      get token() {
        return localStorage.getItem('unicarona_token');
      },
      definirToken(token) {
        if (token) {
          localStorage.setItem('unicarona_token', token);
          return;
        }

        localStorage.removeItem('unicarona_token');
      },
      async chamar(caminho, opcoes = {}) {
        const cabecalhos = {
          'Content-Type': 'application/json',
          ...(opcoes.headers || {})
        };

        if (this.token) {
          cabecalhos.Authorization = `Bearer ${this.token}`;
        }

        const resposta = await fetch(caminho, {
          ...opcoes,
          headers: cabecalhos
        });

        const dados = await resposta.json().catch(() => ({}));

        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível concluir a ação.');
        }

        return dados;
      }
    };

    const GUIAS_MODO_PILOTO = {
      login: [
        {
          alvo: '.cartao-login',
          titulo: 'Seu ponto de partida',
          texto:
            'Aqui o estudante acessa a plataforma com o e-mail acadêmico. Nesta demonstração, o formulário é apenas visual.'
        },
        {
          alvo: '#botaoDemonstracao',
          titulo: 'Entre sem burocracia',
          texto:
            'Este botão abre a versão navegável do protótipo para que a banca veja os fluxos principais do UniCaronas.'
        },
        {
          alvo: '#botaoApresentacao',
          titulo: 'Apresente como uma história',
          texto:
            'Para uma apresentação mais impactante, abra esta experiência cinematográfica narrada pelo Nico, o copiloto do UniCaronas.'
        }
      ],
      inicio: [
        {
          alvo: '.hero-inicio',
          titulo: 'O ponto de partida da jornada',
          texto:
            'A tela inicial recebe o estudante com contexto, uma ação principal e o atalho para oferecer uma nova carona.'
        },
        {
          alvo: '.cartao-proxima-carona',
          titulo: 'Tudo importante, em um olhar',
          texto:
            'A próxima carona confirmada aparece com rota, horário, motorista e acesso rápido aos detalhes.'
        },
        {
          alvo: '#listaCaronasInicio',
          titulo: 'Sugestões com relevância',
          texto:
            'O aplicativo destaca caronas que combinam com a rotina do estudante e incentiva uma descoberta simples.'
        }
      ],
      explorar: [
        {
          alvo: '.painel-busca',
          titulo: 'Encontre a rota certa',
          texto:
            'A pesquisa permite localizar caronas por origem, destino ou nome do motorista, mantendo a experiência direta.'
        },
        {
          alvo: '#botaoFiltros',
          titulo: 'A escolha fica nas mãos do estudante',
          texto:
            'O botão abre filtros para encontrar horários e preferências compatíveis, como confirmação imediata ou bagagem.'
        },
        {
          alvo: '#listaCaronasExplorar',
          titulo: 'Decisão com transparência',
          texto:
            'Cada opção mostra motorista, avaliação, rota, horário, vagas e contribuição de combustível antes da solicitação.'
        }
      ],
      publicar: [
        {
          alvo: '.cartao-publicacao',
          titulo: 'Compartilhar uma carona é simples',
          texto:
            'O motorista descreve o trajeto, o horário, as vagas e a contribuição. O formulário prioriza apenas o essencial.'
        },
        {
          alvo: '.painel-preview',
          titulo: 'Confiança antes de publicar',
          texto:
            'A pré-visualização mostra exatamente como a carona será apresentada para os outros estudantes.'
        }
      ],
      'minhas-caronas': [
        {
          alvo: '.resumo-caronas',
          titulo: 'A jornada também gera impacto',
          texto:
            'O estudante acompanha caronas concluídas, reputação e impacto ambiental de forma leve e motivadora.'
        },
        {
          alvo: '.abas',
          titulo: 'Organização sem esforço',
          texto:
            'As abas separam trajetos próximos, caronas oferecidas e histórico, deixando a rotina sempre clara.'
        }
      ],
      perfil: [
        {
          alvo: '.cartao-perfil',
          titulo: 'Confiança começa pelo perfil',
          texto:
            'A reputação, as avaliações e a validação do perfil ajudam a construir uma comunidade mais segura.'
        },
        {
          alvo: '.coluna-perfil',
          titulo: 'Preferências que respeitam a viagem',
          texto:
            'Informações pessoais e preferências de convivência tornam cada trajeto mais confortável para todos.'
        }
      ],
      detalhes: [
        {
          alvo: '.cartao-detalhes',
          titulo: 'Toda a rota, sem surpresas',
          texto:
            'Antes de solicitar uma vaga, o estudante vê origem, destino, horário, veículo, vagas e observações.'
        },
        {
          alvo: '.cartao-solicitacao',
          titulo: 'Uma decisão segura e objetiva',
          texto:
            'A solicitação deixa claro o valor da contribuição e oferece uma ação direta para entrar em contato.'
        }
      ]
    };

    const CENAS_APRESENTACAO = [
      {
        fala:
          'Oi! Eu sou o Nico. Vamos mostrar como uma ideia simples pode deixar a rotina universitária muito mais conectada.'
      },
      {
        fala:
          'Primeiro, o estudante encontra pessoas que já seguem uma rota parecida com a dele. Sem complicação.'
      },
      {
        fala:
          'Quando a comunidade compartilha trajetos, todo mundo ganha: tempo, economia, segurança e impacto positivo.'
      },
      {
        fala:
          'Agora é com você. Entre na demonstração e veja como essa jornada continua dentro do UniCaronas.'
      }
    ];

    const AUDIO = {
      contexto: null,
      intervaloTrilha: null,
      osciladoresAmbiente: []
    };

    const CATALOGO_CONQUISTAS = [
      {
        id: 'boas-vindas',
        icone: '✦',
        titulo: 'Primeiro passo',
        descricao: 'Você iniciou sua jornada no UniCaronas.',
        ranque: 'ferro'
      },
      {
        id: 'perfil-completo',
        icone: '◉',
        titulo: 'Identidade verificada',
        descricao: 'Você conheceu a área de perfil e suas conexões.',
        ranque: 'ferro'
      },
      {
        id: 'explorador',
        icone: '⌕',
        titulo: 'Explorador de rotas',
        descricao: 'Você conheceu as caronas disponíveis.',
        ranque: 'bronze'
      },
      {
        id: 'amigo-de-rota',
        icone: '◎',
        titulo: 'Amigo de rota',
        descricao: 'Você entrou na rede e encontrou colegas próximos.',
        ranque: 'bronze'
      },
      {
        id: 'piloto',
        icone: '✦',
        titulo: 'Piloto de bordo',
        descricao: 'Você concluiu um guia contextual do aplicativo.',
        ranque: 'bronze'
      },
      {
        id: 'motorista',
        icone: '🚙',
        titulo: 'Motorista por um dia',
        descricao: 'Você publicou uma carona para a comunidade.',
        ranque: 'prata'
      },
      {
        id: 'conector',
        icone: '⌁',
        titulo: 'Conector de caminhos',
        descricao: 'Você convidou colegas para a comunidade.',
        ranque: 'prata'
      },
      {
        id: 'comunidade',
        icone: '♻',
        titulo: 'Comunidade em movimento',
        descricao: 'Você explorou o impacto coletivo da plataforma.',
        ranque: 'prata'
      },
      {
        id: 'cinema',
        icone: '◈',
        titulo: 'Estreia de cinema',
        descricao: 'Você concluiu a apresentação narrada pelo Nico.',
        ranque: 'ouro'
      },
      {
        id: 'pontualidade',
        icone: '◷',
        titulo: 'No tempo certo',
        descricao: 'Conclua cinco caronas com pontualidade.',
        ranque: 'ouro'
      },
      {
        id: 'confiante',
        icone: '★',
        titulo: 'Confiança que conecta',
        descricao: 'Alcance 4,9 de avaliação média em dez caronas.',
        ranque: 'ouro'
      },
      {
        id: 'mentor',
        icone: '✦',
        titulo: 'Mentor da comunidade',
        descricao: 'Ajude dez novos estudantes a conhecer o app.',
        ranque: 'platina'
      },
      {
        id: 'impacto',
        icone: '♻',
        titulo: 'Impacto real',
        descricao: 'Evite 100 kg de CO₂ em trajetos compartilhados.',
        ranque: 'platina'
      },
      {
        id: 'lenda',
        icone: '♦',
        titulo: 'Lenda do caminho',
        descricao: 'Conclua 100 caronas na comunidade universitária.',
        ranque: 'diamante'
      },
      {
        id: 'diamante-social',
        icone: '✧',
        titulo: 'Rede Diamante',
        descricao: 'Forme uma rede com 50 amigos de rota.',
        ranque: 'diamante'
      }
    ];

    const RANQUES_CONQUISTAS = [
      {
        id: 'ferro',
        nome: 'Ferro',
        minimo: 0,
        classe: 'ranque--ferro'
      },
      {
        id: 'bronze',
        nome: 'Bronze',
        minimo: 3,
        classe: 'ranque--bronze'
      },
      {
        id: 'prata',
        nome: 'Prata',
        minimo: 6,
        classe: 'ranque--prata'
      },
      {
        id: 'ouro',
        nome: 'Ouro',
        minimo: 9,
        classe: 'ranque--ouro'
      },
      {
        id: 'platina',
        nome: 'Platina',
        minimo: 12,
        classe: 'ranque--platina'
      },
      {
        id: 'diamante',
        nome: 'Diamante',
        minimo: 15,
        classe: 'ranque--diamante'
      }
    ];

    const DADOS_REDE = {
      amigos: [
        {
          nome: 'Lucas Mendes',
          iniciais: 'LM',
          classeAvatar: 'avatar--laranja',
          descricao: 'Vai para o Campus às 18:15',
          online: true
        },
        {
          nome: 'Camila Souza',
          iniciais: 'CS',
          classeAvatar: 'avatar--roxo',
          descricao: 'Disponível para carona hoje',
          online: true
        },
        {
          nome: 'Rafael Barbosa',
          iniciais: 'RB',
          classeAvatar: 'avatar--verde',
          descricao: 'Em aula · responde mais tarde',
          online: false
        }
      ],
      atividades: [
        {
          icone: '🚙',
          classe: '',
          titulo: 'Lucas ofereceu uma carona',
          texto: 'Asa Norte → Campus Universitário às 18:15.',
          tempo: 'Agora'
        },
        {
          icone: '✦',
          classe: 'atividade-rede__icone--verde',
          titulo: 'Camila concluiu uma carona',
          texto: 'Ela economizou R$ 7,00 dividindo o trajeto.',
          tempo: '20 min'
        },
        {
          icone: '◎',
          classe: '',
          titulo: 'Rafael entrou na sua rede',
          texto: 'Vocês têm 2 rotas frequentes em comum.',
          tempo: 'Ontem'
        }
      ]
    };

    

    function selecionar(seletor, contexto = document) {
      return contexto.querySelector(seletor);
    }

    function selecionarTodos(seletor, contexto = document) {
      return [...contexto.querySelectorAll(seletor)];
    }

    function escaparHtml(valor) {
      return String(valor ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function formatarMoeda(valor) {
      return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      });
    }

    function formatarAvaliacao(valor) {
      return Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    }

    function formatarVagas(quantidade) {
      return `${quantidade} ${quantidade === 1 ? 'vaga' : 'vagas'}`;
    }

    function obterPeriodoPorHorario(horario) {
      const hora = Number(String(horario).slice(0, 2));

      if (hora < 12) return 'manha';
      if (hora < 18) return 'tarde';

      return 'noite';
    }

    function obterDataAtualParaInput() {
      const data = new Date();
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');

      return `${ano}-${mes}-${dia}`;
    }

    function encontrarCaronaPorId(idCarona) {
      return ESTADO.caronas.find((carona) => carona.id === idCarona);
    }

    function exibirToast(titulo, mensagem, tipo = 'informacao') {
      const toast = document.createElement('article');
      const icone = tipo === 'sucesso' ? '✓' : 'i';

      toast.className = `toast ${tipo === 'sucesso' ? 'toast--sucesso' : ''}`;
      toast.innerHTML = `
        <span class="toast__icone">${icone}</span>
        <div>
          <strong>${escaparHtml(titulo)}</strong>
          <p>${escaparHtml(mensagem)}</p>
        </div>
      `;

      ELEMENTOS.areaToasts.appendChild(toast);

      window.setTimeout(() => {
        toast.classList.add('toast--saindo');

        window.setTimeout(() => toast.remove(), 350);
      }, 3600);
    }

    

    function criarCartaoCarona(carona) {
      return `
        <article class="cartao-carona">
          <div class="cartao-carona__topo">
            <span class="selo-horario">${escaparHtml(carona.horario)}</span>
            <span class="selo-horario selo-vagas">${formatarVagas(carona.vagas)}</span>
          </div>

          <div class="motorista-carona">
            <span class="avatar ${escaparHtml(carona.classeAvatar)}">
              ${escaparHtml(carona.iniciais)}
            </span>

            <div>
              <strong>${escaparHtml(carona.motorista)}</strong>
              <small>
                <span class="estrelas">★</span>
                ${formatarAvaliacao(carona.avaliacao)} ·
                ${escaparHtml(carona.veiculo.split(' · ')[0])}
              </small>
            </div>
          </div>

          <div class="rota-mini">
            <div>
              <i></i>
              <small>ORIGEM</small>
              <strong title="${escaparHtml(carona.origem)}">
                ${escaparHtml(carona.origem)}
              </strong>
            </div>

            <div>
              <i></i>
              <small>DESTINO</small>
              <strong title="${escaparHtml(carona.destino)}">
                ${escaparHtml(carona.destino)}
              </strong>
            </div>
          </div>

          <footer class="cartao-carona__rodape">
            <span class="custo-carona">
              <small>Ajuda de combustível</small>
              ${formatarMoeda(carona.valor)}
            </span>

            <button
              class="link-carona"
              type="button"
              data-acao="ver-detalhes"
              data-id-carona="${escaparHtml(carona.id)}"
            >
              Ver detalhes
            </button>
          </footer>
        </article>
      `;
    }

    function criarLinhaCarona(carona) {
      const mensagemDisponibilidade = carona.confirmacaoImediata
        ? '✓ confirmação imediata'
        : `${formatarVagas(carona.vagas)} disponíveis`;

      return `
        <article class="linha-carona">
          <div class="linha-carona__motorista">
            <span class="avatar ${escaparHtml(carona.classeAvatar)}">
              ${escaparHtml(carona.iniciais)}
            </span>

            <div>
              <strong>${escaparHtml(carona.motorista)}</strong>
              <small>
                <span class="estrelas">★</span>
                ${formatarAvaliacao(carona.avaliacao)} ·
                ${escaparHtml(carona.veiculo)}
              </small>
            </div>
          </div>

          <div class="linha-carona__rota">
            <div>
              <small>ORIGEM</small>
              <strong title="${escaparHtml(carona.origem)}">
                ${escaparHtml(carona.origem)}
              </strong>
            </div>

            <span class="linha-carona__seta">→</span>

            <div>
              <small>DESTINO</small>
              <strong title="${escaparHtml(carona.destino)}">
                ${escaparHtml(carona.destino)}
              </strong>
            </div>
          </div>

          <div class="linha-carona__horario">
            ${escaparHtml(carona.horario)}
            <small>${escaparHtml(carona.dataExibicao)}</small>
          </div>

          <div class="linha-carona__acao">
            <span>${mensagemDisponibilidade}</span>

            <button
              class="botao botao--contorno"
              type="button"
              data-acao="ver-detalhes"
              data-id-carona="${escaparHtml(carona.id)}"
            >
              Ver carona
            </button>
          </div>
        </article>
      `;
    }

    function criarDetalhesCarona(carona) {
      return `
        <div class="layout-detalhes">
          <section class="cartao-detalhes">
            <header class="cabecalho-detalhes">
              <div class="motorista-detalhes">
                <span class="avatar ${escaparHtml(carona.classeAvatar)}">
                  ${escaparHtml(carona.iniciais)}
                </span>

                <div>
                  <strong>${escaparHtml(carona.motorista)}</strong>
                  <small>
                    Motorista verificado · ${escaparHtml(carona.veiculo)}
                  </small>
                </div>
              </div>

              <span class="avaliacao-detalhes">
                ★ ${formatarAvaliacao(carona.avaliacao)}
                <span>(28 avaliações)</span>
              </span>
            </header>

            <div class="rota-detalhes">
              <div>
                <i></i>
                <small>
                  PARTIDA · ${escaparHtml(carona.dataExibicao.toUpperCase())}
                  ÀS ${escaparHtml(carona.horario)}
                </small>
                <strong>${escaparHtml(carona.origem)}</strong>
                <span>
                  Local de encontro definido pelo motorista após confirmação.
                </span>
              </div>

              <div>
                <i></i>
                <small>DESTINO</small>
                <strong>${escaparHtml(carona.destino)}</strong>
                <span>
                  Chegada prevista em aproximadamente 35 minutos.
                </span>
              </div>
            </div>

            <div class="grade-informacoes-detalhes">
              <div>
                <small>VAGAS</small>
                <strong>${formatarVagas(carona.vagas)}</strong>
              </div>

              <div>
                <small>AJUDA</small>
                <strong>${formatarMoeda(carona.valor)}</strong>
              </div>

              <div>
                <small>CARRO</small>
                <strong>${escaparHtml(carona.veiculo)}</strong>
              </div>
            </div>

            <div class="observacao-detalhes">
              <span>✦</span>
              <div>
                <strong>Observação do motorista</strong><br>
                ${escaparHtml(carona.observacao)}
              </div>
            </div>
          </section>

          <aside class="cartao-solicitacao">
            <h2>Gostou do trajeto?</h2>
            <p>
              Envie uma solicitação. O motorista será avisado e você receberá
              a confirmação aqui no UniCaronas.
            </p>

            <div class="resumo-solicitacao">
              <span>Ajuda de combustível</span>
              <strong>${formatarMoeda(carona.valor)}</strong>
            </div>

            <button
              id="botaoSolicitarVaga"
              class="botao botao--primario"
              type="button"
              data-acao="solicitar-vaga"
              data-id-carona="${escaparHtml(carona.id)}"
            >
              Solicitar uma vaga
              <span aria-hidden="true">→</span>
            </button>

            <button
              class="botao botao--suave"
              type="button"
              data-acao="enviar-mensagem"
            >
              Enviar mensagem
            </button>

            <p class="texto-seguranca">
              <span>✓</span>
              Perfis, avaliações e rotas ajudam você a fazer escolhas mais
              seguras.
            </p>
          </aside>
        </div>
      `;
    }

    function criarLinhaMinhaCarona(item) {
      return `
        <article class="linha-minha-carona">
          <div class="data-carona">
            <strong>${escaparHtml(item.dia)}</strong>
            <small>${escaparHtml(item.mes)}</small>
          </div>

          <div class="linha-minha-carona__conteudo">
            <strong>${escaparHtml(item.titulo)}</strong>
            <p>${escaparHtml(item.subtitulo)}</p>

            <div class="linha-minha-carona__meta">
              <span><b>◷</b> ${escaparHtml(item.informacao)}</span>
              <span><b>⌖</b> Trajeto universitário</span>
            </div>
          </div>

          <div class="linha-minha-carona__status">
            <span class="${escaparHtml(item.classeStatus)}">
              ${escaparHtml(item.status)}
            </span>
            <small>${escaparHtml(item.observacaoData)}</small>
          </div>
        </article>
      `;
    }

    function criarItemAmigo(amigo) {
      const indicadorOnline = amigo.online
        ? '<span class="amigo-rede__status" title="Online"></span>'
        : '<span class="amigo-rede__status amigo-rede__status--ausente" title="Ausente"></span>';

      return `
        <article class="amigo-rede">
          <span class="avatar ${escaparHtml(amigo.classeAvatar)}">
            ${escaparHtml(amigo.iniciais)}
          </span>

          <div class="amigo-rede__texto">
            <strong>${escaparHtml(amigo.nome)}</strong>
            <small>${escaparHtml(amigo.descricao)}</small>
          </div>

          ${indicadorOnline}
        </article>
      `;
    }

    function criarItemAtividadeRede(atividade) {
      return `
        <article class="atividade-rede">
          <span class="atividade-rede__icone ${escaparHtml(atividade.classe)}">
            ${escaparHtml(atividade.icone)}
          </span>

          <div class="atividade-rede__texto">
            <strong>${escaparHtml(atividade.titulo)}</strong>
            <p>${escaparHtml(atividade.texto)}</p>
          </div>

          <small>${escaparHtml(atividade.tempo)}</small>
        </article>
      `;
    }

    function renderizarCaronasInicio() {
      ELEMENTOS.listaCaronasInicio.innerHTML = ESTADO.caronas
        .slice(0, 3)
        .map(criarCartaoCarona)
        .join('');
    }

    function caronaAtendeFiltros(carona) {
      const texto = ESTADO.filtros.texto.trim().toLowerCase();
      const indicePesquisa = [
        carona.motorista,
        carona.origem,
        carona.destino,
        carona.veiculo
      ]
        .join(' ')
        .toLowerCase();

      if (texto && !indicePesquisa.includes(texto)) {
        return false;
      }

      if (
        ESTADO.filtros.periodo !== 'todos' &&
        carona.periodo !== ESTADO.filtros.periodo
      ) {
        return false;
      }

      for (const preferencia of ESTADO.filtros.preferencias) {
        if (!carona.preferencias.includes(preferencia)) {
          return false;
        }
      }

      return true;
    }

    function obterCaronasFiltradas() {
      const caronasFiltradas = ESTADO.caronas.filter(caronaAtendeFiltros);

      return [...caronasFiltradas].sort((primeira, segunda) => {
        const comparacao = primeira.horario.localeCompare(segunda.horario);

        return ESTADO.ordenarCrescente ? comparacao : -comparacao;
      });
    }

    function renderizarCaronasExplorar() {
      const caronas = obterCaronasFiltradas();

      ELEMENTOS.quantidadeResultados.textContent = caronas.length;
      ELEMENTOS.contadorMenuCaronas.textContent = ESTADO.caronas.length;

      if (!caronas.length) {
        ELEMENTOS.listaCaronasExplorar.innerHTML = `
          <div class="estado-vazio">
            <strong>Nenhuma carona encontrada</strong>
            <p>Tente remover alguns filtros ou buscar outra rota.</p>
          </div>
        `;

        return;
      }

      ELEMENTOS.listaCaronasExplorar.innerHTML = caronas
        .map(criarLinhaCarona)
        .join('');
    }

    function renderizarContadorFiltros() {
      const quantidadeFiltrosAtivos =
        (ESTADO.filtros.periodo !== 'todos' ? 1 : 0) +
        ESTADO.filtros.preferencias.size;

      ELEMENTOS.contadorFiltros.textContent = quantidadeFiltrosAtivos;
      ELEMENTOS.contadorFiltros.classList.toggle(
        'botao-filtros__contador--visivel',
        quantidadeFiltrosAtivos > 0
      );
    }

    function renderizarPreviewPublicacao() {
      const origem =
        ELEMENTOS.entradaOrigem.value.trim() || 'Seu ponto de partida';

      const destino =
        ELEMENTOS.entradaDestino.value.trim() || 'Campus Universitário';

      const horario = ELEMENTOS.entradaHorario.value || '18:00';
      const vagas = Number(ELEMENTOS.entradaVagas.value || 2);
      const valor = Number(ELEMENTOS.entradaValor.value || 0);

      ELEMENTOS.previewPublicacao.innerHTML = `
        <div class="preview-carona__pessoa">
          <span class="preview-carona__avatar">DV</span>
          <div>
            <strong>Davi Vidal</strong>
            <small>Você será o motorista</small>
          </div>
        </div>

        <div class="preview-carona__rota">
          <div>
            <i></i>
            <small>PARTIDA · ${escaparHtml(horario)}</small>
            <strong>${escaparHtml(origem)}</strong>
          </div>

          <div>
            <i></i>
            <small>DESTINO</small>
            <strong>${escaparHtml(destino)}</strong>
          </div>
        </div>

        <footer class="preview-carona__rodape">
          <strong>${formatarMoeda(valor)}</strong>
          <span>${formatarVagas(vagas)}</span>
        </footer>
      `;
    }

    function obterDadosMinhasCaronas() {
      return {
        proximas: [
          {
            dia: '24',
            mes: 'JUN',
            titulo: 'Asa Norte → Campus Universitário',
            subtitulo: 'Com Lucas Mendes',
            informacao: '18:15 · 2 vagas',
            status: 'Confirmada',
            classeStatus: 'status-confirmada',
            observacaoData: 'Hoje'
          },
          {
            dia: '25',
            mes: 'JUN',
            titulo: 'Campus Universitário → Asa Norte',
            subtitulo: 'Você é motorista',
            informacao: '21:40 · 2 passageiros',
            status: 'Oferecida',
            classeStatus: 'status-oferecida',
            observacaoData: 'Amanhã'
          }
        ],
        oferecidas: [
          {
            dia: '25',
            mes: 'JUN',
            titulo: 'Campus Universitário → Asa Norte',
            subtitulo: 'Você é motorista',
            informacao: '21:40 · 2 passageiros',
            status: 'Oferecida',
            classeStatus: 'status-oferecida',
            observacaoData: 'Amanhã'
          }
        ],
        historico: [
          {
            dia: '18',
            mes: 'JUN',
            titulo: 'Águas Claras → Campus Universitário',
            subtitulo: 'Com Camila Souza',
            informacao: '17:40 · R$ 7,00',
            status: 'Concluída',
            classeStatus: 'status-concluida',
            observacaoData: 'Há 6 dias'
          },
          {
            dia: '11',
            mes: 'JUN',
            titulo: 'Campus Universitário → Sudoeste',
            subtitulo: 'Com Rafael Barbosa',
            informacao: '20:20 · R$ 6,00',
            status: 'Concluída',
            classeStatus: 'status-concluida',
            observacaoData: 'Há 13 dias'
          },
          {
            dia: '03',
            mes: 'JUN',
            titulo: 'Asa Norte → Campus Universitário',
            subtitulo: 'Você é motorista',
            informacao: '07:30 · 3 passageiros',
            status: 'Concluída',
            classeStatus: 'status-concluida',
            observacaoData: 'Há 21 dias'
          }
        ]
      };
    }

    function renderizarMinhasCaronas() {
      const dados = obterDadosMinhasCaronas();
      const itens = dados[ESTADO.abaAtiva] || [];

      ELEMENTOS.listaMinhasCaronas.innerHTML = itens
        .map(criarLinhaMinhaCarona)
        .join('');
    }

    function renderizarDetalhesCarona(idCarona) {
      const carona = encontrarCaronaPorId(idCarona);

      if (!carona) {
        ELEMENTOS.conteudoDetalhes.innerHTML = `
          <div class="estado-vazio">
            <strong>Carona não encontrada</strong>
            <p>Volte para a lista e escolha outra carona.</p>
          </div>
        `;

        return;
      }

      ESTADO.idCaronaSelecionada = carona.id;
      ELEMENTOS.conteudoDetalhes.innerHTML = criarDetalhesCarona(carona);
    }

    function renderizarRede() {
      if (!ELEMENTOS.listaAmigos || !ELEMENTOS.listaAtividadesAmigos) {
        return;
      }

      ELEMENTOS.listaAmigos.innerHTML = DADOS_REDE.amigos
        .map(criarItemAmigo)
        .join('');

      ELEMENTOS.listaAtividadesAmigos.innerHTML = DADOS_REDE.atividades
        .map(criarItemAtividadeRede)
        .join('');

      if (ELEMENTOS.contadorAmigos) {
        ELEMENTOS.contadorAmigos.textContent = DADOS_REDE.amigos.length;
      }
    }

    function renderizarAplicacao() {
      renderizarCaronasInicio();
      renderizarCaronasExplorar();
      renderizarContadorFiltros();
      renderizarPreviewPublicacao();
      renderizarMinhasCaronas();
      renderizarRede();
    }

    

    function atualizarMenuAtivo(pagina) {
      const paginaMenu = pagina === 'detalhes' ? 'explorar' : pagina;

      selecionarTodos('.item-menu[data-pagina]').forEach((botao) => {
        botao.classList.toggle(
          'item-menu--ativo',
          botao.dataset.pagina === paginaMenu
        );
      });
    }

    function navegarPara(paginaDestino) {
      const paginaAtual = selecionar(
        `[data-identificador-pagina="${ESTADO.paginaAtiva}"]`
      );

      const proximaPagina = selecionar(
        `[data-identificador-pagina="${paginaDestino}"]`
      );

      if (!proximaPagina || ESTADO.paginaAtiva === paginaDestino) {
        return;
      }

      if (ESTADO.piloto?.ativo) {
        finalizarModoPiloto();
      }

      if (paginaDestino === 'explorar') {
        renderizarCaronasExplorar();
        desbloquearConquista('explorador');
      }

      if (paginaDestino === 'perfil') {
        desbloquearConquista('perfil-completo');
      }

      if (paginaDestino === 'amigos') {
        renderizarRede();
        desbloquearConquista('amigo-de-rota');
      }

      if (paginaDestino === 'detalhes') {
        renderizarDetalhesCarona(ESTADO.idCaronaSelecionada);
      }

      paginaAtual.classList.add('pagina--fragmentando');

      executarTransicaoRota(() => {
        paginaAtual.classList.remove('pagina--ativa', 'pagina--fragmentando');
        proximaPagina.classList.add('pagina--ativa', 'pagina--reconstruindo');

        ESTADO.paginaAtiva = paginaDestino;
        ELEMENTOS.tituloNavegacao.textContent =
          TITULOS_PAGINAS[paginaDestino];

        atualizarMenuAtivo(paginaDestino);
        ELEMENTOS.barraLateral.classList.remove('barra-lateral--aberta');

        window.setTimeout(() => {
          proximaPagina.classList.remove('pagina--reconstruindo');
        }, 560);

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    function abrirDetalhesCarona(idCarona) {
      ESTADO.idCaronaSelecionada = idCarona;
      navegarPara('detalhes');
    }

    function atualizarFiltroPeriodo(botao) {
      selecionarTodos('[data-filtro-periodo]').forEach((item) => {
        item.classList.remove('chip-filtro--ativo');
      });

      botao.classList.add('chip-filtro--ativo');
      ESTADO.filtros.periodo = botao.dataset.filtroPeriodo;

      renderizarContadorFiltros();
      renderizarCaronasExplorar();
    }

    function atualizarFiltroPreferencia(botao) {
      const preferencia = botao.dataset.filtroPreferencia;

      botao.classList.toggle('chip-filtro--ativo');

      if (botao.classList.contains('chip-filtro--ativo')) {
        ESTADO.filtros.preferencias.add(preferencia);
      } else {
        ESTADO.filtros.preferencias.delete(preferencia);
      }

      renderizarContadorFiltros();
      renderizarCaronasExplorar();
    }

    function alternarOrdenacao() {
      ESTADO.ordenarCrescente = !ESTADO.ordenarCrescente;

      selecionar('#botaoOrdenar b').textContent = ESTADO.ordenarCrescente
        ? 'horário'
        : 'horário inverso';

      renderizarCaronasExplorar();
    }

    function atualizarPreviewAoDigitar() {
      renderizarPreviewPublicacao();
    }

    async function carregarCaronasDoBackend() {
      try {
        const resposta = await API.chamar('/api/rides');
        ESTADO.caronas = resposta.rides;
        return true;
      } catch (erro) {
        console.warn('Servidor local indisponível. Usando dados iniciais.', erro);
        return false;
      }
    }

    async function autenticarUsuario(email, senha, modoDemo = false) {
      const resposta = await API.chamar('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });

      API.definirToken(resposta.token);
      ESTADO.usuario = resposta.user;

      await carregarCaronasDoBackend();
      renderizarAplicacao();
      abrirAplicacao();

      exibirToast(
        modoDemo ? 'Demonstração conectada' : 'Login realizado',
        `${resposta.user.name} entrou com autenticação local.`,
        'sucesso'
      );
    }

    async function entrarComoDemo() {
      try {
        await autenticarUsuario('marcelo.rbangelini@sempreceub.com', '123456', true);
      } catch (erro) {
        exibirToast('Não foi possível entrar', erro.message);
      }
    }

    async function publicarCarona(evento) {
      evento.preventDefault();

      const origem = ELEMENTOS.entradaOrigem.value.trim();
      const destino = ELEMENTOS.entradaDestino.value.trim();
      const horario = ELEMENTOS.entradaHorario.value;

      if (!origem || !destino || !horario) {
        exibirToast(
          'Faltam informações',
          'Informe origem, destino e horário antes de publicar.'
        );

        return;
      }

      const dadosCarona = {
        origem,
        destino,
        horario,
        periodo: obterPeriodoPorHorario(horario),
        vagas: Number(ELEMENTOS.entradaVagas.value),
        valor: Number(ELEMENTOS.entradaValor.value || 0),
        observacao:
          ELEMENTOS.entradaObservacao.value.trim() ||
          'Sem observações adicionais.',
        confirmacaoImediata:
          ELEMENTOS.entradaConfirmacaoImediata.checked,
        preferencias: ELEMENTOS.entradaConfirmacaoImediata.checked
          ? ['confirmacao-imediata']
          : []
      };

      let novaCarona;

      try {
        const resposta = await API.chamar('/api/rides', {
          method: 'POST',
          body: JSON.stringify(dadosCarona)
        });

        novaCarona = resposta.ride;
      } catch (erro) {
        exibirToast(
          'Entre para publicar',
          erro.message || 'Faça login antes de oferecer uma carona.'
        );
        return;
      }

      ESTADO.caronas.unshift(novaCarona);

      renderizarCaronasInicio();
      renderizarCaronasExplorar();

      ELEMENTOS.formularioPublicacao.reset();
      definirValoresIniciaisPublicacao();
      renderizarPreviewPublicacao();

      desbloquearConquista('motorista');

      exibirToast(
        'Carona publicada!',
        'Ela já aparece na lista de caronas disponíveis.',
        'sucesso'
      );

      window.setTimeout(() => navegarPara('explorar'), 520);
    }

    async function submeterLogin(evento) {
      evento.preventDefault();

      const email = ELEMENTOS.entradaEmail.value.trim();
      const senha = ELEMENTOS.entradaSenha.value.trim();

      if (!email || !senha) {
        ELEMENTOS.formularioLogin.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-8px)' },
            { transform: 'translateX(8px)' },
            { transform: 'translateX(0)' }
          ],
          { duration: 320, easing: 'ease-out' }
        );

        exibirToast('Dados incompletos', 'Informe e-mail e senha para entrar.');
        return;
      }

      try {
        await autenticarUsuario(email, senha);
      } catch (erro) {
        exibirToast('Login não realizado', erro.message);
      }
    }

    function alternarVisibilidadeSenha() {
      const senhaOculta = ELEMENTOS.entradaSenha.type === 'password';

      ELEMENTOS.entradaSenha.type = senhaOculta ? 'text' : 'password';
      ELEMENTOS.botaoAlternarSenha.setAttribute(
        'aria-label',
        senhaOculta ? 'Ocultar senha' : 'Mostrar senha'
      );
      ELEMENTOS.botaoAlternarSenha.title = senhaOculta
        ? 'Ocultar senha'
        : 'Mostrar senha';
    }

    function solicitarVaga(botao, idCarona) {
      const carona = encontrarCaronaPorId(idCarona);

      if (!carona) return;

      botao.disabled = true;
      botao.style.opacity = '0.82';
      botao.innerHTML = 'Solicitação enviada ✓';

      exibirToast(
        'Solicitação enviada',
        `Avisamos ${carona.motorista}. Você receberá a resposta nesta tela.`,
        'sucesso'
      );
    }

    function concluirAbertura() {
      window.setTimeout(() => {
        ELEMENTOS.telaAbertura.classList.add('tela-abertura--oculta');
        ELEMENTOS.telaLogin.classList.add('tela-login--visivel');
      }, 2350);
    }

    function abrirAplicacao() {
      const aplicativoJaVisivel = ELEMENTOS.aplicacao.classList.contains(
        'aplicacao--visivel'
      );

      if (ESTADO.entradaAppEmAndamento || aplicativoJaVisivel) {
        return;
      }

      ESTADO.entradaAppEmAndamento = true;
      tocarSomEntrada();

      executarEntradaCinematografica(
        () => {
          ELEMENTOS.telaLogin.classList.add('tela-login--oculta');
          ELEMENTOS.aplicacao.classList.add('aplicacao--visivel');
          ELEMENTOS.aplicacao.setAttribute('aria-hidden', 'false');

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              ELEMENTOS.aplicacao.classList.add('aplicacao--revelada');
            });
          });
        },
        () => {
          ESTADO.entradaAppEmAndamento = false;

          exibirToast(
            'Demonstração iniciada',
            'Explore as telas, a rede de amigos e os troféus do UniCaronas.',
            'sucesso'
          );
        }
      );
    }

    

    function sairDaAplicacao() {
      API.chamar('/api/auth/logout', { method: 'POST' }).catch(() => {});
      API.definirToken(null);
      ESTADO.usuario = null;
      if (ESTADO.piloto?.ativo) {
        finalizarModoPiloto();
      }

      ELEMENTOS.aplicacao.classList.remove('aplicacao--revelada');

      window.setTimeout(() => {
        ELEMENTOS.aplicacao.classList.remove('aplicacao--visivel');
        ELEMENTOS.aplicacao.setAttribute('aria-hidden', 'true');
        ELEMENTOS.telaLogin.classList.remove('tela-login--oculta');

        window.requestAnimationFrame(() => {
          ELEMENTOS.telaLogin.classList.add('tela-login--visivel');
        });
      }, 420);
    }

    function abrirNotificacoes() {
      ELEMENTOS.modalNotificacoes.classList.add('fundo-modal--aberto');
      ELEMENTOS.modalNotificacoes.setAttribute('aria-hidden', 'false');
    }

    function fecharNotificacoes() {
      ELEMENTOS.modalNotificacoes.classList.remove('fundo-modal--aberto');
      ELEMENTOS.modalNotificacoes.setAttribute('aria-hidden', 'true');
    }

    function executarTransicaoRota(acaoAoCentro) {
      const camada = ELEMENTOS.transicaoRota;

      if (!camada) {
        acaoAoCentro?.();
        return;
      }

      camada.classList.remove('transicao-rota--entrada-app');
      camada.classList.add('transicao-rota--ativa');

      window.setTimeout(() => {
        acaoAoCentro?.();
      }, 160);

      window.setTimeout(() => {
        camada.classList.remove('transicao-rota--ativa');
      }, 520);
    }

    function executarEntradaCinematografica(acaoNoPortal, aoConcluir) {
      const camada = ELEMENTOS.transicaoRota;

      if (!camada) {
        acaoNoPortal?.();
        aoConcluir?.();
        return;
      }

      camada.classList.remove(
        'transicao-rota--entrada-app',
        'transicao-rota--ativa'
      );

      void camada.offsetWidth;

      camada.classList.add(
        'transicao-rota--entrada-app',
        'transicao-rota--ativa'
      );

      window.setTimeout(() => {
        acaoNoPortal?.();
      }, 960);

      window.setTimeout(() => {
        camada.classList.remove(
          'transicao-rota--entrada-app',
          'transicao-rota--ativa'
        );

        aoConcluir?.();
      }, 2220);
    }

    function inicializarEstadoExperiencia() {
      ESTADO.piloto = {
        ativo: false,
        indice: 0,
        passos: [],
        alvoAtual: null
      };

      ESTADO.apresentacao = {
        aberta: false,
        indice: 0,
        temporizador: null
      };

      ESTADO.conquistas = new Set(['boas-vindas']);
      ESTADO.filtroConquistas = 'todas';

      ESTADO.audio = {
        ativo: true
      };
    }

    function garantirContextoAudio() {
      const ConstrutorAudio =
        window.AudioContext || window.webkitAudioContext;

      if (!ConstrutorAudio) {
        return null;
      }

      try {
        if (!AUDIO.contexto) {
          AUDIO.contexto = new ConstrutorAudio();
        }

        if (AUDIO.contexto.state === 'suspended') {
          AUDIO.contexto.resume().catch(() => {});
        }

        return AUDIO.contexto;
      } catch (erro) {
        return null;
      }
    }

    

    function tocarNotaAudio({
      frequencia,
      inicio,
      duracao,
      volume = 0.04,
      tipo = 'sine',
      ataque = 0.02,
      liberacao = 0.22
    }) {
      const contexto = garantirContextoAudio();

      if (!contexto || !ESTADO.audio.ativo) {
        return;
      }

      const oscilador = contexto.createOscillator();
      const ganho = contexto.createGain();
      const inicioSeguro = Math.max(inicio, contexto.currentTime);

      oscilador.type = tipo;
      oscilador.frequency.setValueAtTime(frequencia, inicioSeguro);

      ganho.gain.setValueAtTime(0.0001, inicioSeguro);
      ganho.gain.exponentialRampToValueAtTime(
        Math.max(volume, 0.0002),
        inicioSeguro + ataque
      );
      ganho.gain.exponentialRampToValueAtTime(
        0.0001,
        inicioSeguro + duracao + liberacao
      );

      oscilador.connect(ganho);
      ganho.connect(contexto.destination);

      oscilador.start(inicioSeguro);
      oscilador.stop(inicioSeguro + duracao + liberacao + 0.05);
    }

    function tocarSomEntrada() {
      const contexto = garantirContextoAudio();

      if (!contexto || !ESTADO.audio.ativo) {
        return;
      }

      const agora = contexto.currentTime;
      const notas = [
        { frequencia: 261.63, atraso: 0, duracao: 0.25 },
        { frequencia: 329.63, atraso: 0.12, duracao: 0.28 },
        { frequencia: 392.0, atraso: 0.24, duracao: 0.35 },
        { frequencia: 523.25, atraso: 0.38, duracao: 0.52 }
      ];

      notas.forEach((nota) => {
        tocarNotaAudio({
          frequencia: nota.frequencia,
          inicio: agora + nota.atraso,
          duracao: nota.duracao,
          volume: 0.045,
          tipo: 'sine'
        });
      });
    }

    function iniciarTrilhaApresentacao() {
      pararTrilhaApresentacao();

      const contexto = garantirContextoAudio();

      if (!contexto || !ESTADO.audio.ativo) {
        return;
      }

      const ganhoAmbiente = contexto.createGain();
      ganhoAmbiente.gain.setValueAtTime(0.0001, contexto.currentTime);
      ganhoAmbiente.gain.exponentialRampToValueAtTime(
        0.018,
        contexto.currentTime + 0.8
      );
      ganhoAmbiente.connect(contexto.destination);

      [130.81, 196.0, 261.63].forEach((frequencia, indice) => {
        const oscilador = contexto.createOscillator();

        oscilador.type = indice === 0 ? 'sine' : 'triangle';
        oscilador.frequency.setValueAtTime(frequencia, contexto.currentTime);
        oscilador.detune.setValueAtTime(indice * 4 - 4, contexto.currentTime);
        oscilador.connect(ganhoAmbiente);
        oscilador.start();

        AUDIO.osciladoresAmbiente.push({ oscilador, ganhoAmbiente });
      });

      const arpejo = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
      let indiceNota = 0;

      AUDIO.intervaloTrilha = window.setInterval(() => {
        if (!ESTADO.audio.ativo || !ESTADO.apresentacao.aberta) {
          return;
        }

        tocarNotaAudio({
          frequencia: arpejo[indiceNota % arpejo.length],
          inicio: contexto.currentTime,
          duracao: 0.18,
          volume: 0.022,
          tipo: 'triangle',
          ataque: 0.01,
          liberacao: 0.18
        });

        indiceNota += 1;
      }, 620);
    }

    function pararTrilhaApresentacao() {
      if (AUDIO.intervaloTrilha) {
        window.clearInterval(AUDIO.intervaloTrilha);
        AUDIO.intervaloTrilha = null;
      }

      if (!AUDIO.contexto) {
        AUDIO.osciladoresAmbiente = [];
        return;
      }

      AUDIO.osciladoresAmbiente.forEach(({ oscilador, ganhoAmbiente }) => {
        try {
          ganhoAmbiente.gain.exponentialRampToValueAtTime(
            0.0001,
            AUDIO.contexto.currentTime + 0.2
          );
          oscilador.stop(AUDIO.contexto.currentTime + 0.25);
        } catch (erro) {
          // O áudio é opcional e não deve afetar a navegação do protótipo.
        }
      });

      AUDIO.osciladoresAmbiente = [];
    }

    function atualizarBotaoSom() {
      ELEMENTOS.botaoSomApresentacao.classList.toggle(
        'botao-som--mutado',
        !ESTADO.audio.ativo
      );

      ELEMENTOS.botaoSomApresentacao.textContent = ESTADO.audio.ativo
        ? '♫'
        : '♩';

      ELEMENTOS.botaoSomApresentacao.setAttribute(
        'aria-label',
        ESTADO.audio.ativo
          ? 'Desativar trilha sonora'
          : 'Ativar trilha sonora'
      );
    }

    function alternarSomApresentacao() {
      ESTADO.audio.ativo = !ESTADO.audio.ativo;
      atualizarBotaoSom();

      if (ESTADO.audio.ativo && ESTADO.apresentacao.aberta) {
        iniciarTrilhaApresentacao();
        tocarSomEntrada();
      } else {
        pararTrilhaApresentacao();
      }
    }

    function iniciarApresentacao() {
      if (ESTADO.apresentacao.aberta) {
        return;
      }

      ESTADO.apresentacao.aberta = true;
      ESTADO.apresentacao.indice = 0;

      ELEMENTOS.apresentacaoCinematografica.classList.remove(
        'apresentacao-cinematografica--partida',
        'apresentacao-cinematografica--cena-0',
        'apresentacao-cinematografica--cena-1',
        'apresentacao-cinematografica--cena-2',
        'apresentacao-cinematografica--cena-3'
      );

      void ELEMENTOS.apresentacaoCinematografica.offsetWidth;

      ELEMENTOS.apresentacaoCinematografica.classList.add(
        'apresentacao-cinematografica--aberta'
      );
      ELEMENTOS.apresentacaoCinematografica.setAttribute('aria-hidden', 'false');

      document.body.style.overflow = 'hidden';

      atualizarCenaApresentacao();
      tocarSomEntrada();
      iniciarTrilhaApresentacao();
    }

    function ocultarApresentacao() {
      ELEMENTOS.apresentacaoCinematografica.classList.remove(
        'apresentacao-cinematografica--aberta',
        'apresentacao-cinematografica--partida',
        'apresentacao-cinematografica--cena-0',
        'apresentacao-cinematografica--cena-1',
        'apresentacao-cinematografica--cena-2',
        'apresentacao-cinematografica--cena-3'
      );
      ELEMENTOS.apresentacaoCinematografica.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function finalizarApresentacao(abrirDemo = false) {
      const cenaFinalizada = ESTADO.apresentacao.indice;
      const concluiuApresentacao =
        abrirDemo || cenaFinalizada === CENAS_APRESENTACAO.length - 1;

      ESTADO.apresentacao.aberta = false;

      if (ESTADO.apresentacao.temporizador) {
        window.clearTimeout(ESTADO.apresentacao.temporizador);
        ESTADO.apresentacao.temporizador = null;
      }

      pararTrilhaApresentacao();

      if (concluiuApresentacao) {
        desbloquearConquista('cinema');
      }

      if (!abrirDemo) {
        ocultarApresentacao();
        return;
      }

      ELEMENTOS.apresentacaoCinematografica.classList.add(
        'apresentacao-cinematografica--partida'
      );

      window.setTimeout(() => {
        ocultarApresentacao();
        entrarComoDemo();
      }, 820);
    }

    function atualizarCenaApresentacao() {
      const indiceCena = ESTADO.apresentacao.indice;

      selecionarTodos('[data-cena-apresentacao]').forEach((cena) => {
        cena.classList.toggle(
          'cena-apresentacao--ativa',
          Number(cena.dataset.cenaApresentacao) === indiceCena
        );
      });

      [
        'apresentacao-cinematografica--cena-0',
        'apresentacao-cinematografica--cena-1',
        'apresentacao-cinematografica--cena-2',
        'apresentacao-cinematografica--cena-3'
      ].forEach((classe) => {
        ELEMENTOS.apresentacaoCinematografica.classList.remove(classe);
      });

      ELEMENTOS.apresentacaoCinematografica.classList.add(
        `apresentacao-cinematografica--cena-${indiceCena}`
      );

      ELEMENTOS.falaApresentacao.textContent =
        CENAS_APRESENTACAO[indiceCena].fala;

      selecionarTodos('#progressoApresentacao span').forEach(
        (indicador, indice) => {
          indicador.classList.toggle(
            'progresso-apresentacao__ativo',
            indice === indiceCena
          );
        }
      );

      ELEMENTOS.botaoCenaAnterior.disabled = indiceCena === 0;
      ELEMENTOS.botaoProximaCena.disabled =
        indiceCena === CENAS_APRESENTACAO.length - 1;

      agendarProximaCenaApresentacao();
    }

    function agendarProximaCenaApresentacao() {
      if (ESTADO.apresentacao.temporizador) {
        window.clearTimeout(ESTADO.apresentacao.temporizador);
      }

      const ultimaCena =
        ESTADO.apresentacao.indice === CENAS_APRESENTACAO.length - 1;

      if (ultimaCena || !ESTADO.apresentacao.aberta) {
        return;
      }

      ESTADO.apresentacao.temporizador = window.setTimeout(() => {
        avancarCenaApresentacao();
      }, 7200);
    }

    function avancarCenaApresentacao() {
      const ultimaCena =
        ESTADO.apresentacao.indice === CENAS_APRESENTACAO.length - 1;

      if (ultimaCena) {
        return;
      }

      ESTADO.apresentacao.indice += 1;
      atualizarCenaApresentacao();

      tocarNotaAudio({
        frequencia: 523.25,
        inicio: garantirContextoAudio()?.currentTime || 0,
        duracao: 0.16,
        volume: 0.035,
        tipo: 'triangle'
      });
    }

    function voltarCenaApresentacao() {
      if (ESTADO.apresentacao.indice === 0) {
        return;
      }

      ESTADO.apresentacao.indice -= 1;
      atualizarCenaApresentacao();
    }

    function obterChaveGuiaAtual() {
      const aplicacaoEstaVisivel =
        ELEMENTOS.aplicacao.classList.contains('aplicacao--visivel');

      return aplicacaoEstaVisivel ? ESTADO.paginaAtiva : 'login';
    }

    function iniciarModoPiloto() {
      if (ESTADO.apresentacao?.aberta) {
        return;
      }

      const chaveGuia = obterChaveGuiaAtual();
      const passos = GUIAS_MODO_PILOTO[chaveGuia] || [];

      if (!passos.length) {
        exibirToast(
          'Modo piloto',
          'Ainda não há uma rota guiada disponível para esta tela.'
        );

        return;
      }

      finalizarModoPiloto(false);

      ESTADO.piloto.ativo = true;
      ESTADO.piloto.indice = 0;
      ESTADO.piloto.passos = passos;

      ELEMENTOS.botaoPilotoAnterior.hidden = true;
      ELEMENTOS.botaoPilotoAnterior.setAttribute('aria-hidden', 'true');

      ELEMENTOS.camadaPiloto.classList.add('camada-piloto--ativa');
      ELEMENTOS.camadaPiloto.setAttribute('aria-hidden', 'false');

      window.requestAnimationFrame(() => {
        atualizarPassoPiloto();
      });
    }

    

    function finalizarModoPiloto(concluiu = false) {
      if (ESTADO.piloto.alvoAtual) {
        ESTADO.piloto.alvoAtual.classList.remove('piloto__alvo-ativo');
      }

      ESTADO.piloto.ativo = false;
      ESTADO.piloto.indice = 0;
      ESTADO.piloto.passos = [];
      ESTADO.piloto.alvoAtual = null;

      ELEMENTOS.botaoPilotoAnterior.hidden = true;
      ELEMENTOS.botaoPilotoAnterior.setAttribute('aria-hidden', 'true');
      ELEMENTOS.botaoPilotoAnterior.style.visibility = '';

      ELEMENTOS.painelPiloto.style.removeProperty('top');
      ELEMENTOS.painelPiloto.style.removeProperty('left');
      ELEMENTOS.destaquePiloto.style.removeProperty('top');
      ELEMENTOS.destaquePiloto.style.removeProperty('left');
      ELEMENTOS.destaquePiloto.style.removeProperty('width');
      ELEMENTOS.destaquePiloto.style.removeProperty('height');

      ELEMENTOS.camadaPiloto.classList.remove('camada-piloto--ativa');
      ELEMENTOS.camadaPiloto.setAttribute('aria-hidden', 'true');

      if (concluiu) {
        desbloquearConquista('piloto');
      }
    }

    function atualizarPassoPiloto() {
      const passo = ESTADO.piloto.passos[ESTADO.piloto.indice];

      if (!passo) {
        finalizarModoPiloto(true);
        return;
      }

      const alvo = selecionar(passo.alvo);

      if (!alvo) {
        ESTADO.piloto.indice += 1;
        atualizarPassoPiloto();
        return;
      }

      if (ESTADO.piloto.alvoAtual) {
        ESTADO.piloto.alvoAtual.classList.remove('piloto__alvo-ativo');
      }

      ESTADO.piloto.alvoAtual = alvo;
      alvo.classList.add('piloto__alvo-ativo');

      alvo.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });

      window.setTimeout(() => {
        if (!ESTADO.piloto.ativo) {
          return;
        }

        aplicarRecortePiloto(alvo);
        preencherPainelPiloto(passo);
      }, 320);
    }

    function aplicarRecortePiloto(alvo) {
      const retanguloAlvo = alvo.getBoundingClientRect();
      const margem = 12;

      const esquerda = Math.max(8, retanguloAlvo.left - margem);
      const topo = Math.max(8, retanguloAlvo.top - margem);
      const largura = Math.min(
        window.innerWidth - esquerda - 8,
        retanguloAlvo.width + margem * 2
      );
      const altura = Math.min(
        window.innerHeight - topo - 8,
        retanguloAlvo.height + margem * 2
      );

      const direita = Math.max(0, window.innerWidth - esquerda - largura);
      const inferior = Math.max(0, window.innerHeight - topo - altura);

      const cortinas = {
        superior: selecionar('.camada-piloto__cortina--superior'),
        inferior: selecionar('.camada-piloto__cortina--inferior'),
        esquerda: selecionar('.camada-piloto__cortina--esquerda'),
        direita: selecionar('.camada-piloto__cortina--direita')
      };

      Object.assign(cortinas.superior.style, {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: `${topo}px`
      });

      Object.assign(cortinas.inferior.style, {
        top: `${topo + altura}px`,
        left: '0px',
        width: '100vw',
        height: `${inferior}px`
      });

      Object.assign(cortinas.esquerda.style, {
        top: `${topo}px`,
        left: '0px',
        width: `${esquerda}px`,
        height: `${altura}px`
      });

      Object.assign(cortinas.direita.style, {
        top: `${topo}px`,
        left: `${esquerda + largura}px`,
        width: `${direita}px`,
        height: `${altura}px`
      });

      Object.assign(ELEMENTOS.destaquePiloto.style, {
        top: `${topo}px`,
        left: `${esquerda}px`,
        width: `${largura}px`,
        height: `${altura}px`
      });

      posicionarPainelPiloto({
        esquerda,
        topo,
        largura,
        altura
      });
    }

    function posicionarPainelPiloto(retangulo) {
      const painel = ELEMENTOS.painelPiloto;
      const margem = 16;
      const larguraPainel = Math.min(440, window.innerWidth - margem * 2);
      const alturaPainel = painel.offsetHeight || 190;

      let esquerda = Math.min(
        window.innerWidth - larguraPainel - margem,
        Math.max(margem, retangulo.esquerda)
      );

      let topo = retangulo.topo + retangulo.altura + 18;

      if (topo + alturaPainel > window.innerHeight - margem) {
        topo = retangulo.topo - alturaPainel - 18;
      }

      if (topo < margem) {
        topo = Math.max(margem, window.innerHeight - alturaPainel - margem);
      }

      Object.assign(painel.style, {
        top: `${topo}px`,
        left: `${esquerda}px`
      });
    }

    function preencherPainelPiloto(passo) {
      const totalPassos = ESTADO.piloto.passos.length;
      const numeroPasso = ESTADO.piloto.indice + 1;
      const ultimoPasso = numeroPasso === totalPassos;

      ELEMENTOS.rotuloPiloto.textContent =
        `MODO PILOTO · ${numeroPasso.toString().padStart(2, '0')}`;

      ELEMENTOS.tituloPiloto.textContent = passo.titulo;
      ELEMENTOS.textoPiloto.textContent = passo.texto;
      ELEMENTOS.progressoPiloto.textContent =
        `${numeroPasso} de ${totalPassos}`;

      ELEMENTOS.botaoPilotoAnterior.hidden = ESTADO.piloto.indice === 0;
      ELEMENTOS.botaoPilotoAnterior.setAttribute(
        'aria-hidden',
        String(ESTADO.piloto.indice === 0)
      );

      ELEMENTOS.botaoPilotoProximo.innerHTML = ultimoPasso
        ? 'Concluir <span aria-hidden="true">✓</span>'
        : 'Próximo <span aria-hidden="true">→</span>';
    }

    function avancarPassoPiloto() {
      const ultimoPasso =
        ESTADO.piloto.indice === ESTADO.piloto.passos.length - 1;

      if (ultimoPasso) {
        finalizarModoPiloto(true);
        return;
      }

      ESTADO.piloto.indice += 1;
      atualizarPassoPiloto();
    }

    function voltarPassoPiloto() {
      if (ESTADO.piloto.indice === 0) {
        return;
      }

      ESTADO.piloto.indice -= 1;
      atualizarPassoPiloto();
    }

    function obterRanqueAtual() {
      const quantidade = ESTADO.conquistas.size;

      return RANQUES_CONQUISTAS.reduce((ranqueAtual, ranque) => {
        return quantidade >= ranque.minimo ? ranque : ranqueAtual;
      }, RANQUES_CONQUISTAS[0]);
    }

    function obterProximoRanque(ranqueAtual) {
      const indice = RANQUES_CONQUISTAS.findIndex(
        (ranque) => ranque.id === ranqueAtual.id
      );

      return RANQUES_CONQUISTAS[indice + 1] || null;
    }

    

    function atualizarResumoRanques() {
      const ranqueAtual = obterRanqueAtual();
      const proximoRanque = obterProximoRanque(ranqueAtual);
      const quantidade = ESTADO.conquistas.size;

      ELEMENTOS.tituloRankAtual.textContent = ranqueAtual.nome;
      ELEMENTOS.tituloRankAtual.className = ranqueAtual.classe;
      ELEMENTOS.progressoRankAtual.className = ranqueAtual.classe;

      if (!proximoRanque) {
        ELEMENTOS.progressoRankAtual.style.width = '100%';
        ELEMENTOS.textoProgressoRank.textContent =
          'Você chegou ao mais alto patamar da jornada.';
      } else {
        const progressoNoRanque =
          (quantidade - ranqueAtual.minimo) /
          (proximoRanque.minimo - ranqueAtual.minimo);

        ELEMENTOS.progressoRankAtual.style.width =
          `${Math.max(8, Math.min(100, progressoNoRanque * 100))}%`;

        ELEMENTOS.textoProgressoRank.textContent =
          `${quantidade} de ${proximoRanque.minimo} marcos para ${proximoRanque.nome}`;
      }

      selecionarTodos('.trilha-ranques [data-ranque]').forEach((marco) => {
        const indiceMarco = RANQUES_CONQUISTAS.findIndex(
          (ranque) => ranque.id === marco.dataset.ranque
        );

        const indiceAtual = RANQUES_CONQUISTAS.findIndex(
          (ranque) => ranque.id === ranqueAtual.id
        );

        marco.classList.toggle(
          'trilha-ranques__alcancado',
          indiceMarco <= indiceAtual
        );

        marco.classList.toggle(
          'trilha-ranques__atual',
          indiceMarco === indiceAtual
        );

        marco.classList.add(`trilha-ranques--${marco.dataset.ranque}`);
      });
    }

    function obterConquistasFiltradas() {
      const filtro = ESTADO.filtroConquistas;

      if (filtro === 'desbloqueadas') {
        return CATALOGO_CONQUISTAS.filter((conquista) =>
          ESTADO.conquistas.has(conquista.id)
        );
      }

      if (filtro === 'proximas') {
        return CATALOGO_CONQUISTAS.filter(
          (conquista) => !ESTADO.conquistas.has(conquista.id)
        );
      }

      return CATALOGO_CONQUISTAS;
    }

    function renderizarConquistas() {
      if (!ELEMENTOS.listaConquistas) {
        return;
      }

      const quantidadeDesbloqueada = ESTADO.conquistas.size;

      ELEMENTOS.contadorConquistas.textContent = quantidadeDesbloqueada;
      ELEMENTOS.resumoConquistas.textContent =
        `${quantidadeDesbloqueada} de ${CATALOGO_CONQUISTAS.length} troféus desbloqueados`;

      atualizarResumoRanques();

      const conquistas = obterConquistasFiltradas();

      ELEMENTOS.listaConquistas.innerHTML = conquistas
        .map((conquista) => {
          const desbloqueada = ESTADO.conquistas.has(conquista.id);
          const rotuloRanque =
            RANQUES_CONQUISTAS.find(
              (ranque) => ranque.id === conquista.ranque
            )?.nome || conquista.ranque;

          return `
            <article class="conquista ${desbloqueada ? 'conquista--desbloqueada' : 'conquista--bloqueada'}">
              <span class="conquista__icone conquista__icone--${escaparHtml(conquista.ranque)}">
                ${escaparHtml(conquista.icone)}
              </span>

              <div>
                <strong>${escaparHtml(conquista.titulo)}</strong>
                <small>${escaparHtml(conquista.descricao)}</small>
                <span class="conquista__ranque">${escaparHtml(rotuloRanque)}</span>
              </div>

              ${
                desbloqueada
                  ? '<span class="conquista__selo">✓</span>'
                  : '<span class="conquista__cadeado">⌁</span>'
              }
            </article>
          `;
        })
        .join('');
    }

    function desbloquearConquista(idConquista) {
      if (ESTADO.conquistas.has(idConquista)) {
        return;
      }

      ESTADO.conquistas.add(idConquista);
      renderizarConquistas();

      const conquista = CATALOGO_CONQUISTAS.find(
        (item) => item.id === idConquista
      );

      if (conquista) {
        exibirToast(
          'Novo troféu desbloqueado',
          `${conquista.icone} ${conquista.titulo}`,
          'sucesso'
        );
      }
    }

    function abrirConquistas() {
      renderizarConquistas();
      ELEMENTOS.modalConquistas.classList.add('fundo-modal--aberto');
      ELEMENTOS.modalConquistas.setAttribute('aria-hidden', 'false');
    }

    function fecharConquistas() {
      ELEMENTOS.modalConquistas.classList.remove('fundo-modal--aberto');
      ELEMENTOS.modalConquistas.setAttribute('aria-hidden', 'true');
    }

    function configurarFiltrosConquistas() {
      selecionarTodos('[data-filtro-conquista]').forEach((botao) => {
        botao.addEventListener('click', () => {
          selecionarTodos('[data-filtro-conquista]').forEach((item) => {
            item.classList.remove('filtro-conquista--ativo');
          });

          botao.classList.add('filtro-conquista--ativo');
          ESTADO.filtroConquistas = botao.dataset.filtroConquista;

          renderizarConquistas();
        });
      });
    }

    function lidarComCliqueGlobal(evento) {
      const botaoPagina = evento.target.closest('[data-pagina]');

      if (botaoPagina) {
        navegarPara(botaoPagina.dataset.pagina);
        return;
      }

      const botaoAcao = evento.target.closest('[data-acao]');

      if (!botaoAcao) {
        return;
      }

      const { acao, idCarona } = botaoAcao.dataset;

      const acoes = {
        'ver-detalhes': () => abrirDetalhesCarona(idCarona),
        'abrir-notificacoes': abrirNotificacoes,
        'fechar-notificacoes': fecharNotificacoes,
        sair: sairDaAplicacao,
        'recuperar-senha': () =>
          exibirToast(
            'Recuperação de senha',
            'Funcionalidade planejada para a versão com autenticação real.'
          ),
        'criar-cadastro': () =>
          exibirToast(
            'Cadastro',
            'O fluxo de cadastro será incluído futuramente.'
          ),
        'editar-perfil': () =>
          exibirToast(
            'Edição de perfil',
            'A edição real de perfil será implementada na próxima versão.'
          ),
        'enviar-mensagem': () =>
          exibirToast(
            'Mensagem demonstrativa',
            'O chat será conectado à versão funcional do UniCaronas.'
          ),
        'solicitar-vaga': () => solicitarVaga(botaoAcao, idCarona)
      };

      acoes[acao]?.();
    }

    function configurarEventosNavegacao() {
      document.addEventListener('click', lidarComCliqueGlobal);

      ELEMENTOS.botaoMenuMobile.addEventListener('click', () => {
        ELEMENTOS.barraLateral.classList.toggle('barra-lateral--aberta');
      });
    }

    

    function configurarEventosLogin() {
      ELEMENTOS.formularioLogin.addEventListener('submit', submeterLogin);
      ELEMENTOS.botaoDemonstracao?.addEventListener('click', entrarComoDemo);

      ELEMENTOS.botaoAlternarSenha.addEventListener(
        'click',
        alternarVisibilidadeSenha
      );
    }

    function configurarEventosExplorar() {
      ELEMENTOS.entradaBusca.addEventListener('input', (evento) => {
        ESTADO.filtros.texto = evento.target.value;
        renderizarCaronasExplorar();
      });

      ELEMENTOS.botaoFiltros.addEventListener('click', () => {
        ELEMENTOS.painelFiltros.classList.toggle('painel-filtros--aberto');
      });

      selecionarTodos('[data-filtro-periodo]').forEach((botao) => {
        botao.addEventListener('click', () => atualizarFiltroPeriodo(botao));
      });

      selecionarTodos('[data-filtro-preferencia]').forEach((botao) => {
        botao.addEventListener('click', () =>
          atualizarFiltroPreferencia(botao)
        );
      });

      ELEMENTOS.botaoOrdenar.addEventListener('click', alternarOrdenacao);
    }

    function configurarEventosPublicacao() {
      const entradasQueAtualizamPreview = [
        ELEMENTOS.entradaOrigem,
        ELEMENTOS.entradaDestino,
        ELEMENTOS.entradaHorario,
        ELEMENTOS.entradaVagas,
        ELEMENTOS.entradaValor
      ];

      entradasQueAtualizamPreview.forEach((entrada) => {
        entrada.addEventListener('input', atualizarPreviewAoDigitar);
        entrada.addEventListener('change', atualizarPreviewAoDigitar);
      });

      ELEMENTOS.formularioPublicacao.addEventListener(
        'submit',
        publicarCarona
      );
    }

    function configurarEventosMinhasCaronas() {
      selecionarTodos('[data-aba-caronas]').forEach((botao) => {
        botao.addEventListener('click', () => {
          selecionarTodos('[data-aba-caronas]').forEach((aba) => {
            aba.classList.remove('aba--ativa');
          });

          botao.classList.add('aba--ativa');
          ESTADO.abaAtiva = botao.dataset.abaCaronas;

          renderizarMinhasCaronas();
        });
      });
    }

    function configurarEventosModal() {
      ELEMENTOS.modalNotificacoes.addEventListener('click', (evento) => {
        if (evento.target === ELEMENTOS.modalNotificacoes) {
          fecharNotificacoes();
        }
      });
    }

    function configurarEventosExperiencia() {
      ELEMENTOS.botaoModoPiloto.addEventListener('click', iniciarModoPiloto);
      ELEMENTOS.botaoConquistas.addEventListener('click', abrirConquistas);

      ELEMENTOS.botaoFecharPiloto.addEventListener('click', () => {
        finalizarModoPiloto();
      });

      ELEMENTOS.botaoPilotoProximo.addEventListener(
        'click',
        avancarPassoPiloto
      );

      ELEMENTOS.botaoPilotoAnterior.addEventListener(
        'click',
        voltarPassoPiloto
      );

      ELEMENTOS.botaoFecharConquistas.addEventListener(
        'click',
        fecharConquistas
      );

      ELEMENTOS.modalConquistas.addEventListener('click', (evento) => {
        if (evento.target === ELEMENTOS.modalConquistas) {
          fecharConquistas();
        }
      });

      ELEMENTOS.botaoApresentacao?.addEventListener(
        'click',
        iniciarApresentacao
      );

      ELEMENTOS.botaoPularApresentacao.addEventListener('click', () => {
        finalizarApresentacao(true);
      });

      ELEMENTOS.botaoEntrarDemonstracaoApresentacao.addEventListener(
        'click',
        () => finalizarApresentacao(true)
      );

      ELEMENTOS.botaoProximaCena.addEventListener(
        'click',
        avancarCenaApresentacao
      );

      ELEMENTOS.botaoCenaAnterior.addEventListener(
        'click',
        voltarCenaApresentacao
      );

      ELEMENTOS.botaoSomApresentacao.addEventListener(
        'click',
        alternarSomApresentacao
      );

      window.addEventListener('resize', () => {
        if (ESTADO.piloto?.ativo && ESTADO.piloto.alvoAtual) {
          aplicarRecortePiloto(ESTADO.piloto.alvoAtual);
        }
      });

      document.addEventListener('keydown', (evento) => {
        if (evento.key !== 'Escape') {
          return;
        }

        if (ESTADO.apresentacao?.aberta) {
          finalizarApresentacao(false);
          return;
        }

        if (ESTADO.piloto?.ativo) {
          finalizarModoPiloto();
          return;
        }

        if (
          ELEMENTOS.modalConquistas.classList.contains('fundo-modal--aberto')
        ) {
          fecharConquistas();
        }
      });
    }

    function configurarEventosRede() {
      ELEMENTOS.botaoConvidarAmigos?.addEventListener('click', () => {
        desbloquearConquista('conector');
        exibirToast(
          'Convite pronto para enviar',
          'No produto real, este link pode ser compartilhado com colegas da sua instituição.',
          'sucesso'
        );
      });

      ELEMENTOS.botaoEncontrarAmigos?.addEventListener('click', () => {
        desbloquearConquista('amigo-de-rota');
        exibirToast(
          'Sugestões atualizadas',
          'Encontramos colegas com rotas e horários parecidos com os seus.',
          'sucesso'
        );
      });
    }

    function mapearElementos() {
      ELEMENTOS.telaAbertura = selecionar('#telaAbertura');
      ELEMENTOS.telaLogin = selecionar('#telaLogin');
      ELEMENTOS.aplicacao = selecionar('#aplicacao');

      ELEMENTOS.barraLateral = selecionar('#barraLateral');
      ELEMENTOS.tituloNavegacao = selecionar('#tituloNavegacao');
      ELEMENTOS.botaoMenuMobile = selecionar('#botaoMenuMobile');

      ELEMENTOS.formularioLogin = selecionar('#formularioLogin');
      ELEMENTOS.entradaEmail = selecionar('#entradaEmail');
      ELEMENTOS.entradaSenha = selecionar('#entradaSenha');
      ELEMENTOS.botaoAlternarSenha = selecionar('#botaoAlternarSenha');
      ELEMENTOS.botaoDemonstracao = selecionar('#botaoDemonstracao');
      ELEMENTOS.botaoApresentacao = selecionar('#botaoApresentacao');

      ELEMENTOS.listaCaronasInicio = selecionar('#listaCaronasInicio');
      ELEMENTOS.listaCaronasExplorar = selecionar('#listaCaronasExplorar');
      ELEMENTOS.quantidadeResultados = selecionar('#quantidadeResultados');
      ELEMENTOS.contadorMenuCaronas = selecionar('#contadorMenuCaronas');
      ELEMENTOS.contadorAmigos = selecionar('#contadorAmigos');

      ELEMENTOS.entradaBusca = selecionar('#entradaBusca');
      ELEMENTOS.botaoFiltros = selecionar('#botaoFiltros');
      ELEMENTOS.painelFiltros = selecionar('#painelFiltros');
      ELEMENTOS.contadorFiltros = selecionar('#contadorFiltros');
      ELEMENTOS.botaoOrdenar = selecionar('#botaoOrdenar');

      ELEMENTOS.formularioPublicacao = selecionar('#formularioPublicacao');
      ELEMENTOS.entradaOrigem = selecionar('#entradaOrigem');
      ELEMENTOS.entradaDestino = selecionar('#entradaDestino');
      ELEMENTOS.entradaData = selecionar('#entradaData');
      ELEMENTOS.entradaHorario = selecionar('#entradaHorario');
      ELEMENTOS.entradaVagas = selecionar('#entradaVagas');
      ELEMENTOS.entradaValor = selecionar('#entradaValor');
      ELEMENTOS.entradaObservacao = selecionar('#entradaObservacao');
      ELEMENTOS.entradaConfirmacaoImediata = selecionar(
        '#entradaConfirmacaoImediata'
      );
      ELEMENTOS.previewPublicacao = selecionar('#previewPublicacao');

      ELEMENTOS.listaMinhasCaronas = selecionar('#listaMinhasCaronas');
      ELEMENTOS.conteudoDetalhes = selecionar('#conteudoDetalhes');

      ELEMENTOS.listaAmigos = selecionar('#listaAmigos');
      ELEMENTOS.listaAtividadesAmigos = selecionar('#listaAtividadesAmigos');
      ELEMENTOS.botaoConvidarAmigos = selecionar('#botaoConvidarAmigos');
      ELEMENTOS.botaoEncontrarAmigos = selecionar('#botaoEncontrarAmigos');

      ELEMENTOS.modalNotificacoes = selecionar('#modalNotificacoes');
      ELEMENTOS.areaToasts = selecionar('#areaToasts');

      ELEMENTOS.transicaoRota = selecionar('#transicaoRota');

      ELEMENTOS.botaoModoPiloto = selecionar('#botaoModoPiloto');
      ELEMENTOS.botaoConquistas = selecionar('#botaoConquistas');
      ELEMENTOS.contadorConquistas = selecionar('#contadorConquistas');

      ELEMENTOS.camadaPiloto = selecionar('#camadaPiloto');
      ELEMENTOS.destaquePiloto = selecionar('#destaquePiloto');
      ELEMENTOS.painelPiloto = selecionar('.painel-piloto');
      ELEMENTOS.rotuloPiloto = selecionar('#rotuloPiloto');
      ELEMENTOS.tituloPiloto = selecionar('#tituloPiloto');
      ELEMENTOS.textoPiloto = selecionar('#textoPiloto');
      ELEMENTOS.progressoPiloto = selecionar('#progressoPiloto');
      ELEMENTOS.botaoFecharPiloto = selecionar('#botaoFecharPiloto');
      ELEMENTOS.botaoPilotoAnterior = selecionar('#botaoPilotoAnterior');
      ELEMENTOS.botaoPilotoProximo = selecionar('#botaoPilotoProximo');

      ELEMENTOS.modalConquistas = selecionar('#modalConquistas');
      ELEMENTOS.botaoFecharConquistas = selecionar('#botaoFecharConquistas');
      ELEMENTOS.resumoConquistas = selecionar('#resumoConquistas');
      ELEMENTOS.listaConquistas = selecionar('#listaConquistas');
      ELEMENTOS.tituloRankAtual = selecionar('#tituloRankAtual');
      ELEMENTOS.progressoRankAtual = selecionar('#progressoRankAtual');
      ELEMENTOS.textoProgressoRank = selecionar('#textoProgressoRank');

      ELEMENTOS.apresentacaoCinematografica = selecionar(
        '#apresentacaoCinematografica'
      );
      ELEMENTOS.falaApresentacao = selecionar('#falaApresentacao');
      ELEMENTOS.botaoSomApresentacao = selecionar('#botaoSomApresentacao');
      ELEMENTOS.botaoPularApresentacao = selecionar(
        '#botaoPularApresentacao'
      );
      ELEMENTOS.botaoEntrarDemonstracaoApresentacao = selecionar(
        '#botaoEntrarDemonstracaoApresentacao'
      );
      ELEMENTOS.botaoCenaAnterior = selecionar('#botaoCenaAnterior');
      ELEMENTOS.botaoProximaCena = selecionar('#botaoProximaCena');
    }

    function definirValoresIniciaisPublicacao() {
      ELEMENTOS.entradaData.value = obterDataAtualParaInput();
      ELEMENTOS.entradaHorario.value = '18:00';
      ELEMENTOS.entradaVagas.value = '2';
      ELEMENTOS.entradaValor.value = '8.00';
      ELEMENTOS.entradaConfirmacaoImediata.checked = true;
    }

    async function iniciar() {
      mapearElementos();
      inicializarEstadoExperiencia();
      definirValoresIniciaisPublicacao();
      await carregarCaronasDoBackend();
      renderizarAplicacao();
      renderizarConquistas();
      atualizarBotaoSom();

      configurarEventosNavegacao();
      configurarEventosLogin();
      configurarEventosExplorar();
      configurarEventosPublicacao();
      configurarEventosMinhasCaronas();
      configurarEventosModal();
      configurarEventosExperiencia();
      configurarEventosRede();
      configurarFiltrosConquistas();

      concluirAbertura();
    }

    document.addEventListener('DOMContentLoaded', iniciar);
  })();