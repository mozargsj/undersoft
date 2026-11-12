import { COMPANY, COMPLAINTS_URL, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Termos e Condições",
  short: "Termos e Condições",
  subtitle: "Condições de uso do site e do formulário de contato.",
  sections: [
    {
      id: "identificacao",
      title: "Identificação e escopo",
      blocks: [
        `O site **${C.website}** ("Site") é de propriedade e operado por **${C.legalName}**, pessoa jurídica com NIPC ${C.nipc}, sediada em ${C.address}, matriculada na ${C.registry} ("Undersoft"). Contatos: ${C.email} e ${C.phone}.`,
        `Estes Termos e Condições regulam o acesso e o uso do Site e do respectivo formulário de contato. Não regulam a contratação dos serviços da Undersoft, que se rege pelos [Termos de Serviço](${LEGAL_PAGES["termos-de-servico"]}) e pela proposta aceita por cada cliente.`,
        "Ao navegar no Site ou ao enviar o formulário de contato, o usuário declara que leu, compreendeu e aceita estes Termos e Condições. Quem não concordar deve abster-se de utilizar o Site.",
      ],
    },
    {
      id: "destinatarios",
      title: "A quem se destina",
      blocks: [
        "O Site e os serviços nele apresentados destinam-se a empresas, empresários e profissionais, no âmbito de sua atividade. O usuário declara ter mais de 18 anos e, quando atuar em nome de uma empresa, ter poderes para representá-la ou para solicitar contato em nome dela.",
      ],
    },
    {
      id: "natureza-informativa",
      title: "Natureza informativa do conteúdo",
      blocks: [
        "Os conteúdos do Site têm natureza meramente informativa e de apresentação geral da atividade da Undersoft. Não constituem proposta contratual vinculante, promessa de resultados nem aconselhamento jurídico, fiscal, contábil ou de qualquer outra natureza regulamentada.",
        "A Undersoft pode alterar, atualizar ou retirar conteúdos, descrições de serviços e exemplos a qualquer momento, sem aviso prévio.",
        "As marcas, logotipos e nomes de ferramentas de terceiros mencionados no Site (por exemplo, programas de faturamento, ERP ou planilhas) são identificados apenas para indicar compatibilidade ou integração. Pertencem aos respectivos titulares, e sua menção não implica parceria, patrocínio ou aprovação.",
      ],
    },
    {
      id: "formulario",
      title: "Formulário de contato",
      blocks: [
        "Ao utilizar o formulário de contato, o usuário compromete-se a:",
        {
          ul: [
            "fornecer informações verdadeiras, completas e atualizadas, em especial o nome e o endereço de e-mail;",
            "descrever sua solicitação de forma suficiente para permitir uma resposta útil;",
            "não enviar dados pessoais de categorias especiais (por exemplo, saúde ou convicções), credenciais de acesso, senhas, dados bancários ou informações confidenciais de terceiros;",
            "não utilizar o formulário para fins publicitários não solicitados, para o envio de conteúdos ilícitos ou para testar a segurança do Site.",
          ],
        },
        "O envio do formulário constitui apenas uma solicitação de contato e de análise inicial. **Não cria qualquer contrato nem obriga a Undersoft ou o usuário a contratar.** A prestação de serviços depende sempre de uma proposta escrita, aceita pelo cliente, nos termos dos Termos de Serviço.",
        "A Undersoft envidará esforços razoáveis para responder às solicitações, mas não garante prazo de resposta nem o atendimento de todos os pedidos. Pode recusar solicitações que não se enquadrem em sua atividade, sem obrigação de justificar.",
        "O tratamento dos dados pessoais enviados no formulário é descrito na [Política de Privacidade](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "utilizacao-permitida",
      title: "Uso permitido",
      blocks: [
        "O Site deve ser utilizado de forma lícita, de boa-fé e em conformidade com estes Termos. É proibido, em especial:",
        {
          ul: [
            "acessar ou tentar acessar áreas, sistemas ou dados sem autorização, ou procurar explorar vulnerabilidades;",
            "sobrecarregar, perturbar ou interromper o funcionamento do Site, nomeadamente por meio de requisições automatizadas em massa;",
            "introduzir ou tentar introduzir vírus, código malicioso ou qualquer elemento que possa danificar sistemas ou dados;",
            "coletar conteúdos de forma sistemática (scraping) ou reproduzir o Site para fins comerciais;",
            "passar-se por outra pessoa ou entidade, ou prestar informações falsas;",
            "praticar qualquer ato contrário à lei, designadamente à Lei do Cibercrime (Lei n.º 109/2009, de 15 de setembro), ou que viole direitos de terceiros.",
          ],
        },
        "A Undersoft pode bloquear o acesso de quem violar estas regras e comunicar a situação às autoridades competentes, sem prejuízo de reclamar indenização pelos danos sofridos.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propriedade intelectual",
      blocks: [
        "O Site, incluindo seu design, estrutura, textos, imagens, animações, código-fonte, logotipo e a marca **Undersoft**, pertence à Undersoft ou é utilizado com autorização dos titulares, estando protegido pelo Código do Direito de Autor e dos Direitos Conexos, pelo regime jurídico dos programas de computador (Decreto-Lei n.º 252/94, de 20 de outubro) e pelo Código da Propriedade Industrial.",
        "É permitido visualizar o Site e imprimir ou salvar trechos para uso pessoal ou interno da empresa do usuário. Qualquer outra utilização, designadamente reprodução, adaptação, distribuição, comunicação ao público ou uso da marca, exige autorização prévia e escrita da Undersoft.",
      ],
    },
    {
      id: "ligacoes-terceiros",
      title: "Links e serviços de terceiros",
      blocks: [
        "O Site contém links para sites e plataformas de terceiros (por exemplo, LinkedIn, Instagram e WhatsApp) e utiliza serviços de terceiros para o seu funcionamento. A Undersoft não controla esses serviços, não responde por seus conteúdos, disponibilidade ou práticas de privacidade, e a utilização deles rege-se pelos termos e políticas dos respectivos titulares.",
      ],
    },
    {
      id: "disponibilidade",
      title: "Disponibilidade e segurança",
      blocks: [
        "O Site é disponibilizado no estado em que se encontra. A Undersoft não garante acesso contínuo e ininterrupto, a ausência de erros ou que o Site esteja livre de elementos nocivos, e pode suspender, limitar ou alterar o Site por motivos de manutenção, segurança ou outros. O usuário é responsável pela segurança de seu equipamento e de sua conexão.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitação de responsabilidade",
      blocks: [
        "Na máxima medida permitida pela lei, a Undersoft não responde por danos indiretos, lucros cessantes, perda de oportunidades ou perda de dados decorrentes do uso, ou da impossibilidade de uso, do Site, nem pela confiança depositada em seus conteúdos informativos.",
        "Nada nestes Termos exclui ou limita a responsabilidade que, nos termos da lei, não possa ser excluída ou limitada, nomeadamente em caso de dolo ou culpa grave, nem os direitos imperativos dos consumidores.",
      ],
    },
    {
      id: "dados-cookies",
      title: "Proteção de dados e cookies",
      blocks: [
        `O tratamento de dados pessoais é descrito na [Política de Privacidade](${LEGAL_PAGES["politica-de-privacidade"]}) e o uso de cookies e tecnologias semelhantes, na [Política de Cookies](${LEGAL_PAGES["politica-de-cookies"]}). Ambas integram as informações que a Undersoft presta ao usuário.`,
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações",
      blocks: [
        "A Undersoft pode alterar estes Termos e Condições a qualquer momento. A versão em vigor é a publicada no Site, com indicação da data da última atualização. A utilização do Site após a publicação das alterações implica a sua aceitação. As alterações não se aplicam retroativamente a solicitações já enviadas.",
      ],
    },
    {
      id: "reclamacoes",
      title: "Comunicações e reclamações",
      blocks: [
        `Para qualquer questão sobre estes Termos, o usuário pode entrar em contato por meio de ${C.email}. Os consumidores dispõem ainda do [Livro de Reclamações Eletrónico](${COMPLAINTS_URL}), nos termos do Decreto-Lei n.º 156/2005, de 15 de setembro, na sua redação atual.`,
      ],
    },
    {
      id: "lei-foro",
      title: "Lei aplicável e foro",
      blocks: [
        "Estes Termos e Condições regem-se pela lei portuguesa. Em caso de litígio com um consumidor, aplicam-se as regras legais de competência territorial. Nos demais casos, é competente o foro da comarca da sede da Undersoft, com expressa renúncia a qualquer outro.",
        "Se alguma disposição destes Termos for considerada nula ou ineficaz, as demais permanecem em vigor.",
      ],
    },
  ],
};
