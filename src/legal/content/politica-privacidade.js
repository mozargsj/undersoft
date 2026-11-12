import { COMPANY, LAST_UPDATED, LEGAL_PAGES } from "../company";

const C = COMPANY;

export default {
  id: "politica-de-privacidade",
  path: LEGAL_PAGES["politica-de-privacidade"],
  title: "Política de Privacidade",
  short: "Política de Privacidade",
  subtitle: "Como a Undersoft recolhe, utiliza e protege os dados pessoais, nos termos do RGPD e da lei portuguesa.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "introducao",
      title: "Introdução e enquadramento legal",
      blocks: [
        "A Undersoft respeita a privacidade de quem visita o seu website, contacta a Undersoft ou contrata os seus serviços. Esta Política explica que dados pessoais são tratados, para que fins, com que fundamento, por quanto tempo e que direitos assistem aos titulares.",
        "O tratamento de dados pessoais cumpre o Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados, RGPD), a Lei n.º 58/2019, de 8 de agosto, que assegura a sua execução na ordem jurídica nacional, e a Lei n.º 41/2004, de 18 de agosto, relativa à privacidade nas comunicações eletrónicas, na sua redação atual.",
      ],
    },
    {
      id: "responsavel",
      title: "Responsável pelo tratamento",
      blocks: [
        `O responsável pelo tratamento é **${C.legalName}**, NIPC ${C.nipc}, com sede em ${C.address} ("Undersoft").`,
        `Para qualquer questão sobre privacidade ou para exercer os seus direitos, contacte ${C.email}. A Undersoft não está legalmente obrigada a designar um encarregado de proteção de dados, sem prejuízo de manter este canal dedicado aos titulares.`,
        "Esta Política não se aplica aos dados que a Undersoft trate **por conta dos seus clientes** na execução de projetos (por exemplo, dados dos clientes finais de uma empresa). Nesses casos, o cliente é o responsável pelo tratamento e a Undersoft atua como subcontratante, ao abrigo de um acordo próprio, nos termos do artigo 28.º do RGPD.",
      ],
    },
    {
      id: "dados",
      title: "Dados pessoais que tratamos",
      blocks: [
        {
          table: {
            head: ["Categoria", "Exemplos", "Origem"],
            rows: [
              ["Identificação e contacto", "Nome, email, telefone, empresa, cargo", "Fornecidos pelo titular, no formulário ou por outros canais"],
              ["Conteúdo das comunicações", "Mensagem e descrição do processo que pretende melhorar; trocas de email, WhatsApp ou telefone", "Fornecidos pelo titular"],
              ["Dados contratuais e de faturação", "Dados da empresa e dos seus representantes, NIF, morada, histórico de propostas e faturas", "Fornecidos pelo titular ou pela empresa"],
              ["Dados técnicos", "Endereço IP, tipo de navegador e dispositivo, data e hora de acesso", "Recolhidos automaticamente, ao aceder ao website e ao enviar o formulário"],
              ["Registo da aceitação", "Aceitação dos Termos e Condições, com data e hora do pedido", "Gerado no envio do formulário"],
            ],
          },
        },
        "A Undersoft não pretende recolher dados de categorias especiais (artigo 9.º do RGPD) nem dados de menores. Pedimos que não os inclua nas mensagens que envia.",
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades, fundamentos e conservação",
      blocks: [
        {
          table: {
            head: ["Finalidade", "Fundamento de licitude", "Conservação"],
            rows: [
              [
                "Responder a pedidos de contacto e realizar a análise inicial",
                "Diligências pré-contratuais a pedido do titular (art. 6.º, n.º 1, al. b) do RGPD)",
                "Até 24 meses após o último contacto, salvo se evoluir para contrato",
              ],
              [
                "Preparar propostas, celebrar e executar contratos, gerir a relação com clientes",
                "Execução de contrato ou diligências pré-contratuais (art. 6.º, n.º 1, al. b))",
                "Durante o contrato e pelos prazos legais após a sua cessação",
              ],
              [
                "Faturação, contabilidade e obrigações fiscais",
                "Cumprimento de obrigações legais (art. 6.º, n.º 1, al. c))",
                "Em regra, 10 anos",
              ],
              [
                "Segurança do website, prevenção de abuso e de spam",
                "Interesse legítimo da Undersoft (art. 6.º, n.º 1, al. f))",
                "Pelo período estritamente necessário, em regra até 12 meses",
              ],
              [
                "Cobrança de créditos e defesa de direitos em processos judiciais ou administrativos",
                "Interesse legítimo (art. 6.º, n.º 1, al. f))",
                "Até ao termo dos prazos de prescrição ou do processo",
              ],
              [
                "Comunicações comerciais sobre serviços da Undersoft",
                "Consentimento (art. 6.º, n.º 1, al. a)) ou, quanto a clientes e a produtos ou serviços análogos, interesse legítimo nos termos do artigo 13.º-A da Lei n.º 41/2004, com direito de oposição",
                "Até à retirada do consentimento ou à oposição",
              ],
            ],
          },
        },
        "Decorridos os prazos, os dados são eliminados ou anonimizados, salvo se a lei exigir a sua conservação por mais tempo.",
      ],
    },
    {
      id: "obrigatoriedade",
      title: "Natureza obrigatória dos dados",
      blocks: [
        "Os campos assinalados com asterisco no formulário são obrigatórios. Sem eles não é possível responder ao pedido. A aceitação dos Termos e Condições é condição para o envio do formulário.",
      ],
    },
    {
      id: "decisoes-automatizadas",
      title: "Decisões automatizadas",
      blocks: [
        "A Undersoft não toma decisões exclusivamente automatizadas, incluindo a definição de perfis, que produzam efeitos jurídicos ou afetem de forma significativa os titulares.",
      ],
    },
    {
      id: "destinatarios",
      title: "Destinatários dos dados",
      blocks: [
        "Os dados podem ser comunicados a entidades que tratam dados em nome da Undersoft (subcontratantes), vinculadas por contrato nos termos do artigo 28.º do RGPD, e a entidades que os recebem por obrigação legal. Em concreto:",
        {
          ul: [
            "prestadores do formulário de contacto (atualmente, Formspree), de proteção contra spam e abuso (Cloudflare Turnstile e Cloudflare Workers) e de alojamento e infraestrutura do website;",
            "prestadores de correio eletrónico, comunicação e produtividade;",
            "contabilista certificado e software de faturação;",
            "consultores jurídicos, auditores e seguradoras, quando necessário;",
            "autoridades públicas, como a Autoridade Tributária e Aduaneira, os tribunais e a Comissão Nacional de Proteção de Dados (CNPD), quando a lei o exija.",
          ],
        },
        "A Undersoft não vende nem cede dados pessoais a terceiros para fins de marketing.",
      ],
    },
    {
      id: "transferencias",
      title: "Transferências internacionais",
      blocks: [
        "Alguns prestadores podem tratar dados fora do Espaço Económico Europeu, designadamente nos Estados Unidos da América. Nesses casos, a Undersoft recorre aos mecanismos previstos no RGPD, como decisões de adequação da Comissão Europeia (incluindo o Quadro de Privacidade de Dados UE-EUA, quando o destinatário esteja certificado) ou cláusulas contratuais-tipo. Pode pedir informação sobre as garantias aplicadas através do contacto indicado.",
      ],
    },
    {
      id: "recursos-terceiros",
      title: "Recursos de terceiros carregados pelo website",
      blocks: [
        "Para apresentar o website, o navegador do visitante carrega recursos alojados por terceiros, o que implica que o endereço IP e dados técnicos do pedido sejam recebidos por esses prestadores:",
        {
          table: {
            head: ["Recurso", "Finalidade"],
            rows: [
              ["Google Fonts (Google)", "Tipo de letra do website"],
              ["cdnjs (Cloudflare)", "Biblioteca de ícones"],
              ["unpkg", "Biblioteca de ícones"],
              ["FlagCDN", "Imagens das bandeiras do seletor de idioma"],
              ["Cloudflare Turnstile (Cloudflare)", "Proteção do formulário de contacto contra spam e abusos. Analisa dados técnicos do navegador, é carregado na página inicial e o envio do formulário é validado por um serviço da Cloudflare (Workers)"],
            ],
          },
        },
        "Estes prestadores tratam os dados segundo as suas próprias políticas de privacidade. Veja também a [Política de Cookies](" + LEGAL_PAGES["politica-de-cookies"] + ").",
      ],
    },
    {
      id: "direitos",
      title: "Direitos dos titulares",
      blocks: [
        "Nos termos do RGPD, o titular dos dados tem direito a:",
        {
          ul: [
            "**acesso**: saber se tratamos dados que lhe dizem respeito e obter cópia;",
            "**retificação**: corrigir dados inexatos ou incompletos;",
            "**apagamento**: pedir a eliminação dos dados, quando não exista fundamento para os conservar;",
            "**limitação**: pedir a restrição do tratamento em certas situações;",
            "**portabilidade**: receber os dados que forneceu em formato estruturado e de uso corrente, quando o tratamento se baseie em consentimento ou contrato e seja feito por meios automatizados;",
            "**oposição**: opor-se ao tratamento baseado em interesse legítimo e, a qualquer momento, ao tratamento para fins de marketing;",
            "**retirar o consentimento**, a qualquer momento, sem afetar a licitude do tratamento anterior.",
          ],
        },
        `Para exercer estes direitos, envie um pedido para ${C.email}. Podemos solicitar elementos que permitam confirmar a identidade do requerente. Respondemos no prazo de um mês, prorrogável por mais dois meses em casos complexos, e sem custos, salvo pedidos manifestamente infundados ou excessivos.`,
        "O titular tem ainda o direito de apresentar reclamação à autoridade de controlo, a Comissão Nacional de Proteção de Dados (CNPD), em www.cnpd.pt.",
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      blocks: [
        "A Undersoft aplica medidas técnicas e organizativas adequadas ao risco, como ligações cifradas, controlo de acessos, princípio do menor privilégio e compromissos de confidencialidade. Nenhum sistema é totalmente seguro. Em caso de violação de dados pessoais, a Undersoft atuará nos termos dos artigos 33.º e 34.º do RGPD, notificando a CNPD e os titulares afetados quando legalmente exigido.",
      ],
    },
    {
      id: "ligacoes-externas",
      title: "Redes sociais e ligações externas",
      blocks: [
        "O website tem ligações para LinkedIn, Instagram e WhatsApp. Quando o utilizador as segue ou contacta a Undersoft por essas plataformas, aplicam-se as políticas de privacidade dos respetivos titulares, sobre as quais a Undersoft não tem controlo.",
      ],
    },
    {
      id: "menores",
      title: "Menores",
      blocks: [
        "Os serviços e o website destinam-se a empresas e profissionais e não a menores de 18 anos. Se tomar conhecimento de que recolhemos dados de um menor, contacte-nos para os eliminarmos.",
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações a esta Política",
      blocks: [
        "Esta Política pode ser atualizada para refletir alterações legais ou da nossa atividade. A versão em vigor é a publicada nesta página, com a data da última atualização. Em caso de alterações relevantes, serão comunicadas de forma adequada.",
      ],
    },
  ],
};
