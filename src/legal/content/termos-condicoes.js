import { COMPANY, COMPLAINTS_URL, LAST_UPDATED, LEGAL_PAGES } from "../company";

const C = COMPANY;

export default {
  id: "termos-e-condicoes",
  path: LEGAL_PAGES["termos-e-condicoes"],
  title: "Termos e Condições",
  short: "Termos e Condições",
  subtitle: "Condições de utilização do website e do formulário de contacto.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "identificacao",
      title: "Identificação e âmbito",
      blocks: [
        `O website **${C.website}** ("Website") é propriedade e é operado por **${C.legalName}**, pessoa coletiva com o NIPC ${C.nipc}, com sede em ${C.address}, matriculada na ${C.registry} ("Undersoft"). Contactos: ${C.email} e ${C.phone}.`,
        `Estes Termos e Condições regulam o acesso e a utilização do Website e do respetivo formulário de contacto. Não regulam a contratação dos serviços da Undersoft, que se rege pelos [Termos de Serviço](${LEGAL_PAGES["termos-de-servico"]}) e pela proposta aceite por cada cliente.`,
        "Ao navegar no Website ou ao submeter o formulário de contacto, o utilizador declara que leu, compreendeu e aceita estes Termos e Condições. Quem não concordar deve abster-se de utilizar o Website.",
      ],
    },
    {
      id: "destinatarios",
      title: "A quem se destina",
      blocks: [
        "O Website e os serviços nele apresentados destinam-se a empresas, empresários e profissionais, no âmbito da sua atividade. O utilizador declara ser maior de 18 anos e, quando atue em nome de uma empresa, ter poderes para a vincular ou para solicitar o contacto em nome dela.",
      ],
    },
    {
      id: "natureza-informativa",
      title: "Natureza informativa do conteúdo",
      blocks: [
        "Os conteúdos do Website têm natureza meramente informativa e de apresentação geral da atividade da Undersoft. Não constituem proposta contratual vinculativa, promessa de resultados nem aconselhamento jurídico, fiscal, contabilístico ou de qualquer outra natureza regulamentada.",
        "A Undersoft pode alterar, atualizar ou retirar conteúdos, descrições de serviços e exemplos a qualquer momento, sem aviso prévio.",
        "As marcas, logótipos e nomes de ferramentas de terceiros referidos no Website (por exemplo, programas de faturação, ERP ou folhas de cálculo) são identificados apenas para indicar compatibilidade ou integração. Pertencem aos respetivos titulares e a sua menção não implica parceria, patrocínio ou aprovação.",
      ],
    },
    {
      id: "formulario",
      title: "Formulário de contacto",
      blocks: [
        "Ao utilizar o formulário de contacto, o utilizador compromete-se a:",
        {
          ul: [
            "fornecer informação verdadeira, completa e atual, em especial o nome e o endereço de email;",
            "descrever o seu pedido de forma suficiente para permitir uma resposta útil;",
            "não enviar dados pessoais de categorias especiais (por exemplo, saúde ou convicções), credenciais de acesso, palavras-passe, dados bancários ou informação confidencial de terceiros;",
            "não utilizar o formulário para fins publicitários não solicitados, para envio de conteúdos ilícitos ou para testar a segurança do Website.",
          ],
        },
        "O envio do formulário constitui apenas um pedido de contacto e de análise inicial. **Não cria qualquer contrato nem obriga a Undersoft ou o utilizador a contratar.** A prestação de serviços depende sempre de uma proposta escrita, aceite pelo cliente, nos termos dos Termos de Serviço.",
        "A Undersoft envidará esforços razoáveis para responder aos pedidos, mas não garante prazo de resposta nem a aceitação de todos os pedidos. Pode recusar pedidos que não se enquadrem na sua atividade, sem obrigação de justificação.",
        "O tratamento dos dados pessoais submetidos no formulário é descrito na [Política de Privacidade](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "utilizacao-permitida",
      title: "Utilização permitida",
      blocks: [
        "O Website deve ser utilizado de forma lícita, de boa-fé e em conformidade com estes Termos. É proibido, em especial:",
        {
          ul: [
            "aceder ou tentar aceder a áreas, sistemas ou dados sem autorização, ou procurar explorar vulnerabilidades;",
            "sobrecarregar, perturbar ou interromper o funcionamento do Website, nomeadamente através de pedidos automatizados em massa;",
            "introduzir ou tentar introduzir vírus, código malicioso ou qualquer elemento que possa danificar sistemas ou dados;",
            "recolher conteúdos de forma sistemática (scraping) ou reproduzir o Website para fins comerciais;",
            "fazer-se passar por outra pessoa ou entidade, ou prestar informação falsa;",
            "praticar qualquer ato contrário à lei, designadamente à Lei do Cibercrime (Lei n.º 109/2009, de 15 de setembro), ou que viole direitos de terceiros.",
          ],
        },
        "A Undersoft pode bloquear o acesso a quem violar estas regras e comunicar a situação às autoridades competentes, sem prejuízo de reclamar indemnização pelos danos sofridos.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propriedade intelectual",
      blocks: [
        "O Website, incluindo o seu design, estrutura, textos, imagens, animações, código-fonte, logótipo e a marca **Undersoft**, pertence à Undersoft ou é utilizado com autorização dos titulares, estando protegido pelo Código do Direito de Autor e dos Direitos Conexos, pelo regime jurídico dos programas de computador (Decreto-Lei n.º 252/94, de 20 de outubro) e pelo Código da Propriedade Industrial.",
        "É permitido visualizar o Website e imprimir ou guardar excertos para uso pessoal ou interno da empresa do utilizador. Qualquer outra utilização, designadamente reprodução, adaptação, distribuição, comunicação ao público ou utilização da marca, exige autorização prévia e escrita da Undersoft.",
      ],
    },
    {
      id: "ligacoes-terceiros",
      title: "Ligações e serviços de terceiros",
      blocks: [
        "O Website contém ligações para sites e plataformas de terceiros (por exemplo, LinkedIn, Instagram e WhatsApp) e utiliza serviços de terceiros para o seu funcionamento. A Undersoft não controla esses serviços, não responde pelos seus conteúdos, disponibilidade ou práticas de privacidade, e a sua utilização rege-se pelos termos e políticas dos respetivos titulares.",
      ],
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade e segurança",
      blocks: [
        "O Website é disponibilizado no estado em que se encontra. A Undersoft não garante o acesso contínuo e ininterrupto, a ausência de erros ou que o Website esteja livre de elementos nocivos, e pode suspender, limitar ou alterar o Website por motivos de manutenção, segurança ou outros. O utilizador é responsável pela segurança do seu equipamento e da sua ligação.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitação de responsabilidade",
      blocks: [
        "Na máxima medida permitida pela lei, a Undersoft não responde por danos indiretos, lucros cessantes, perda de oportunidades ou perda de dados resultantes da utilização, ou da impossibilidade de utilização, do Website, nem pela confiança depositada nos seus conteúdos informativos.",
        "Nada nestes Termos exclui ou limita a responsabilidade que, nos termos da lei, não possa ser excluída ou limitada, nomeadamente em caso de dolo ou culpa grave, nem os direitos imperativos dos consumidores.",
      ],
    },
    {
      id: "dados-cookies",
      title: "Proteção de dados e cookies",
      blocks: [
        `O tratamento de dados pessoais é descrito na [Política de Privacidade](${LEGAL_PAGES["politica-de-privacidade"]}) e a utilização de cookies e tecnologias semelhantes na [Política de Cookies](${LEGAL_PAGES["politica-de-cookies"]}). Ambas fazem parte integrante da informação que a Undersoft presta ao utilizador.`,
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações",
      blocks: [
        "A Undersoft pode alterar estes Termos e Condições a qualquer momento. A versão em vigor é a publicada no Website, com indicação da data da última atualização. A utilização do Website após a publicação de alterações implica a sua aceitação. As alterações não se aplicam retroativamente a pedidos já submetidos.",
      ],
    },
    {
      id: "reclamacoes",
      title: "Comunicações e reclamações",
      blocks: [
        `Para qualquer questão sobre estes Termos, o utilizador pode contactar ${C.email}. Os consumidores dispõem ainda do [Livro de Reclamações Eletrónico](${COMPLAINTS_URL}), nos termos do Decreto-Lei n.º 156/2005, de 15 de setembro, na sua redação atual.`,
      ],
    },
    {
      id: "lei-foro",
      title: "Lei aplicável e foro",
      blocks: [
        "Estes Termos e Condições regem-se pela lei portuguesa. Em caso de litígio com um consumidor, aplicam-se as regras legais de competência territorial. Nos demais casos, é competente o tribunal da comarca da sede da Undersoft, com expressa renúncia a qualquer outro.",
        "Se alguma disposição destes Termos for considerada nula ou ineficaz, as restantes mantêm-se em vigor.",
      ],
    },
  ],
};
