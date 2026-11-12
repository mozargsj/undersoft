// Idiomas disponiveis no seletor (cabecalho, rodape e paginas legais).
// `short` e o rotulo curto usado no menu mobile.
export const LANGS = [
  { code: "pt-PT", short: "PT", label: "PT", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "pt-BR", short: "BR", label: "BR", flag: "https://flagcdn.com/w40/br.png" },
  { code: "en", short: "EN", label: "EN", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "es", short: "ES", label: "ES", flag: "https://flagcdn.com/w40/es.png" },
];

export const DEFAULT_LANG = "pt-PT";

// Textos do cabecalho e do rodape. Para adicionar/alterar um texto, edite a chave nos 4 idiomas.
// A chave "pt-PT" e a referencia: se faltar uma chave noutro idioma, usa-se o texto de pt-PT.
export const TRANSLATIONS = {
  "pt-PT": {
    nav: {
      solution: "Solução",
      services: "Serviços",
      process: "Processo",
      reviews: "Avaliações",
      about: "Sobre nós",
      faq: "FAQ",
      home: "Início",
      contact: "Contacto",
    },
    header: {
      cta: "Contactar",
      mainNav: "Navegação principal",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      language: "Idioma",
      backHome: "Voltar ao site",
      backHomeAria: "Undersoft, voltar à página inicial",
    },
    footer: {
      tagline: "O tempo desperdiçado em processos manuais é rentabilidade que nunca chega ao seu negócio.",
      navigation: "Navegação",
      institutional: "Institucional",
      complaints: "Livro de Reclamações",
      contact: "Contacto",
      rights: "Todos os direitos reservados.",
      terms: "Termos e Condições",
      service: "Termos de Serviço",
      privacy: "Política de Privacidade",
      cookies: "Política de Cookies",
      cookieSettings: "Definições de cookies",
    },

    // ---------------------------------------------------------------------
    // Conteúdo das secções da página (referência: pt-PT). Mesma estrutura das outras línguas.
    // Marcadores como {name} e {n} são substituídos em runtime.
    // ---------------------------------------------------------------------
    meta: {
      title: "Undersoft | Automação Empresarial",
      description:
        "A Undersoft automatiza processos empresariais e cria sistemas à medida, sem obrigar a sua equipa a abandonar as ferramentas que já utiliza.",
      thanksTitle: "Obrigado | Undersoft",
      thanksDescription: "Pedido enviado com sucesso. A Undersoft entra em contacto consigo assim que possível.",
    },

    hero: {
      eyebrow: "Automação e sistemas sob medida",
      titleLine1Before: "Pare de ",
      titleHighlight: "perder dinheiro",
      titleLine2: "com processos manuais.",
      text: "Cada processo manual automatizado é tempo e dinheiro de volta para o seu negócio. Automatizamos o que já usa e criamos o sistema que falta, sem deitar fora o que já funciona.",
      ctaPrimary: "Pedir análise gratuita",
      ctaSecondary: "Ver como funciona",
    },

    problemDemo: {
      title1: "O problema não é a ferramenta.",
      title2: "É depender de trabalho manual.",
      subtitle: "Cada pesquisa manual custa tempo, dinheiro e abre espaço a erros. Veja a diferença em números reais.",
      manual: {
        title: "Sistema Manual",
        timer: "Tempo Gasto:",
        toastSaveError: "⚠️ Erro ao guardar! Verifique os campos destacados.",
        toastCustomerError: "⚠️ Erro: Cliente não registado. Verifique o nome.",
        totalBilled: "Total Faturado:",
        profit: "Lucro (20%):",
        alertTitle: "Falha de caixa: -40.500,00 €",
        alertNote: "(Operador introduziu 4.500 em vez de 45.000 e o erro passou)",
        pains: [
          "Erros de introdução de dados",
          "Tempo perdido a pesquisar",
          "Sem validação automática",
          "Retrabalho em caso de erro",
          "Dificuldade de escalar",
        ],
      },
      auto: {
        title: "Sistema Automatizado",
        timer: "Tempo Gasto",
        toastStart: "Novo orçamento aprovado! A preencher...",
        toastApproved: "Novo orçamento aprovado: {name}",
        totalBilled: "Total Faturado:",
        profit: "Lucro Projetado (20%):",
        success: "100% de precisão. Nenhum cêntimo perdido.",
        gains: [
          "Validação automática",
          "Pesquisa instantânea",
          "Zero retrabalho",
          "Atualização em tempo real",
          "Escala sem esforço extra",
        ],
      },
      table: { customer: "Nome do Cliente", amount: "Valor (€)", invoice: "N.º da fatura" },
      dataset: [
        { name: "Under Ltda", amount: "15.450,00", invoice: "FT-99281" },
        { name: "Under Consultoria", amount: "3.200,50", invoice: "FT-99282" },
        { name: "Under Logística", amount: "45.000,00", invoice: "FT-99283" },
        { name: "Under Tecnologia", amount: "9.890,90", invoice: "FT-99284" },
      ],
      totals: { manualBilled: "33.041,40 €", manualProfit: "6.608,28 €", autoBilled: "73.541,40 €", autoProfit: "14.708,28 €" },
    },

    painPoints: {
      eyebrow: "O que ninguém repara",
      titleLine1: "O processo até funciona.",
      titleLine2Before: "O que ninguém vê é o que a repetição manual ",
      titleHighlight: "está a custar.",
      cards: [
        { title: "Informação duplicada", text: "Os mesmos dados são copiados entre ficheiros, emails e sistemas diferentes." },
        { title: "Erros evitáveis", text: "Campos incorretos, versões desatualizadas e validações feitas apenas no final." },
        { title: "Tempo desperdiçado", text: "Horas consumidas em tarefas repetitivas que poderiam ser executadas automaticamente." },
        { title: "Dependência de pessoas", text: "Processos críticos ficam concentrados em quem conhece os ficheiros e os atalhos." },
        { title: "Retrabalho constante", text: "Problemas simples transformam-se em correções, chamadas e verificações manuais." },
        { title: "Falta de controlo", text: "É difícil saber o que foi feito, por quem, quando e com base em que informação." },
      ],
    },

    solution: {
      traditionalTitle: "Modelo tradicional",
      traditional: [
        "Trocar todas as ferramentas de uma só vez",
        "Obrigar a equipa a aprender um novo sistema",
        "Migrar toda a informação para outro sistema sem necessidade",
        "Pagar por funcionalidades que não utiliza",
        "Adaptar a empresa às limitações do software",
      ],
      ourTitle: "O nosso modelo",
      ours: [
        "Manter as ferramentas que já funcionam",
        "Automatizar apenas onde existe desperdício",
        "Adicionar validações e regras específicas",
        "Integrar ferramentas, bases de dados e APIs ou criar o sistema que falta",
        "Evoluir por fases, com controlo de investimento",
      ],
      eyebrow: "O que nos distingue",
      title: "Melhoramos o processo antes de sugerir uma substituição.",
      text: "Automatizamos o que já existe e, quando necessário, criamos o sistema à medida. A tecnologia adapta-se à operação da empresa. Não o contrário.",
    },

    services: {
      eyebrow: "Serviços",
      title: "O que podemos automatizar e criar para si",
      text: "Começamos pelos processos frequentes e mensuráveis. Ligamos o que já existe e, quando nada serve, criamos o sistema à medida.",
      items: [
        { title: "Orçamentação", text: "Geração, cálculo, validação e organização de propostas comerciais." },
        { title: "Registo de clientes", text: "Centralização de dados e redução de preenchimentos repetidos." },
        { title: "Validação de dados", text: "Regras automáticas para impedir erros antes de entrarem no processo." },
        { title: "Integrações", text: "Ligação entre as suas ferramentas, bases de dados, serviços online e APIs." },
        { title: "Relatórios", text: "Informação consolidada, indicadores e acompanhamento de operações." },
        { title: "Processos internos", text: "Automação de tarefas administrativas que consomem tempo todos os dias." },
      ],
      custom: {
        title: "Sistemas à medida",
        text: "Quando nenhuma ferramenta resolve o problema, criamos a aplicação ou o painel interno de que a sua operação precisa, já ligado ao que a empresa utiliza.",
      },
    },

    integrations: {
      eyebrow: "Integrações",
      title: "Ligamos as ferramentas que já usa.",
      text: "Trabalhamos com as ferramentas de gestão, faturação e folhas de cálculo que a sua equipa já utiliza, e com outros serviços através de APIs.",
      others: "+ Outros via API",
    },

    process: {
      eyebrow: "Como definimos o âmbito",
      title: "Um processo simples, sem promessa vaga.",
      text: "Saberá exatamente o que esperar em cada etapa, sem surpresas no meio do caminho.",
      steps: [
        { title: "Diagnóstico", text: "Mapeamento do processo, falhas, dependências e tempo consumido." },
        { title: "Prioridade", text: "Escolha da parte com maior impacto e menor risco de implementação." },
        { title: "Proposta", text: "Âmbito, prazo, investimento e resultado esperado." },
        { title: "Implementação", text: "Desenvolvimento e integração sem interromper a operação atual." },
        { title: "Evolução", text: "Manutenção, novas regras e melhorias conforme a necessidade real." },
      ],
    },

    reviews: {
      eyebrow: "Avaliações",
      title: "O que dizem os nossos clientes.",
      text: "Equipas que passaram a dedicar o tempo ao que realmente importa.",
      regionLabel: "Avaliações de clientes",
      carousel: "carrossel",
      prev: "Avaliação anterior",
      next: "Próxima avaliação",
      goTo: "Ir para o slide {n}",
      pickLabel: "Escolher avaliação",
      stars: "5 de 5 estrelas",
      items: [
        {
          quote: "Antes a gente recebia pedido por WhatsApp, anotava num papel e passava pra cozinha, e erro de endereço ou de complemento era rotina. Depois que fizeram o sistema de delivery, o pedido chega organizado e a cozinha vê tudo numa tela só. O faturamento do delivery cresceu bastante nos primeiros meses, e no fim do dia eu gasto bem menos tempo conferindo o caixa.",
          name: "Geocátia Silva",
          role: "Fundadora, Stara açai",
        },
        {
          quote: "Minha agenda era um caderno e as finanças ficavam numa planilha que nunca fechava com o caixa. Hoje a cliente agenda e paga o sinal pelo próprio link, e as faltas diminuíram muito. Gosto de abrir o resumo financeiro da semana sem precisar montar nada. Na primeira quinzena precisamos de alguns ajustes, e a Undersoft resolveu tudo rápido.",
          name: "Kerolai Bonifácio",
          role: "Fundadora, Kb Studio",
        },
        {
          quote: "Minha loja virtual já funcionava, mas estoque e pedidos não se comunicavam com o sistema de gestão, e eu digitava tudo duas vezes. Eles ligaram as duas pontas sem me obrigar a trocar o que eu já usava. Agora o estoque baixa sozinho e o financeiro bate com as vendas. Acabou o retrabalho e as divergências de estoque.",
          name: "Lucas Gonçalves",
          role: "Empresário, Postati",
        },
        {
          quote: "Fechei com a Undersoft para criar a loja online já pensando em conectá-la ao que usamos internamente. A entrega saiu dentro do prazo combinado, com a parte financeira integrada, e isso me evitou contratar outro fornecedor. O suporte depois do lançamento continua atento. Pedi duas mudanças no checkout e ficaram prontas na mesma semana.",
          name: "Robert Bonifácio",
          role: "Sócio-fundador, RBM Portas e Janelas",
        },
        {
          quote: "Matrículas, cobranças e controle de acesso eram feitos separadamente, e a recepção perdia muito tempo com isso. O sistema reuniu tudo e passou a avisar sobre as mensalidades automaticamente. A inadimplência caiu e os alunos comentaram que ficou mais fácil resolver as coisas. Foi um investimento que se pagou.",
          name: "Gabriel Marantnes",
          role: "Administrador, Marant Fitness",
        },
        {
          quote: "O assistente que a Undersoft implantou atende os contatos que chegam, entende o que a pessoa precisa e marca a reunião direto na minha agenda. Antes eu perdia lead fora do horário comercial. Ele não resolve tudo, e quando o assunto foge do padrão passa a conversa pra mim, que era o comportamento que eu queria.",
          name: "Tomás Santos",
          role: "Empresário, TSK Marketing",
        },
      ],
    },

    about: {
      eyebrow: "Sobre nós",
      titleLine1: "Não vendemos software.",
      titleLine2: "Devolvemos tempo e controlo à sua operação.",
      p1: "A Undersoft nasceu para facilitar os sistemas das empresas. Automatizamos processos e criamos sistemas à medida para empresas que já não querem perder dinheiro em trabalho manual.",
      p2: "Em demasiados negócios, a tecnologia dá mais trabalho do que poupa: folhas soltas, tarefas repetidas e ferramentas que não comunicam entre si. Ligamos o que já utiliza e criamos o que falta, com diagnóstico prévio, âmbito e prazos por escrito e entrega por fases.",
      cta: "Falar connosco",
      imageAlt: "Undersoft, soluções empresariais",
      badgeName: "Undersoft",
      badgeTagline: "Soluções empresariais",
      commitments: [
        { big: "Propósito", small: "Eliminar o trabalho manual que consome tempo, dinheiro e atenção às equipas." },
        { big: "Especialidade", small: "Automação de processos e sistemas à medida, integrados nas ferramentas que a empresa já utiliza." },
        { big: "Princípio", small: "Cada solução parte do processo real do cliente, nunca de um produto pré-definido." },
        { big: "Compromisso", small: "Rigor técnico e transparência total, do diagnóstico à entrega." },
      ],
    },

    diagnostic: {
      eyebrow: "Primeira etapa",
      title: "Perceber o processo antes de propor uma solução.",
      p1: "O primeiro contacto serve para compreender como a empresa trabalha hoje, onde existe perda de tempo e se há margem real para automatizar.",
      p2: "Sem compromisso e sem custo. Só depois dessa análise faz sentido definir âmbito, prioridades e uma proposta adequada.",
      cta: "Descrever o meu processo",
    },

    contact: {
      eyebrow: "Contacto",
      title: "Perceber o processo antes de propor uma solução.",
      p1: "O primeiro contacto serve para compreender como a empresa trabalha hoje, onde existe perda de tempo e se há margem real para automatizar.",
      p2: "Sem compromisso e sem custo. Só depois dessa análise faz sentido definir âmbito, prioridades e uma proposta adequada.",
      whatsapp: "Falar no WhatsApp",
      form: {
        name: "Nome*",
        namePlaceholder: "João Silva",
        email: "Email*",
        emailPlaceholder: "name@example.com",
        message: "Qual processo quer melhorar?*",
        messagePlaceholder: "Perco horas por semana a organizar pedidos manualmente...",
        acceptPrefix: "Aceito os",
        terms: "termos e condições",
        and: "e a",
        privacy: "Política de Privacidade",
        honeypot: "Não preencher",
        subject: "Novo contacto através de undersoft.pt",
        button: { idle: "Pedir a minha proposta", validating: "A validar...", sending: "A enviar..." },
        errorValidate:
          "Não foi possível validar o pedido. Atualize a página e tente novamente ou escreva para contacto@undersoft.pt.",
        errorSend: "Não foi possível enviar o pedido. Tente novamente ou escreva para contacto@undersoft.pt.",
      },
    },

    faq: {
      eyebrow: "Perguntas frequentes",
      title: "As suas perguntas, respondidas",
      more: "Ficou com outra dúvida? Fale connosco →",
      items: [
        { question: "Vou ter de trocar as ferramentas que já uso?", answer: "Não. A automação é integrada nas ferramentas que a sua equipa já utiliza, sem interromper a operação atual." },
        { question: "E se o meu processo for muito específico ou nenhuma ferramenta o resolver?", answer: "Cada processo é analisado antes de se propor qualquer solução. Quando nada do que existe resolve o problema, criamos um sistema à medida, ligado ao que a empresa já utiliza." },
        { question: "Como começa o processo?", answer: "Com uma primeira análise, sem custo e sem compromisso: percebemos como a empresa trabalha hoje e se há margem real para automatizar. Só depois definimos âmbito, prioridades e uma proposta adequada." },
        { question: "Quanto tempo demora a implementação?", answer: "Depende da complexidade do processo, mas trabalhamos por fases, começando pela parte com maior impacto e menor risco. Isto permite ver resultados sem esperar por um projeto de meses." },
        { question: "Quanto custa?", answer: "A primeira análise é sem custo e sem compromisso. Depois, definimos âmbito, prazo e investimento numa proposta adequada ao seu processo. Como trabalhamos por fases, mantém o controlo do investimento." },
        { question: "Preciso de conhecimentos técnicos para usar o que for automatizado?", answer: "Não. O objetivo é que a sua equipa tenha menos tarefas repetitivas, sem precisar de dominar a tecnologia por trás." },
        { question: "E depois da implementação, há acompanhamento?", answer: "Sim. Depois da implementação acompanhamos o que foi criado, com manutenção, novas regras e melhorias conforme a necessidade real da sua operação." },
      ],
    },

    cta: {
      words: ["Automatize", "Otimize", "Melhore", "Crie"],
      processes: "processos",
      without: " sem",
      withoutStart: "sem ",
      titleLine2: "deitar fora o que já funciona.",
      text: "A sua empresa não precisa de mudar de sistema para parar de perder tempo com trabalho manual. Ligamos o que já utiliza e, quando faz sentido, criamos o sistema que falta, eliminando o trabalho repetitivo em semanas, não meses.",
      button: "Quero analisar o meu processo",
    },

    // Popup de consentimento de cookies (Lei n.º 41/2004 e RGPD). Categorias em src/lib/consent.js.
    cookieConsent: {
      regionLabel: "Consentimento de cookies",
      title: "Cookies",
      text: "Usamos cookies essenciais e, com o seu consentimento, outros opcionais. Pode aceitar, rejeitar ou personalizar a qualquer momento.",
      policyPrefix: "Saiba mais na nossa",
      policyLink: "Política de Cookies",
      acceptAll: "Aceitar todos",
      rejectAll: "Rejeitar opcionais",
      customize: "Personalizar",
      detailsTitle: "Preferências de cookies",
      detailsText: "Escolha as categorias que autoriza. Os cookies estritamente necessários não podem ser desativados, porque sem eles o website não funciona. Saiba mais na nossa",
      alwaysActive: "Sempre ativo",
      save: "Guardar escolhas",
      back: "Voltar",
      categories: {
        necessary: {
          title: "Estritamente necessários",
          text: "Garantem o funcionamento e a segurança do website: memorizar a sua escolha de cookies, repor a posição de leitura ao recarregar a página e proteger o formulário de contacto contra abusos. Não requerem consentimento.",
        },
        preferences: {
          title: "Preferências",
          text: "Memorizam as suas escolhas entre visitas, como o idioma do website.",
        },
        analytics: {
          title: "Estatísticas",
          text: "Ajudam-nos a perceber, de forma agregada, como o website é utilizado para o melhorar. Atualmente, o website não utiliza ferramentas desta categoria.",
        },
        marketing: {
          title: "Marketing",
          text: "Permitem medir campanhas e apresentar conteúdos relevantes. Atualmente, o website não utiliza ferramentas desta categoria.",
        },
      },
    },

    floatingCta: { label: "Falar connosco" },

    successDialog: {
      title: "Pedido enviado com sucesso",
      text: "Recebemos a sua mensagem. Entraremos em contacto assim que possível.",
      ok: "OK",
    },

    notFound: {
      meta: "Página não encontrada | Undersoft",
      title: "Página não encontrada",
      lead: "A página que procura não existe ou foi movida. Volte ao início para continuar.",
      back: "Voltar ao início",
    },

    thanks: {
      title: "Pedido enviado com sucesso",
      lead: "Obrigado pelo seu contacto. Recebemos a sua mensagem e entraremos em contacto assim que possível.",
      stepsLabel: "Próximos passos",
      steps: [
        { title: "Analisamos o seu pedido", text: "Lemos com atenção o processo que descreveu." },
        { title: "Falamos consigo", text: "Para compreender como a empresa trabalha hoje e onde se perde tempo." },
        { title: "Proposta à medida", text: "Só depois dessa análise definimos âmbito, prioridades e proposta." },
      ],
      back: "Voltar ao site",
      whatsappPrefix: "Prefere falar já?",
      whatsappLabel: "Falar no WhatsApp",
    },

    termsDialog: {
      lastUpdated: "Última atualização:",
      close: "Fechar",
      accept: "Li e aceito",
    },
    legalPage: {
      toc: "Neste documento",
      others: "Outros documentos",
      tocAria: "Índice do documento",
      othersAria: "Outros documentos legais",
    },
  },

  "pt-BR": {
    nav: {
      solution: "Solução",
      services: "Serviços",
      process: "Processo",
      reviews: "Avaliações",
      about: "Sobre nós",
      faq: "FAQ",
      home: "Início",
      contact: "Contato",
    },
    header: {
      cta: "Fale conosco",
      mainNav: "Navegação principal",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      language: "Idioma",
      backHome: "Voltar ao site",
      backHomeAria: "Undersoft, voltar à página inicial",
    },
    footer: {
      tagline: "O tempo desperdiçado em processos manuais é lucratividade que nunca chega ao seu negócio.",
      navigation: "Navegação",
      institutional: "Institucional",
      complaints: "Livro de Reclamações",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
      terms: "Termos e Condições",
      service: "Termos de Serviço",
      privacy: "Política de Privacidade",
      cookies: "Política de Cookies",
      cookieSettings: "Configurações de cookies",
    },

    // ---------------------------------------------------------------------
    // Conteúdo das seções da página (português do Brasil).
    // ---------------------------------------------------------------------
    meta: {
      title: "Undersoft | Automação Empresarial",
      description:
        "A Undersoft automatiza processos empresariais e cria sistemas sob medida, sem obrigar sua equipe a abandonar as ferramentas que já usa.",
      thanksTitle: "Obrigado | Undersoft",
      thanksDescription: "Solicitação enviada com sucesso. A Undersoft entrará em contato com você assim que possível.",
    },

    hero: {
      eyebrow: "Automação e sistemas sob medida",
      titleLine1Before: "Pare de ",
      titleHighlight: "perder dinheiro",
      titleLine2: "com processos manuais.",
      text: "Cada processo manual automatizado é tempo e dinheiro de volta para o seu negócio. Automatizamos o que você já usa e criamos o sistema que falta, sem jogar fora o que já funciona.",
      ctaPrimary: "Solicitar análise gratuita",
      ctaSecondary: "Ver como funciona",
    },

    problemDemo: {
      title1: "O problema não é a ferramenta.",
      title2: "É depender de trabalho manual.",
      subtitle: "Cada pesquisa manual custa tempo e dinheiro, e abre espaço para erros. Veja a diferença em números reais.",
      manual: {
        title: "Sistema manual",
        timer: "Tempo gasto:",
        toastSaveError: "⚠️ Erro ao salvar! Verifique os campos destacados.",
        toastCustomerError: "⚠️ Erro: cliente não cadastrado. Verifique o nome.",
        totalBilled: "Total faturado:",
        profit: "Lucro (20%):",
        alertTitle: "Furo no caixa: R$ -40.500,00",
        alertNote: "(O operador digitou 4.500 em vez de 45.000 e o erro passou)",
        pains: [
          "Erros de digitação",
          "Tempo perdido pesquisando",
          "Sem validação automática",
          "Retrabalho em caso de erro",
          "Difícil de escalar",
        ],
      },
      auto: {
        title: "Sistema automatizado",
        timer: "Tempo gasto",
        toastStart: "Novo orçamento aprovado! Preenchendo...",
        toastApproved: "Novo orçamento aprovado: {name}",
        totalBilled: "Total faturado:",
        profit: "Lucro projetado (20%):",
        success: "100% de precisão. Nenhum centavo perdido.",
        gains: [
          "Validação automática",
          "Pesquisa instantânea",
          "Zero retrabalho",
          "Atualização em tempo real",
          "Escala sem esforço extra",
        ],
      },
      table: { customer: "Nome do cliente", amount: "Valor (R$)", invoice: "Código NFe" },
      dataset: [
        { name: "Under Ltda", amount: "15.450,00", invoice: "NFE-99281" },
        { name: "Under Consultoria", amount: "3.200,50", invoice: "NFE-99282" },
        { name: "Under Logística", amount: "45.000,00", invoice: "NFE-99283" },
        { name: "Under Tecnologia", amount: "9.890,90", invoice: "NFE-99284" },
      ],
      totals: { manualBilled: "R$ 33.041,40", manualProfit: "R$ 6.608,28", autoBilled: "R$ 73.541,40", autoProfit: "R$ 14.708,28" },
    },

    painPoints: {
      eyebrow: "O que ninguém percebe",
      titleLine1: "O processo até funciona.",
      titleLine2Before: "O que ninguém vê é o quanto a repetição manual ",
      titleHighlight: "está custando.",
      cards: [
        { title: "Informação duplicada", text: "Os mesmos dados são copiados entre arquivos, e-mails e sistemas diferentes." },
        { title: "Erros evitáveis", text: "Campos incorretos, versões desatualizadas e validações feitas só no final." },
        { title: "Tempo desperdiçado", text: "Horas consumidas em tarefas repetitivas que poderiam rodar sozinhas." },
        { title: "Dependência de pessoas", text: "Processos críticos ficam concentrados em quem conhece as planilhas e os atalhos." },
        { title: "Retrabalho constante", text: "Problemas simples viram correções, ligações e conferências manuais." },
        { title: "Falta de controle", text: "É difícil saber o que foi feito, por quem, quando e com base em qual informação." },
      ],
    },

    solution: {
      traditionalTitle: "Modelo tradicional",
      traditional: [
        "Trocar todas as ferramentas de uma só vez",
        "Obrigar a equipe a aprender um sistema novo",
        "Migrar todas as informações para outro sistema sem necessidade",
        "Pagar por funcionalidades que você não usa",
        "Adaptar a empresa às limitações do software",
      ],
      ourTitle: "Nosso modelo",
      ours: [
        "Manter as ferramentas que já funcionam",
        "Automatizar apenas onde há desperdício",
        "Adicionar validações e regras específicas",
        "Integrar ferramentas, bancos de dados e APIs, ou criar o sistema que falta",
        "Evoluir por etapas, com controle do investimento",
      ],
      eyebrow: "O diferencial da Undersoft",
      title: "Melhoramos o processo antes de sugerir uma substituição.",
      text: "Automatizamos o que já existe e, quando necessário, criamos o sistema sob medida. A tecnologia se adapta à operação da empresa, e não o contrário.",
    },

    services: {
      eyebrow: "Serviços",
      title: "O que podemos automatizar e criar para você",
      text: "Começamos pelos processos frequentes e mensuráveis. Conectamos o que já existe e, quando nada serve, criamos o sistema sob medida.",
      items: [
        { title: "Orçamentos", text: "Geração, cálculo, validação e organização de propostas comerciais." },
        { title: "Cadastro de clientes", text: "Dados centralizados e fim do preenchimento repetido das mesmas informações." },
        { title: "Validação de dados", text: "Regras automáticas que barram erros antes de entrarem no processo." },
        { title: "Integrações", text: "Conexão entre suas ferramentas, bancos de dados, serviços online e APIs." },
        { title: "Relatórios", text: "Informação consolidada, indicadores e acompanhamento claro das operações." },
        { title: "Processos internos", text: "Automação das tarefas administrativas que consomem tempo todos os dias." },
      ],
      custom: {
        title: "Sistemas sob medida",
        text: "Quando nenhuma ferramenta resolve o problema, criamos o aplicativo ou o painel interno de que a sua operação precisa, já conectado ao que a empresa utiliza.",
      },
    },

    integrations: {
      eyebrow: "Integrações",
      title: "Conectamos as ferramentas que você já usa.",
      text: "Trabalhamos com as ferramentas de gestão, faturamento e planilhas que sua equipe já utiliza, e com outros serviços por meio de APIs.",
      others: "+ Outras via API",
    },

    process: {
      eyebrow: "Como definimos o escopo",
      title: "Um processo simples, sem promessa vaga.",
      text: "Você saberá exatamente o que esperar em cada etapa, sem surpresas no meio do caminho.",
      steps: [
        { title: "Diagnóstico", text: "Mapeamento do processo, das falhas, das dependências e do tempo consumido." },
        { title: "Prioridade", text: "Escolha da parte com maior impacto e menor risco de implementação." },
        { title: "Proposta", text: "Escopo, prazo, investimento e resultado esperado." },
        { title: "Implementação", text: "Desenvolvimento e integração sem interromper a operação atual." },
        { title: "Evolução", text: "Manutenção, novas regras e melhorias conforme a necessidade real." },
      ],
    },

    reviews: {
      eyebrow: "Avaliações",
      title: "O que nossos clientes dizem.",
      text: "Equipes que passaram a dedicar o tempo ao que realmente importa.",
      regionLabel: "Avaliações de clientes",
      carousel: "carrossel",
      prev: "Avaliação anterior",
      next: "Próxima avaliação",
      goTo: "Ir para o slide {n}",
      pickLabel: "Escolher avaliação",
      stars: "5 de 5 estrelas",
      items: [
        {
          quote: "Antes a gente recebia pedido por WhatsApp, anotava num papel e passava pra cozinha, e erro de endereço ou de complemento era rotina. Depois que fizeram o sistema de delivery, o pedido chega organizado e a cozinha vê tudo numa tela só. O faturamento do delivery cresceu bastante nos primeiros meses, e no fim do dia eu gasto bem menos tempo conferindo o caixa.",
          name: "Geocátia Silva",
          role: "Fundadora, Stara açai",
        },
        {
          quote: "Minha agenda era um caderno e as finanças ficavam numa planilha que nunca fechava com o caixa. Hoje a cliente agenda e paga o sinal pelo próprio link, e as faltas diminuíram muito. Gosto de abrir o resumo financeiro da semana sem precisar montar nada. Na primeira quinzena precisamos de alguns ajustes, e a Undersoft resolveu tudo rápido.",
          name: "Kerolai Bonifácio",
          role: "Fundadora, Kb Studio",
        },
        {
          quote: "Minha loja virtual já funcionava, mas estoque e pedidos não se comunicavam com o sistema de gestão, e eu digitava tudo duas vezes. Eles ligaram as duas pontas sem me obrigar a trocar o que eu já usava. Agora o estoque baixa sozinho e o financeiro bate com as vendas. Acabou o retrabalho e as divergências de estoque.",
          name: "Lucas Gonçalves",
          role: "Empresário, Postati",
        },
        {
          quote: "Fechei com a Undersoft para criar a loja online já pensando em conectá-la ao que usamos internamente. A entrega saiu dentro do prazo combinado, com a parte financeira integrada, e isso me evitou contratar outro fornecedor. O suporte depois do lançamento continua atento. Pedi duas mudanças no checkout e ficaram prontas na mesma semana.",
          name: "Robert Bonifácio",
          role: "Sócio-fundador, RBM Portas e Janelas",
        },
        {
          quote: "Matrículas, cobranças e controle de acesso eram feitos separadamente, e a recepção perdia muito tempo com isso. O sistema reuniu tudo e passou a avisar sobre as mensalidades automaticamente. A inadimplência caiu e os alunos comentaram que ficou mais fácil resolver as coisas. Foi um investimento que se pagou.",
          name: "Gabriel Marantnes",
          role: "Administrador, Marant Fitness",
        },
        {
          quote: "O assistente que a Undersoft implantou atende os contatos que chegam, entende o que a pessoa precisa e marca a reunião direto na minha agenda. Antes eu perdia lead fora do horário comercial. Ele não resolve tudo, e quando o assunto foge do padrão passa a conversa pra mim, que era o comportamento que eu queria.",
          name: "Tomás Santos",
          role: "Empresário, TSK Marketing",
        },
      ],
    },

    about: {
      eyebrow: "Sobre nós",
      titleLine1: "Não vendemos software.",
      titleLine2: "Devolvemos tempo e controle à sua operação.",
      p1: "A Undersoft nasceu para simplificar os sistemas das empresas. Automatizamos processos e criamos sistemas sob medida para empresas que não querem mais perder dinheiro com trabalho manual.",
      p2: "Em negócios demais, a tecnologia dá mais trabalho do que economiza: planilhas soltas, tarefas repetidas e ferramentas que não conversam entre si. Conectamos o que você já usa e criamos o que falta, com diagnóstico prévio, escopo e prazos por escrito e entrega por etapas.",
      cta: "Fale conosco",
      imageAlt: "Undersoft, soluções empresariais",
      badgeName: "Undersoft",
      badgeTagline: "Soluções empresariais",
      commitments: [
        { big: "Propósito", small: "Eliminar o trabalho manual que consome tempo, dinheiro e atenção das equipes." },
        { big: "Especialidade", small: "Automação de processos e sistemas sob medida, integrados às ferramentas que a empresa já utiliza." },
        { big: "Princípio", small: "Cada solução parte do processo real do cliente, nunca de um produto pré-definido." },
        { big: "Compromisso", small: "Rigor técnico e transparência total, do diagnóstico à entrega." },
      ],
    },

    diagnostic: {
      eyebrow: "Primeira etapa",
      title: "Entender o processo antes de propor uma solução.",
      p1: "O primeiro contato serve para entender como a empresa trabalha hoje, onde há perda de tempo e se existe margem real para automatizar.",
      p2: "Sem compromisso e sem custo. Só depois dessa análise faz sentido definir escopo, prioridades e uma proposta adequada.",
      cta: "Descrever meu processo",
    },

    contact: {
      eyebrow: "Contato",
      title: "Entender o processo antes de propor uma solução.",
      p1: "O primeiro contato serve para entender como a empresa trabalha hoje, onde há perda de tempo e se existe margem real para automatizar.",
      p2: "Sem compromisso e sem custo. Só depois dessa análise faz sentido definir escopo, prioridades e uma proposta adequada.",
      whatsapp: "Falar no WhatsApp",
      form: {
        name: "Nome*",
        namePlaceholder: "João Silva",
        email: "E-mail*",
        emailPlaceholder: "seuemail@email.com",
        message: "Qual processo você quer melhorar?*",
        messagePlaceholder: "Perco horas por semana organizando pedidos manualmente...",
        acceptPrefix: "Aceito os",
        terms: "termos e condições",
        and: "e a",
        privacy: "Política de Privacidade",
        honeypot: "Não preencher",
        subject: "Novo contato através de undersoft.pt",
        button: { idle: "Solicitar minha proposta", validating: "Validando...", sending: "Enviando..." },
        errorValidate:
          "Não foi possível validar a solicitação. Atualize a página e tente novamente ou escreva para contacto@undersoft.pt.",
        errorSend: "Não foi possível enviar a solicitação. Tente novamente ou escreva para contacto@undersoft.pt.",
      },
    },

    faq: {
      eyebrow: "Perguntas frequentes",
      title: "Suas dúvidas, respondidas",
      more: "Ficou com outra dúvida? Fale conosco →",
      items: [
        {
          question: "Vou ter que trocar as ferramentas que já uso?",
          answer: "Não. A automação é integrada às ferramentas que a sua equipe já utiliza, sem interromper a operação atual.",
        },
        {
          question: "E se o meu processo for muito específico ou nenhuma ferramenta resolver?",
          answer:
            "Cada processo é analisado antes de propormos qualquer solução. Quando nada do que existe resolve o problema, criamos um sistema sob medida, conectado ao que a empresa já utiliza.",
        },
        {
          question: "Como o processo começa?",
          answer:
            "Com uma primeira análise, sem custo e sem compromisso: entendemos como a empresa trabalha hoje e se existe margem real para automatizar. Só depois definimos escopo, prioridades e uma proposta adequada.",
        },
        {
          question: "Quanto tempo leva a implementação?",
          answer:
            "Depende da complexidade do processo, mas trabalhamos por etapas, começando pela parte com maior impacto e menor risco. Assim você vê resultado sem esperar um projeto de meses.",
        },
        {
          question: "Quanto custa?",
          answer:
            "A primeira análise é gratuita e sem compromisso. Depois, definimos escopo, prazo e investimento em uma proposta adequada ao seu processo. Como trabalhamos por etapas, você mantém o controle do investimento.",
        },
        {
          question: "Preciso de conhecimento técnico para usar o que for automatizado?",
          answer:
            "Não. O objetivo é que a sua equipe tenha menos tarefas repetitivas, sem precisar dominar a tecnologia por trás.",
        },
        {
          question: "E depois da implementação, há acompanhamento?",
          answer:
            "Sim. Depois da implementação, acompanhamos o que foi criado, com manutenção, novas regras e melhorias conforme a necessidade real da sua operação.",
        },
      ],
    },

    cta: {
      words: ["Automatize", "Otimize", "Aprimore", "Crie"],
      processes: "processos",
      without: " sem",
      withoutStart: "sem ",
      titleLine2: "jogar fora o que já funciona.",
      text: "Sua empresa não precisa trocar de sistema para parar de perder tempo com trabalho manual. Conectamos o que você já usa e, quando faz sentido, criamos o sistema que falta, eliminando o trabalho repetitivo em semanas, não em meses.",
      button: "Quero analisar meu processo",
    },

    // Popup de consentimento de cookies (Lei n.º 41/2004 e RGPD). Categorias em src/lib/consent.js.
    cookieConsent: {
      regionLabel: "Consentimento de cookies",
      title: "Cookies",
      text: "Usamos cookies essenciais e, com o seu consentimento, outros opcionais. Você pode aceitar, rejeitar ou personalizar a qualquer momento.",
      policyPrefix: "Saiba mais na nossa",
      policyLink: "Política de Cookies",
      acceptAll: "Aceitar todos",
      rejectAll: "Rejeitar opcionais",
      customize: "Personalizar",
      detailsTitle: "Preferências de cookies",
      detailsText: "Escolha as categorias que você autoriza. Os cookies estritamente necessários não podem ser desativados, pois sem eles o site não funciona. Saiba mais na nossa",
      alwaysActive: "Sempre ativo",
      save: "Salvar escolhas",
      back: "Voltar",
      categories: {
        necessary: {
          title: "Estritamente necessários",
          text: "Garantem o funcionamento e a segurança do site: lembrar a sua escolha de cookies, restaurar a posição de leitura ao recarregar a página e proteger o formulário de contato contra abusos. Não exigem consentimento.",
        },
        preferences: {
          title: "Preferências",
          text: "Lembram as suas escolhas entre visitas, como o idioma do site.",
        },
        analytics: {
          title: "Estatísticas",
          text: "Ajudam a entender, de forma agregada, como o site é usado para melhorá-lo. Atualmente, o site não usa ferramentas desta categoria.",
        },
        marketing: {
          title: "Marketing",
          text: "Permitem medir campanhas e exibir conteúdos relevantes. Atualmente, o site não usa ferramentas desta categoria.",
        },
      },
    },

    floatingCta: { label: "Fale conosco" },

    successDialog: {
      title: "Solicitação enviada com sucesso",
      text: "Recebemos sua mensagem. Entraremos em contato assim que possível.",
      ok: "OK",
    },

    notFound: {
      meta: "Página não encontrada | Undersoft",
      title: "Página não encontrada",
      lead: "A página que você procura não existe ou foi movida. Volte ao início para continuar.",
      back: "Voltar ao início",
    },

    thanks: {
      title: "Solicitação enviada com sucesso",
      lead: "Obrigado pelo seu contato. Recebemos sua mensagem e entraremos em contato assim que possível.",
      stepsLabel: "Próximos passos",
      steps: [
        { title: "Analisamos sua solicitação", text: "Lemos com atenção o processo que você descreveu." },
        { title: "Conversamos com você", text: "Para entender como a empresa trabalha hoje e onde se perde tempo." },
        { title: "Proposta sob medida", text: "Só depois dessa análise definimos escopo, prioridades e proposta." },
      ],
      back: "Voltar ao site",
      whatsappPrefix: "Prefere falar agora?",
      whatsappLabel: "Falar no WhatsApp",
    },

    termsDialog: {
      lastUpdated: "Última atualização:",
      close: "Fechar",
      accept: "Li e aceito",
    },
    legalPage: {
      toc: "Neste documento",
      others: "Outros documentos",
      tocAria: "Índice do documento",
      othersAria: "Outros documentos legais",
    },
  },

  en: {
    nav: {
      solution: "Solution",
      services: "Services",
      process: "Process",
      reviews: "Reviews",
      about: "About us",
      faq: "FAQ",
      home: "Home",
      contact: "Contact",
    },
    header: {
      cta: "Contact us",
      mainNav: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      backHome: "Back to site",
      backHomeAria: "Undersoft, back to home page",
    },
    footer: {
      tagline: "Time wasted on manual processes is profitability that never reaches your business.",
      navigation: "Navigation",
      institutional: "Company",
      complaints: "Complaints Book",
      contact: "Contact",
      rights: "All rights reserved.",
      terms: "Terms and Conditions",
      service: "Terms of Service",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      cookieSettings: "Cookie settings",
    },

    // ---------------------------------------------------------------------
    // Conteúdo das secções da página (inglês). Mesma ordem em que aparecem no site.
    // Marcadores como {name} e {n} são substituídos em runtime.
    // ---------------------------------------------------------------------
    meta: {
      title: "Undersoft | Business Automation",
      description:
        "Undersoft automates business processes and builds custom systems, without forcing your team to abandon the tools it already uses.",
      thanksTitle: "Thank you | Undersoft",
      thanksDescription: "Request sent successfully. Undersoft will be in touch as soon as possible.",
    },

    hero: {
      eyebrow: "Custom automation and systems",
      titleLine1Before: "Stop ",
      titleHighlight: "losing money",
      titleLine2: "to manual processes.",
      text: "Every manual process you automate gives time and money back to your business. We automate the tools you already use and build the system that's missing, without throwing out what already works.",
      ctaPrimary: "Get a free assessment",
      ctaSecondary: "See how it works",
    },

    problemDemo: {
      title1: "The problem isn't the tool.",
      title2: "It's relying on manual work.",
      subtitle: "Every manual lookup costs time and money, and opens the door to errors. See the difference in real numbers.",
      manual: {
        title: "Manual system",
        timer: "Time spent:",
        toastSaveError: "⚠️ Error saving! Check the highlighted fields.",
        toastCustomerError: "⚠️ Error: customer not found. Check the name.",
        totalBilled: "Total billed:",
        profit: "Profit (20%):",
        alertTitle: "Cash shortfall: R$ -40,500.00",
        alertNote: "(The operator typed 4,500 instead of 45,000 and the error went through)",
        pains: [
          "Typing errors",
          "Time lost searching",
          "No automatic validation",
          "Rework whenever something goes wrong",
          "Hard to scale",
        ],
      },
      auto: {
        title: "Automated system",
        timer: "Time spent",
        toastStart: "New quote approved! Filling in...",
        toastApproved: "New quote approved: {name}",
        totalBilled: "Total billed:",
        profit: "Projected profit (20%):",
        success: "100% accuracy. Not a cent lost.",
        gains: [
          "Automatic validation",
          "Instant lookup",
          "Zero rework",
          "Real-time updates",
          "Scales with no extra effort",
        ],
      },
      table: { customer: "Customer name", amount: "Amount ($)", invoice: "Invoice code" },
      // Valores do exemplo, já no formato numérico inglês
      dataset: [
        { name: "Under Ltda", amount: "15,450.00", invoice: "NFE-99281" },
        { name: "Under Consultoria", amount: "3,200.50", invoice: "NFE-99282" },
        { name: "Under Logística", amount: "45,000.00", invoice: "NFE-99283" },
        { name: "Under Tecnologia", amount: "9,890.90", invoice: "NFE-99284" },
      ],
      totals: { manualBilled: "R$ 33,041.40", manualProfit: "R$ 6,608.28", autoBilled: "R$ 73,541.40", autoProfit: "R$ 14,708.28" },
    },

    painPoints: {
      eyebrow: "What nobody notices",
      titleLine1: "The process does work.",
      titleLine2Before: "What nobody sees is what manual repetition is ",
      titleHighlight: "costing you.",
      cards: [
        { title: "Duplicated information", text: "The same data gets copied between files, emails and different systems." },
        { title: "Avoidable errors", text: "Wrong fields, outdated versions and checks left until the very end." },
        { title: "Wasted time", text: "Hours lost to repetitive tasks that could run on their own." },
        { title: "Dependence on key people", text: "Critical processes sit with whoever knows the spreadsheets and the shortcuts." },
        { title: "Constant rework", text: "Small problems snowball into fixes, phone calls and manual double-checking." },
        { title: "Lack of control", text: "It's hard to tell what was done, by whom, when, and based on what information." },
      ],
    },

    solution: {
      traditionalTitle: "The traditional model",
      traditional: [
        "Replace all your tools at once",
        "Force your team to learn a new system",
        "Migrate all your data to another system for no good reason",
        "Pay for features you never use",
        "Bend your business around the software's limitations",
      ],
      ourTitle: "Our model",
      ours: [
        "Keep the tools that already work",
        "Automate only where there's waste",
        "Add specific validations and rules",
        "Connect your tools, databases and APIs, or build the system that's missing",
        "Evolve in phases, with control over your investment",
      ],
      eyebrow: "The Undersoft difference",
      title: "We improve the process before suggesting a replacement.",
      text: "We automate what already exists and, when needed, build a system tailored to you. Technology adapts to how your business operates, not the other way round.",
    },

    services: {
      eyebrow: "Services",
      title: "What we can automate and build for you",
      text: "We start with frequent, measurable processes. We connect what you already have and, when nothing fits, we build a custom system.",
      items: [
        { title: "Quoting", text: "Generation, calculation, validation and organisation of commercial proposals." },
        { title: "Customer records", text: "One central source for customer data, and no more retyping the same details." },
        { title: "Data validation", text: "Automatic rules that stop errors before they enter the process." },
        { title: "Integrations", text: "Links between your tools, databases, online services and APIs." },
        { title: "Reporting", text: "Consolidated information, key metrics and clear tracking of your operations." },
        { title: "Internal processes", text: "Automation of the admin tasks that eat up your time every single day." },
      ],
      custom: {
        title: "Custom systems",
        text: "When no off-the-shelf tool solves the problem, we build the app or internal dashboard your operation needs, already connected to what your company uses.",
      },
    },

    integrations: {
      eyebrow: "Integrations",
      title: "We connect the tools you already use.",
      text: "We work with the management, invoicing and spreadsheet tools your team already uses, and with other services through APIs.",
      others: "+ Others via API",
    },

    process: {
      eyebrow: "How we define the scope",
      title: "A simple process, with no vague promises.",
      text: "You'll know exactly what to expect at every stage, with no surprises along the way.",
      steps: [
        { title: "Diagnosis", text: "Mapping the process, its gaps, dependencies and the time it consumes." },
        { title: "Prioritisation", text: "Choosing the part with the highest impact and the lowest implementation risk." },
        { title: "Proposal", text: "Scope, timeline, investment and expected outcome." },
        { title: "Implementation", text: "Development and integration without interrupting your current operations." },
        { title: "Evolution", text: "Maintenance, new rules and improvements as real needs arise." },
      ],
    },

    reviews: {
      eyebrow: "Reviews",
      title: "What our clients say.",
      text: "Teams that now spend their time on what really matters.",
      regionLabel: "Customer reviews",
      carousel: "carousel",
      prev: "Previous review",
      next: "Next review",
      goTo: "Go to slide {n}",
      pickLabel: "Choose review",
      stars: "5 out of 5 stars",
      items: [
        {
          quote:
            "We used to get orders over WhatsApp, jot them down on paper and pass them to the kitchen, and mistakes with addresses or delivery notes were routine. Since they built the delivery system, orders arrive organised and the kitchen sees everything on one screen. Delivery revenue grew significantly in the first few months, and at the end of the day I spend far less time checking the till.",
          name: "Geocátia Silva",
          role: "Founder, Stara açai",
        },
        {
          quote:
            "My diary was a notebook and my finances lived in a spreadsheet that never matched the till. Now clients book and pay their deposit through their own link, and no-shows have dropped a lot. I like opening the weekly financial summary without having to put anything together. In the first two weeks we needed a few adjustments, and Undersoft sorted everything out quickly.",
          name: "Kerolai Bonifácio",
          role: "Founder, Kb Studio",
        },
        {
          quote:
            "My online shop was already up and running, but stock and orders didn't talk to the management system, and I was typing everything in twice. They connected the two ends without making me switch what I already used. Now stock updates on its own and the accounts match sales. The rework and the stock discrepancies are gone.",
          name: "Lucas Gonçalves",
          role: "Business owner, Postati",
        },
        {
          quote:
            "I hired Undersoft to build the online shop with a view to connecting it to what we use internally. Delivery came in on the agreed deadline, with finance integrated, which saved me from hiring another supplier. Support after launch is still attentive. I asked for two checkout changes and they were done the same week.",
          name: "Robert Bonifácio",
          role: "Co-founder, RBM Portas e Janelas",
        },
        {
          quote:
            "Enrolments, billing and access control were all handled separately, and reception lost a lot of time on it. The system brought everything together and now sends membership payment reminders automatically. Late payments dropped, and members told us it had become easier to sort things out. It was an investment that paid for itself.",
          name: "Gabriel Marantnes",
          role: "Administrator, Marant Fitness",
        },
        {
          quote:
            "The assistant Undersoft set up handles incoming enquiries, understands what the person needs and books the meeting straight into my calendar. Before, I was losing leads outside business hours. It doesn't solve everything, and when a topic falls outside the norm it hands the conversation over to me, which is exactly the behaviour I wanted.",
          name: "Tomás Santos",
          role: "Business owner, TSK Marketing",
        },
      ],
    },

    about: {
      eyebrow: "About us",
      titleLine1: "We don't sell software.",
      titleLine2: "We give your operation back its time and control.",
      p1: "Undersoft was founded to make business systems simpler. We automate processes and build custom systems for companies that no longer want to lose money on manual work.",
      p2: "In too many businesses, technology creates more work than it saves: loose spreadsheets, repeated tasks and tools that don't talk to each other. We connect what you already use and build what's missing, with an upfront diagnosis, scope and timelines in writing, and delivery in phases.",
      cta: "Talk to us",
      imageAlt: "Undersoft, business solutions",
      badgeName: "Undersoft",
      badgeTagline: "Business solutions",
      commitments: [
        { big: "Purpose", small: "To eliminate the manual work that drains teams of time, money and attention." },
        { big: "Expertise", small: "Process automation and custom systems, integrated into the tools your company already uses." },
        { big: "Principle", small: "Every solution starts from the client's real process, never from a predefined product." },
        { big: "Commitment", small: "Technical rigour and complete transparency, from diagnosis to delivery." },
      ],
    },

    diagnostic: {
      eyebrow: "First step",
      title: "Understand the process before proposing a solution.",
      p1: "The first conversation is about understanding how your company works today, where time is being lost and whether there's real room to automate.",
      p2: "No obligation and no cost. Only after that analysis does it make sense to define scope, priorities and a suitable proposal.",
      cta: "Describe my process",
    },

    contact: {
      eyebrow: "Contact",
      title: "Understand the process before proposing a solution.",
      p1: "The first conversation is about understanding how your company works today, where time is being lost and whether there's real room to automate.",
      p2: "No obligation and no cost. Only after that analysis does it make sense to define scope, priorities and a suitable proposal.",
      whatsapp: "Chat on WhatsApp",
      form: {
        name: "Name*",
        namePlaceholder: "John Smith",
        email: "Email*",
        emailPlaceholder: "youremail@email.com",
        message: "Which process do you want to improve?*",
        messagePlaceholder: "I spend hours every week organising orders by hand...",
        acceptPrefix: "I accept the",
        terms: "terms and conditions",
        and: "and the",
        privacy: "Privacy Policy",
        honeypot: "Do not fill in",
        subject: "New enquiry via undersoft.pt",
        button: { idle: "Request my proposal", validating: "Validating...", sending: "Sending..." },
        errorValidate:
          "We couldn't validate your request. Refresh the page and try again, or email contacto@undersoft.pt.",
        errorSend: "We couldn't send your request. Please try again or email contacto@undersoft.pt.",
      },
    },

    faq: {
      eyebrow: "Frequently asked questions",
      title: "Your questions, answered",
      more: "Still have a question? Talk to us →",
      items: [
        {
          question: "Will I have to replace the tools I already use?",
          answer:
            "No. The automation plugs into the tools your team already uses, without interrupting your current operations.",
        },
        {
          question: "What if my process is very specific, or no tool solves it?",
          answer:
            "We analyse every process before proposing any solution. When nothing on the market solves the problem, we build a custom system, connected to what your company already uses.",
        },
        {
          question: "How does the process start?",
          answer:
            "With an initial assessment, at no cost and with no obligation: we understand how your company works today and whether there's real room to automate. Only then do we define scope, priorities and a suitable proposal.",
        },
        {
          question: "How long does implementation take?",
          answer:
            "It depends on the complexity of the process, but we work in phases, starting with the part with the highest impact and the lowest risk. That means you see results without waiting months for a project to finish.",
        },
        {
          question: "How much does it cost?",
          answer:
            "The initial assessment is free and carries no obligation. After that, we set out scope, timeline and investment in a proposal tailored to your process. Because we work in phases, you stay in control of your investment.",
        },
        {
          question: "Do I need technical knowledge to use what gets automated?",
          answer:
            "No. The goal is for your team to have fewer repetitive tasks, without having to master the technology behind them.",
        },
        {
          question: "Is there support after implementation?",
          answer:
            "Yes. After implementation we keep supporting what we built, with maintenance, new rules and improvements based on the real needs of your operation.",
        },
      ],
    },

    cta: {
      // O cursor digita estas palavras antes de "processes without..."
      words: ["Automate", "Optimise", "Refine", "Create"],
      processes: "processes",
      without: " without",
      withoutStart: "without ",
      titleLine2: "throwing away what already works.",
      text: "Your company doesn't need to switch systems to stop losing time to manual work. We connect what you already use and, when it makes sense, build the system that's missing, eliminating repetitive work in weeks, not months.",
      button: "Analyse my process",
    },

    // Popup de consentimento de cookies (Lei n.º 41/2004 e RGPD). Categorias em src/lib/consent.js.
    cookieConsent: {
      regionLabel: "Cookie consent",
      title: "Cookies",
      text: "We use essential cookies and, with your consent, optional ones. You can accept, reject or customise at any time.",
      policyPrefix: "Learn more in our",
      policyLink: "Cookie Policy",
      acceptAll: "Accept all",
      rejectAll: "Reject optional",
      customize: "Customise",
      detailsTitle: "Cookie preferences",
      detailsText: "Choose which categories you allow. Strictly necessary cookies cannot be turned off, because the website does not work without them. Learn more in our",
      alwaysActive: "Always active",
      save: "Save choices",
      back: "Back",
      categories: {
        necessary: {
          title: "Strictly necessary",
          text: "They keep the website working and secure: remembering your cookie choice, restoring your reading position when the page is reloaded and protecting the contact form from abuse. They do not require consent.",
        },
        preferences: {
          title: "Preferences",
          text: "They remember your choices between visits, such as the website language.",
        },
        analytics: {
          title: "Statistics",
          text: "They help us understand, in aggregate, how the website is used so we can improve it. The website does not currently use tools in this category.",
        },
        marketing: {
          title: "Marketing",
          text: "They allow campaigns to be measured and relevant content to be shown. The website does not currently use tools in this category.",
        },
      },
    },

    floatingCta: { label: "Talk to us" },

    successDialog: {
      title: "Request sent successfully",
      text: "We've received your message. We'll be in touch as soon as possible.",
      ok: "OK",
    },

    notFound: {
      meta: "Page not found | Undersoft",
      title: "Page not found",
      lead: "The page you are looking for doesn't exist or has been moved. Go back home to continue.",
      back: "Back to home",
    },

    thanks: {
      title: "Request sent successfully",
      lead: "Thank you for getting in touch. We've received your message and we'll be in touch as soon as possible.",
      stepsLabel: "Next steps",
      steps: [
        { title: "We review your request", text: "We read carefully through the process you described." },
        { title: "We get in touch", text: "To understand how your company works today and where time is being lost." },
        { title: "A tailored proposal", text: "Only after that analysis do we define scope, priorities and a proposal." },
      ],
      back: "Back to site",
      whatsappPrefix: "Prefer to talk now?",
      whatsappLabel: "Chat on WhatsApp",
    },

    termsDialog: {
      lastUpdated: "Last updated:",
      close: "Close",
      accept: "I have read and accept",
    },
    legalPage: {
      toc: "In this document",
      others: "Other documents",
      tocAria: "Document index",
      othersAria: "Other legal documents",
    },
  },

  es: {
    nav: {
      solution: "Solución",
      services: "Servicios",
      process: "Proceso",
      reviews: "Opiniones",
      about: "Sobre nosotros",
      faq: "FAQ",
      home: "Inicio",
      contact: "Contacto",
    },
    header: {
      cta: "Contactar",
      mainNav: "Navegación principal",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
      backHome: "Volver al sitio",
      backHomeAria: "Undersoft, volver a la página de inicio",
    },
    footer: {
      tagline: "El tiempo perdido en procesos manuales es rentabilidad que nunca llega a su negocio.",
      navigation: "Navegación",
      institutional: "Institucional",
      complaints: "Libro de Reclamaciones",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
      terms: "Términos y Condiciones",
      service: "Términos de Servicio",
      privacy: "Política de Privacidad",
      cookies: "Política de Cookies",
      cookieSettings: "Ajustes de cookies",
    },

    // ---------------------------------------------------------------------
    // Contenido de las secciones de la página (español).
    // ---------------------------------------------------------------------
    meta: {
      title: "Undersoft | Automatización Empresarial",
      description:
        "Undersoft automatiza procesos empresariales y crea sistemas a medida, sin obligar a su equipo a abandonar las herramientas que ya utiliza.",
      thanksTitle: "Gracias | Undersoft",
      thanksDescription: "Solicitud enviada correctamente. Undersoft se pondrá en contacto con usted lo antes posible.",
    },

    hero: {
      eyebrow: "Automatización y sistemas a medida",
      titleLine1Before: "Deje de ",
      titleHighlight: "perder dinero",
      titleLine2: "con procesos manuales.",
      text: "Cada proceso manual que se automatiza es tiempo y dinero que vuelve a su negocio. Automatizamos lo que ya utiliza y creamos el sistema que falta, sin tirar por la borda lo que ya funciona.",
      ctaPrimary: "Solicitar análisis gratuito",
      ctaSecondary: "Ver cómo funciona",
    },

    problemDemo: {
      title1: "El problema no es la herramienta.",
      title2: "Es depender del trabajo manual.",
      subtitle: "Cada búsqueda manual cuesta tiempo y dinero, y abre la puerta a los errores. Compruebe la diferencia con cifras reales.",
      manual: {
        title: "Sistema manual",
        timer: "Tiempo empleado:",
        toastSaveError: "⚠️ ¡Error al guardar! Revise los campos resaltados.",
        toastCustomerError: "⚠️ Error: cliente no registrado. Revise el nombre.",
        totalBilled: "Total facturado:",
        profit: "Beneficio (20%):",
        alertTitle: "Descuadre de caja: R$ -40.500,00",
        alertNote: "(El operario tecleó 4.500 en lugar de 45.000 y el error pasó inadvertido)",
        pains: [
          "Errores de tecleo",
          "Tiempo perdido buscando datos",
          "Sin validación automática",
          "Reprocesos cuando hay un error",
          "Difícil de escalar",
        ],
      },
      auto: {
        title: "Sistema automatizado",
        timer: "Tiempo empleado",
        toastStart: "¡Nuevo presupuesto aprobado! Rellenando...",
        toastApproved: "Nuevo presupuesto aprobado: {name}",
        totalBilled: "Total facturado:",
        profit: "Beneficio proyectado (20%):",
        success: "100 % de precisión. Ni un céntimo perdido.",
        gains: [
          "Validación automática",
          "Búsqueda instantánea",
          "Cero reprocesos",
          "Actualización en tiempo real",
          "Escala sin esfuerzo extra",
        ],
      },
      table: { customer: "Nombre del cliente", amount: "Importe (€)", invoice: "Código de factura" },
      dataset: [
        { name: "Under Ltda", amount: "15.450,00", invoice: "NFE-99281" },
        { name: "Under Consultoria", amount: "3.200,50", invoice: "NFE-99282" },
        { name: "Under Logística", amount: "45.000,00", invoice: "NFE-99283" },
        { name: "Under Tecnologia", amount: "9.890,90", invoice: "NFE-99284" },
      ],
      totals: { manualBilled: "R$ 33.041,40", manualProfit: "R$ 6.608,28", autoBilled: "R$ 73.541,40", autoProfit: "R$ 14.708,28" },
    },

    painPoints: {
      eyebrow: "Lo que nadie ve",
      titleLine1: "El proceso funciona.",
      titleLine2Before: "Lo que nadie ve es lo que la repetición manual ",
      titleHighlight: "le está costando.",
      cards: [
        { title: "Información duplicada", text: "Los mismos datos se copian entre archivos, correos y sistemas distintos." },
        { title: "Errores evitables", text: "Campos incorrectos, versiones desactualizadas y validaciones que llegan solo al final." },
        { title: "Tiempo desperdiciado", text: "Horas consumidas en tareas repetitivas que podrían ejecutarse solas." },
        { title: "Dependencia de personas", text: "Los procesos críticos se concentran en quien conoce los archivos y los atajos." },
        { title: "Reprocesos constantes", text: "Los problemas simples se convierten en correcciones, llamadas y comprobaciones manuales." },
        { title: "Falta de control", text: "Es difícil saber qué se hizo, quién lo hizo, cuándo y con qué información." },
      ],
    },

    solution: {
      traditionalTitle: "Modelo tradicional",
      traditional: [
        "Cambiar todas las herramientas de golpe",
        "Obligar al equipo a aprender un sistema nuevo",
        "Migrar toda la información a otro sistema sin necesidad",
        "Pagar por funcionalidades que no utiliza",
        "Adaptar la empresa a las limitaciones del software",
      ],
      ourTitle: "Nuestro modelo",
      ours: [
        "Mantener las herramientas que ya funcionan",
        "Automatizar solo donde hay desperdicio",
        "Añadir validaciones y reglas específicas",
        "Integrar herramientas, bases de datos y APIs, o crear el sistema que falta",
        "Evolucionar por fases, con control de la inversión",
      ],
      eyebrow: "El diferencial de Undersoft",
      title: "Mejoramos el proceso antes de proponer un reemplazo.",
      text: "Automatizamos lo que ya existe y, cuando hace falta, creamos el sistema a medida. La tecnología se adapta a la operación de la empresa, y no al revés.",
    },

    services: {
      eyebrow: "Servicios",
      title: "Qué podemos automatizar y crear para usted",
      text: "Empezamos por los procesos frecuentes y medibles. Conectamos lo que ya existe y, cuando nada encaja, creamos el sistema a medida.",
      items: [
        { title: "Presupuestos", text: "Generación, cálculo, validación y organización de propuestas comerciales." },
        { title: "Registro de clientes", text: "Datos centralizados y fin de rellenar una y otra vez la misma información." },
        { title: "Validación de datos", text: "Reglas automáticas que frenan los errores antes de que entren en el proceso." },
        { title: "Integraciones", text: "Conexión entre sus herramientas, bases de datos, servicios online y APIs." },
        { title: "Informes", text: "Información consolidada, indicadores y seguimiento claro de las operaciones." },
        { title: "Procesos internos", text: "Automatización de las tareas administrativas que le quitan tiempo cada día." },
      ],
      custom: {
        title: "Sistemas a medida",
        text: "Cuando ninguna herramienta resuelve el problema, creamos la aplicación o el panel interno que su operación necesita, ya conectado con lo que utiliza la empresa.",
      },
    },

    integrations: {
      eyebrow: "Integraciones",
      title: "Conectamos las herramientas que ya utiliza.",
      text: "Trabajamos con las herramientas de gestión, facturación y hojas de cálculo que su equipo ya usa, y con otros servicios a través de APIs.",
      others: "+ Otras vía API",
    },

    process: {
      eyebrow: "Cómo definimos el alcance",
      title: "Un proceso sencillo, sin promesas vagas.",
      text: "Sabrá exactamente qué esperar en cada etapa, sin sorpresas por el camino.",
      steps: [
        { title: "Diagnóstico", text: "Mapeo del proceso, sus fallos, dependencias y el tiempo que consume." },
        { title: "Prioridad", text: "Elección de la parte con mayor impacto y menor riesgo de implementación." },
        { title: "Propuesta", text: "Alcance, plazo, inversión y resultado esperado." },
        { title: "Implementación", text: "Desarrollo e integración sin interrumpir la operación actual." },
        { title: "Evolución", text: "Mantenimiento, nuevas reglas y mejoras según la necesidad real." },
      ],
    },

    reviews: {
      eyebrow: "Opiniones",
      title: "Lo que dicen nuestros clientes.",
      text: "Equipos que ahora dedican su tiempo a lo que de verdad importa.",
      regionLabel: "Opiniones de clientes",
      carousel: "carrusel",
      prev: "Opinión anterior",
      next: "Siguiente opinión",
      goTo: "Ir a la diapositiva {n}",
      pickLabel: "Elegir opinión",
      stars: "5 de 5 estrellas",
      items: [
        {
          quote:
            "Antes recibíamos los pedidos por WhatsApp, los apuntábamos en un papel y se los pasábamos a la cocina, y los errores con la dirección o el piso eran lo normal. Desde que hicieron el sistema de delivery, el pedido llega ordenado y la cocina lo ve todo en una sola pantalla. La facturación del delivery creció bastante en los primeros meses, y al final del día dedico mucho menos tiempo a cuadrar la caja.",
          name: "Geocátia Silva",
          role: "Fundadora, Stara açai",
        },
        {
          quote:
            "Mi agenda era un cuaderno y las finanzas estaban en una hoja de cálculo que nunca cuadraba con la caja. Ahora la clienta reserva y paga la señal desde su propio enlace, y las ausencias han bajado mucho. Me encanta abrir el resumen financiero de la semana sin tener que preparar nada. En la primera quincena necesitamos algunos ajustes, y Undersoft lo resolvió todo rápido.",
          name: "Kerolai Bonifácio",
          role: "Fundadora, Kb Studio",
        },
        {
          quote:
            "Mi tienda online ya funcionaba, pero el stock y los pedidos no se comunicaban con el sistema de gestión, y yo lo tecleaba todo dos veces. Conectaron ambos extremos sin obligarme a cambiar lo que ya usaba. Ahora el stock se descuenta solo y la parte financiera cuadra con las ventas. Se acabaron los reprocesos y las diferencias de inventario.",
          name: "Lucas Gonçalves",
          role: "Empresario, Postati",
        },
        {
          quote:
            "Contraté a Undersoft para crear la tienda online pensando ya en conectarla con lo que usamos internamente. La entrega llegó dentro del plazo acordado, con la parte financiera integrada, y eso me ahorró contratar a otro proveedor. El soporte tras el lanzamiento sigue muy atento. Pedí dos cambios en el checkout y estuvieron listos esa misma semana.",
          name: "Robert Bonifácio",
          role: "Socio fundador, RBM Portas e Janelas",
        },
        {
          quote:
            "Las matrículas, los cobros y el control de acceso se gestionaban por separado, y la recepción perdía mucho tiempo con eso. El sistema lo reunió todo y ahora avisa automáticamente de las mensualidades. La morosidad bajó y los alumnos comentaron que resolver cualquier gestión es ahora mucho más fácil. Fue una inversión que se pagó sola.",
          name: "Gabriel Marantnes",
          role: "Administrador, Marant Fitness",
        },
        {
          quote:
            "El asistente que implantó Undersoft atiende los contactos que llegan, entiende lo que necesita la persona y agenda la reunión directamente en mi calendario. Antes perdía leads fuera del horario laboral. No lo resuelve todo, y cuando el tema se sale de lo habitual me pasa la conversación a mí, que era justo el comportamiento que yo quería.",
          name: "Tomás Santos",
          role: "Empresario, TSK Marketing",
        },
      ],
    },

    about: {
      eyebrow: "Sobre nosotros",
      titleLine1: "No vendemos software.",
      titleLine2: "Devolvemos tiempo y control a su operación.",
      p1: "Undersoft nació para simplificar los sistemas de las empresas. Automatizamos procesos y creamos sistemas a medida para empresas que ya no quieren perder dinero en trabajo manual.",
      p2: "En demasiados negocios, la tecnología da más trabajo del que ahorra: hojas sueltas, tareas repetidas y herramientas que no se comunican entre sí. Conectamos lo que ya utiliza y creamos lo que falta, con diagnóstico previo, alcance y plazos por escrito, y entrega por fases.",
      cta: "Hablemos",
      imageAlt: "Undersoft, soluciones empresariales",
      badgeName: "Undersoft",
      badgeTagline: "Soluciones empresariales",
      commitments: [
        { big: "Propósito", small: "Eliminar el trabajo manual que consume tiempo, dinero y atención de los equipos." },
        { big: "Especialidad", small: "Automatización de procesos y sistemas a medida, integrados en las herramientas que la empresa ya utiliza." },
        { big: "Principio", small: "Cada solución parte del proceso real del cliente, nunca de un producto predefinido." },
        { big: "Compromiso", small: "Rigor técnico y transparencia total, del diagnóstico a la entrega." },
      ],
    },

    diagnostic: {
      eyebrow: "Primera etapa",
      title: "Entender el proceso antes de proponer una solución.",
      p1: "El primer contacto sirve para entender cómo trabaja hoy la empresa, dónde se pierde tiempo y si existe un margen real para automatizar.",
      p2: "Sin compromiso y sin coste. Solo después de ese análisis tiene sentido definir el alcance, las prioridades y una propuesta adecuada.",
      cta: "Describir mi proceso",
    },

    contact: {
      eyebrow: "Contacto",
      title: "Entender el proceso antes de proponer una solución.",
      p1: "El primer contacto sirve para entender cómo trabaja hoy la empresa, dónde se pierde tiempo y si existe un margen real para automatizar.",
      p2: "Sin compromiso y sin coste. Solo después de ese análisis tiene sentido definir el alcance, las prioridades y una propuesta adecuada.",
      whatsapp: "Escribir por WhatsApp",
      form: {
        name: "Nombre*",
        namePlaceholder: "Juan Pérez",
        email: "Correo electrónico*",
        emailPlaceholder: "suemail@email.com",
        message: "¿Qué proceso quiere mejorar?*",
        messagePlaceholder: "Pierdo horas cada semana organizando pedidos a mano...",
        acceptPrefix: "Acepto los",
        terms: "términos y condiciones",
        and: "y la",
        privacy: "Política de Privacidad",
        honeypot: "No rellenar",
        subject: "Nuevo contacto a través de undersoft.pt",
        button: { idle: "Solicitar mi propuesta", validating: "Validando...", sending: "Enviando..." },
        errorValidate:
          "No hemos podido validar la solicitud. Actualice la página e inténtelo de nuevo, o escriba a contacto@undersoft.pt.",
        errorSend: "No hemos podido enviar la solicitud. Inténtelo de nuevo o escriba a contacto@undersoft.pt.",
      },
    },

    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Sus preguntas, respondidas",
      more: "¿Le queda alguna duda? Hable con nosotros →",
      items: [
        {
          question: "¿Tendré que cambiar las herramientas que ya utilizo?",
          answer:
            "No. La automatización se integra en las herramientas que su equipo ya utiliza, sin interrumpir la operación actual.",
        },
        {
          question: "¿Y si mi proceso es muy específico o ninguna herramienta lo resuelve?",
          answer:
            "Analizamos cada proceso antes de proponer cualquier solución. Cuando nada de lo que existe resuelve el problema, creamos un sistema a medida, conectado con lo que la empresa ya utiliza.",
        },
        {
          question: "¿Cómo empieza el proceso?",
          answer:
            "Con un primer análisis, sin coste y sin compromiso: entendemos cómo trabaja hoy la empresa y si existe un margen real para automatizar. Solo después definimos el alcance, las prioridades y una propuesta adecuada.",
        },
        {
          question: "¿Cuánto tarda la implementación?",
          answer:
            "Depende de la complejidad del proceso, pero trabajamos por fases, empezando por la parte con mayor impacto y menor riesgo. Así se ven resultados sin esperar a un proyecto de meses.",
        },
        {
          question: "¿Cuánto cuesta?",
          answer:
            "El primer análisis es gratuito y sin compromiso. Después, definimos alcance, plazo e inversión en una propuesta adecuada a su proceso. Como trabajamos por fases, usted mantiene el control de la inversión.",
        },
        {
          question: "¿Necesito conocimientos técnicos para usar lo que se automatice?",
          answer:
            "No. El objetivo es que su equipo tenga menos tareas repetitivas, sin necesidad de dominar la tecnología que hay detrás.",
        },
        {
          question: "¿Hay seguimiento después de la implementación?",
          answer:
            "Sí. Tras la implementación acompañamos lo que se ha creado, con mantenimiento, nuevas reglas y mejoras según la necesidad real de su operación.",
        },
      ],
    },

    cta: {
      words: ["Automatice", "Optimice", "Perfeccione", "Cree"],
      processes: "procesos",
      without: " sin",
      withoutStart: "sin ",
      titleLine2: "tirar por la borda lo que ya funciona.",
      text: "Su empresa no necesita cambiar de sistema para dejar de perder tiempo en trabajo manual. Conectamos lo que ya utiliza y, cuando tiene sentido, creamos el sistema que falta, eliminando el trabajo repetitivo en semanas, no en meses.",
      button: "Quiero analizar mi proceso",
    },

    // Popup de consentimento de cookies (Lei n.º 41/2004 e RGPD). Categorias em src/lib/consent.js.
    cookieConsent: {
      regionLabel: "Consentimiento de cookies",
      title: "Cookies",
      text: "Utilizamos cookies esenciales y, con su consentimiento, otras opcionales. Puede aceptar, rechazar o personalizar en cualquier momento.",
      policyPrefix: "Más información en nuestra",
      policyLink: "Política de Cookies",
      acceptAll: "Aceptar todas",
      rejectAll: "Rechazar opcionales",
      customize: "Personalizar",
      detailsTitle: "Preferencias de cookies",
      detailsText: "Elija las categorías que autoriza. Las cookies estrictamente necesarias no se pueden desactivar, porque sin ellas el sitio web no funciona. Más información en nuestra",
      alwaysActive: "Siempre activas",
      save: "Guardar elecciones",
      back: "Volver",
      categories: {
        necessary: {
          title: "Estrictamente necesarias",
          text: "Garantizan el funcionamiento y la seguridad del sitio web: recordar su elección de cookies, restablecer la posición de lectura al recargar la página y proteger el formulario de contacto frente a abusos. No requieren consentimiento.",
        },
        preferences: {
          title: "Preferencias",
          text: "Recuerdan sus elecciones entre visitas, como el idioma del sitio web.",
        },
        analytics: {
          title: "Estadísticas",
          text: "Nos ayudan a entender, de forma agregada, cómo se utiliza el sitio web para mejorarlo. Actualmente, el sitio web no utiliza herramientas de esta categoría.",
        },
        marketing: {
          title: "Marketing",
          text: "Permiten medir campañas y mostrar contenidos relevantes. Actualmente, el sitio web no utiliza herramientas de esta categoría.",
        },
      },
    },

    floatingCta: { label: "Hablemos" },

    successDialog: {
      title: "Solicitud enviada correctamente",
      text: "Hemos recibido su mensaje. Nos pondremos en contacto con usted lo antes posible.",
      ok: "OK",
    },

    notFound: {
      meta: "Página no encontrada | Undersoft",
      title: "Página no encontrada",
      lead: "La página que busca no existe o ha sido movida. Vuelva al inicio para continuar.",
      back: "Volver al inicio",
    },

    thanks: {
      title: "Solicitud enviada correctamente",
      lead: "Gracias por contactarnos. Hemos recibido su mensaje y nos pondremos en contacto con usted lo antes posible.",
      stepsLabel: "Próximos pasos",
      steps: [
        { title: "Analizamos su solicitud", text: "Leemos con atención el proceso que nos ha descrito." },
        { title: "Hablamos con usted", text: "Para entender cómo trabaja hoy la empresa y dónde se pierde tiempo." },
        { title: "Propuesta a medida", text: "Solo después de ese análisis definimos el alcance, las prioridades y la propuesta." },
      ],
      back: "Volver al sitio",
      whatsappPrefix: "¿Prefiere hablar ahora?",
      whatsappLabel: "Escribir por WhatsApp",
    },

    termsDialog: {
      lastUpdated: "Última actualización:",
      close: "Cerrar",
      accept: "He leído y acepto",
    },
    legalPage: {
      toc: "En este documento",
      others: "Otros documentos",
      tocAria: "Índice del documento",
      othersAria: "Otros documentos legales",
    },
  },
};