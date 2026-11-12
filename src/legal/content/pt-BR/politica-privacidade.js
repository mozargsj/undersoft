import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Política de Privacidade",
  short: "Política de Privacidade",
  subtitle: "Como a Undersoft coleta, utiliza e protege os dados pessoais, nos termos do RGPD e da lei portuguesa.",
  sections: [
    {
      id: "introducao",
      title: "Introdução e enquadramento legal",
      blocks: [
        "A Undersoft respeita a privacidade de quem visita o seu site, entra em contato ou contrata os seus serviços. Esta Política explica quais dados pessoais são tratados, para quais finalidades, com qual fundamento, por quanto tempo e quais direitos assistem aos titulares.",
        "O tratamento de dados pessoais cumpre o Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados, RGPD ou GDPR), a Lei n.º 58/2019, de 8 de agosto, que assegura a sua execução na ordem jurídica nacional, e a Lei n.º 41/2004, de 18 de agosto, relativa à privacidade nas comunicações eletrônicas, na sua redação atual.",
      ],
    },
    {
      id: "responsavel",
      title: "Responsável pelo tratamento",
      blocks: [
        `O responsável pelo tratamento (controlador) é **${C.legalName}**, NIPC ${C.nipc}, sediada em ${C.address} ("Undersoft").`,
        `Para qualquer questão sobre privacidade ou para exercer os seus direitos, entre em contato por meio de ${C.email}. A Undersoft não está legalmente obrigada a designar um encarregado de proteção de dados (DPO), sem prejuízo de manter este canal dedicado aos titulares.`,
        "Esta Política não se aplica aos dados que a Undersoft trate **por conta de seus clientes** na execução de projetos (por exemplo, dados dos clientes finais de uma empresa). Nesses casos, o cliente é o responsável pelo tratamento e a Undersoft atua como subcontratante (operador), com base em acordo próprio, nos termos do artigo 28.º do RGPD.",
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
              ["Identificação e contato", "Nome, e-mail, telefone, empresa, cargo", "Fornecidos pelo titular, no formulário ou por outros canais"],
              ["Conteúdo das comunicações", "Mensagem e descrição do processo que se pretende melhorar; trocas de e-mail, WhatsApp ou telefone", "Fornecidos pelo titular"],
              ["Dados contratuais e de faturamento", "Dados da empresa e de seus representantes, NIF, endereço, histórico de propostas e faturas", "Fornecidos pelo titular ou pela empresa"],
              ["Dados técnicos", "Endereço IP, tipo de navegador e de dispositivo, data e hora de acesso", "Coletados automaticamente, ao acessar o site e ao enviar o formulário"],
              ["Registro do aceite", "Aceite dos Termos e Condições, com data e hora da solicitação", "Gerado no envio do formulário"],
            ],
          },
        },
        "A Undersoft não pretende coletar dados de categorias especiais (artigo 9.º do RGPD) nem dados de menores. Pedimos que não os inclua nas mensagens que enviar.",
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
                "Responder a solicitações de contato e realizar a análise inicial",
                "Diligências pré-contratuais a pedido do titular (art. 6.º, n.º 1, al. b) do RGPD)",
                "Até 24 meses após o último contato, salvo se evoluir para contrato",
              ],
              [
                "Preparar propostas, celebrar e executar contratos, gerenciar o relacionamento com clientes",
                "Execução de contrato ou diligências pré-contratuais (art. 6.º, n.º 1, al. b))",
                "Durante o contrato e pelos prazos legais após o seu encerramento",
              ],
              [
                "Faturamento, contabilidade e obrigações fiscais",
                "Cumprimento de obrigações legais (art. 6.º, n.º 1, al. c))",
                "Em regra, 10 anos",
              ],
              [
                "Segurança do site, prevenção de abusos e de spam",
                "Interesse legítimo da Undersoft (art. 6.º, n.º 1, al. f))",
                "Pelo período estritamente necessário, em regra até 12 meses",
              ],
              [
                "Cobrança de créditos e defesa de direitos em processos judiciais ou administrativos",
                "Interesse legítimo (art. 6.º, n.º 1, al. f))",
                "Até o término dos prazos de prescrição ou do processo",
              ],
              [
                "Comunicações comerciais sobre serviços da Undersoft",
                "Consentimento (art. 6.º, n.º 1, al. a)) ou, quanto a clientes e a serviços análogos, interesse legítimo nos termos do artigo 13.º-A da Lei n.º 41/2004, com direito de oposição",
                "Até a retirada do consentimento ou a oposição",
              ],
            ],
          },
        },
        "Esgotados os prazos, os dados são eliminados ou anonimizados, salvo se a lei exigir a sua conservação por mais tempo.",
      ],
    },
    {
      id: "obrigatoriedade",
      title: "Caráter obrigatório dos dados",
      blocks: [
        "Os campos assinalados com asterisco no formulário são obrigatórios. Sem eles, não é possível responder à solicitação. O aceite dos Termos e Condições é condição para o envio do formulário.",
      ],
    },
    {
      id: "decisoes-automatizadas",
      title: "Decisões automatizadas",
      blocks: [
        "A Undersoft não toma decisões exclusivamente automatizadas, incluindo a definição de perfis, que produzam efeitos jurídicos ou afetem os titulares de forma significativa.",
      ],
    },
    {
      id: "destinatarios",
      title: "Destinatários dos dados",
      blocks: [
        "Os dados podem ser comunicados a entidades que tratam dados em nome da Undersoft (subcontratantes), vinculadas por contrato nos termos do artigo 28.º do RGPD, e a entidades que os recebem por obrigação legal. Em concreto:",
        {
          ul: [
            "prestadores do formulário de contato e do envio do respectivo e-mail (Cloudflare Workers e Cloudflare Email Routing), de proteção contra spam e abuso (Cloudflare Turnstile) e de hospedagem e infraestrutura do site;",
            "prestadores de correio eletrônico, comunicação e produtividade;",
            "contador certificado e software de faturamento;",
            "consultores jurídicos, auditores e seguradoras, quando necessário;",
            "autoridades públicas, como a Autoridade Tributária e Aduaneira, os tribunais e a Comissão Nacional de Proteção de Dados (CNPD), quando a lei o exigir.",
          ],
        },
        "A Undersoft não vende nem cede dados pessoais a terceiros para fins de marketing.",
      ],
    },
    {
      id: "transferencias",
      title: "Transferências internacionais",
      blocks: [
        "Alguns prestadores podem tratar dados fora do Espaço Econômico Europeu, designadamente nos Estados Unidos da América. Nesses casos, a Undersoft recorre aos mecanismos previstos no RGPD, como decisões de adequação da Comissão Europeia (incluindo o Quadro de Privacidade de Dados UE-EUA, quando o destinatário for certificado) ou cláusulas contratuais-padrão. Você pode solicitar informações sobre as garantias aplicadas por meio do contato indicado.",
      ],
    },
    {
      id: "recursos-terceiros",
      title: "Recursos de terceiros carregados pelo site",
      blocks: [
        "Para exibir o site, o navegador do visitante carrega recursos hospedados por terceiros, o que implica que o endereço IP e dados técnicos da requisição sejam recebidos por esses prestadores:",
        {
          table: {
            head: ["Recurso", "Finalidade"],
            rows: [
              ["Google Fonts (Google)", "Fonte tipográfica do site"],
              ["cdnjs (Cloudflare)", "Biblioteca de ícones"],
              ["unpkg", "Biblioteca de ícones"],
              ["FlagCDN", "Imagens das bandeiras do seletor de idioma"],
              ["Cloudflare Turnstile (Cloudflare)", "Proteção do formulário de contato contra spam e abusos. Analisa dados técnicos do navegador, é carregado na página inicial e o envio do formulário é validado por um serviço da Cloudflare (Workers)"],
            ],
          },
        },
        "Esses prestadores tratam os dados segundo as suas próprias políticas de privacidade. Consulte também a [Política de Cookies](" + LEGAL_PAGES["politica-de-cookies"] + ").",
      ],
    },
    {
      id: "direitos",
      title: "Direitos dos titulares",
      blocks: [
        "Nos termos do RGPD, o titular dos dados tem direito a:",
        {
          ul: [
            "**acesso**: saber se tratamos dados que lhe digam respeito e obter uma cópia;",
            "**retificação**: corrigir dados inexatos ou incompletos;",
            "**apagamento**: solicitar a eliminação dos dados, quando não exista fundamento para conservá-los;",
            "**limitação**: solicitar a restrição do tratamento em certas situações;",
            "**portabilidade**: receber os dados que forneceu em formato estruturado e de uso corrente, quando o tratamento se baseie em consentimento ou contrato e seja realizado por meios automatizados;",
            "**oposição**: opor-se ao tratamento baseado em interesse legítimo e, a qualquer momento, ao tratamento para fins de marketing;",
            "**retirar o consentimento**, a qualquer momento, sem afetar a licitude do tratamento realizado anteriormente.",
          ],
        },
        `Para exercer esses direitos, envie uma solicitação para ${C.email}. Podemos pedir elementos que permitam confirmar a identidade do solicitante. Respondemos no prazo de um mês, prorrogável por mais dois meses em casos complexos, e sem custos, salvo solicitações manifestamente infundadas ou excessivas.`,
        "O titular tem ainda o direito de apresentar reclamação à autoridade de controle, a Comissão Nacional de Proteção de Dados (CNPD), em www.cnpd.pt.",
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      blocks: [
        "A Undersoft aplica medidas técnicas e organizacionais adequadas ao risco, como conexões criptografadas, controle de acessos, princípio do menor privilégio e compromissos de confidencialidade. Nenhum sistema é totalmente seguro. Em caso de violação de dados pessoais, a Undersoft agirá nos termos dos artigos 33.º e 34.º do RGPD, notificando a CNPD e os titulares afetados quando legalmente exigido.",
      ],
    },
    {
      id: "ligacoes-externas",
      title: "Redes sociais e links externos",
      blocks: [
        "O site contém links para LinkedIn, Instagram e WhatsApp. Quando o usuário os acessa ou entra em contato com a Undersoft por meio dessas plataformas, aplicam-se as políticas de privacidade dos respectivos titulares, sobre as quais a Undersoft não tem controle.",
      ],
    },
    {
      id: "menores",
      title: "Menores",
      blocks: [
        "Os serviços e o site destinam-se a empresas e profissionais, e não a menores de 18 anos. Se você tomar conhecimento de que coletamos dados de um menor, entre em contato para que os eliminemos.",
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações a esta Política",
      blocks: [
        "Esta Política pode ser atualizada para refletir alterações legais ou em nossa atividade. A versão em vigor é a publicada nesta página, com a data da última atualização. Em caso de alterações relevantes, estas serão comunicadas de forma adequada.",
      ],
    },
  ],
};
