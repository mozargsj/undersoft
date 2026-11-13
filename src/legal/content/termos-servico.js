import { COMPANY, COMPLAINTS_URL, LAST_UPDATED, LEGAL_PAGES } from "../company";

const C = COMPANY;

export default {
  id: "termos-de-servico",
  path: LEGAL_PAGES["termos-de-servico"],
  title: "Termos de Serviço",
  short: "Termos de Serviço",
  subtitle: "Condições gerais aplicáveis à prestação de serviços da Undersoft a clientes empresariais.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "prestador",
      title: "Prestador e definições",
      blocks: [
        `Os serviços são prestados por **${C.legalName}** ("Undersoft"). Contactos: ${C.email} e ${C.phone}.`,
        "Nestes Termos, entende-se por:",
        {
          ul: [
            "**Cliente**: a empresa, empresário ou profissional que contrata os Serviços;",
            "**Serviços**: a análise de processos, automação, integração entre ferramentas, desenvolvimento de sistemas à medida, relatórios, manutenção e evolução, e demais trabalhos descritos na Proposta;",
            "**Proposta**: o documento escrito, enviado pela Undersoft e aceite pelo Cliente, que define o âmbito, as fases, os prazos, o preço e as condições específicas;",
            "**Entregáveis**: os resultados concretos dos Serviços indicados na Proposta, como automações, integrações, aplicações, painéis ou documentação;",
            "**Ferramentas de Terceiros**: programas, plataformas, APIs e serviços online que não pertencem à Undersoft, incluindo os já utilizados pelo Cliente;",
            "**Dados do Cliente**: toda a informação e conteúdos, incluindo dados pessoais, a que a Undersoft aceda ou que trate por conta do Cliente.",
          ],
        },
      ],
    },
    {
      id: "ambito",
      title: "Âmbito e destinatários",
      blocks: [
        "Estes Termos aplicam-se a todos os Serviços prestados pela Undersoft, que se destinam a empresas, empresários e profissionais no âmbito da sua atividade.",
        "Se, excecionalmente, o Cliente for consumidor, nos termos da Lei de Defesa do Consumidor (Lei n.º 24/96, de 31 de julho), aplicam-se-lhe as normas imperativas de proteção do consumidor, que prevalecem sobre estes Termos em caso de conflito.",
        "O âmbito concreto de cada contrato é o definido na Proposta. O que nela não constar está fora do âmbito e só será executado mediante acordo escrito.",
      ],
    },
    {
      id: "formacao-contrato",
      title: "Formação do contrato",
      blocks: [
        "A contratação segue, em regra, as seguintes etapas: pedido de contacto, análise inicial, envio da Proposta e aceitação pelo Cliente. A análise inicial é realizada sem custo e sem compromisso, nos termos indicados no Website.",
        "A Proposta é válida durante 30 dias a contar da data de envio, salvo indicação diferente. A aceitação pode ser feita por assinatura, por email ou por qualquer outro meio escrito, incluindo eletrónico, nos termos do Decreto-Lei n.º 7/2004, de 7 de janeiro. O pagamento do primeiro valor devido, ou o início da execução a pedido do Cliente, equivale a aceitação.",
        "O contrato é composto, por ordem decrescente de prevalência, por: (i) o acordo de tratamento de dados pessoais, quando exista; (ii) a Proposta aceite e respetivos anexos; (iii) estes Termos de Serviço.",
        "Estes Termos constituem cláusulas contratuais gerais, nos termos do Decreto-Lei n.º 446/85, de 25 de outubro. O Cliente declara que os conheceu antes de contratar, que lhe foi dada oportunidade de esclarecer dúvidas e que os aceita integralmente.",
      ],
    },
    {
      id: "execucao",
      title: "Execução por fases",
      blocks: [
        "Os Serviços são executados, preferencialmente, por fases, começando pela parte de maior impacto e menor risco. Cada fase tem objetivos, Entregáveis, prazos estimados e critérios de aceitação definidos na Proposta. A Undersoft pode solicitar nova aceitação do Cliente antes de iniciar cada fase seguinte.",
        "A Undersoft presta os Serviços com a diligência e a competência técnica exigíveis a um profissional da sua área, podendo recorrer a colaboradores e subcontratados, pelos quais responde perante o Cliente.",
        "Salvo se a Proposta indicar expressamente um resultado mensurável como Entregável, a obrigação da Undersoft é de meios e não de resultados. Estimativas de poupança de tempo, de custos ou de aumento de receita são meramente indicativas e não constituem garantia.",
      ],
    },
    {
      id: "obrigacoes-cliente",
      title: "Obrigações do Cliente",
      blocks: [
        "Para que os Serviços possam ser prestados, o Cliente obriga-se a:",
        {
          ul: [
            "fornecer atempadamente a informação, os acessos e as decisões necessárias, indicando uma pessoa de contacto com poderes para decidir;",
            "disponibilizar credenciais com as permissões estritamente necessárias e mantê-las atualizadas, revogando-as no fim do contrato;",
            "manter válidas as licenças e subscrições das Ferramentas de Terceiros que utiliza e cumprir os respetivos termos;",
            "assegurar cópias de segurança dos seus dados antes de qualquer intervenção nos seus sistemas;",
            "ter legitimidade para tratar os dados pessoais que disponibiliza e para os partilhar com a Undersoft;",
            "validar os Entregáveis nos prazos previstos e comunicar por escrito qualquer defeito.",
          ],
        },
        "Os atrasos ou omissões do Cliente prorrogam os prazos na medida correspondente e podem dar lugar a faturação de custos adicionais, quando documentados.",
      ],
    },
    {
      id: "prazos",
      title: "Prazos",
      blocks: [
        "Os prazos indicados são estimativas de boa-fé, salvo se a Proposta os fixar como obrigação. Dependem do cumprimento das obrigações do Cliente e da disponibilidade e do funcionamento das Ferramentas de Terceiros envolvidas.",
      ],
    },
    {
      id: "aceitacao",
      title: "Aceitação dos Entregáveis",
      blocks: [
        "Concluído um Entregável, a Undersoft notifica o Cliente, que dispõe de 5 dias úteis para o testar e comunicar por escrito, de forma fundamentada, quaisquer defeitos. Considera-se defeito o desvio objetivo face às especificações da Proposta.",
        "Findo esse prazo sem comunicação, ou se o Cliente utilizar o Entregável em ambiente real, este considera-se aceite. A Undersoft corrigirá os defeitos comunicados em prazo razoável. Pedidos que alterem as especificações são tratados como alteração de âmbito.",
      ],
    },
    {
      id: "alteracoes-ambito",
      title: "Alterações ao âmbito",
      blocks: [
        "Qualquer alteração ao âmbito deve ser pedida por escrito. A Undersoft indicará o seu impacto no preço e no prazo e só a executará após acordo do Cliente.",
      ],
    },
    {
      id: "preco-pagamento",
      title: "Preço e pagamento",
      blocks: [
        "Os preços são os definidos na Proposta, expressos em euros e acrescidos de IVA à taxa legal em vigor. O pagamento pode ser faseado, por sinal, por marcos ou por mensalidade, conforme a Proposta. A faturação é feita por via eletrónica.",
        "Salvo indicação diferente na Proposta ou na fatura, o pagamento deve ser feito no prazo de 15 dias a contar da data de emissão da fatura.",
        "Em caso de atraso, são devidos juros de mora às taxas legais aplicáveis às transações comerciais e a compensação pelos custos de cobrança prevista no Decreto-Lei n.º 62/2013, de 10 de maio. Persistindo a mora, a Undersoft pode suspender os Serviços após aviso escrito com 8 dias de antecedência, sem que isso constitua incumprimento seu.",
        "Salvo indicação em contrário, não estão incluídos no preço os custos de licenças, subscrições, APIs, alojamento ou utilização de Ferramentas de Terceiros, que ficam a cargo do Cliente.",
      ],
    },
    {
      id: "servicos-recorrentes",
      title: "Serviços recorrentes",
      blocks: [
        "Quando a Proposta incluir manutenção, suporte ou evolução contínua, o contrato vigora pelo período inicial nela indicado e renova-se automaticamente por períodos iguais, salvo denúncia por qualquer das partes, por escrito, com pelo menos 30 dias de antecedência sobre o termo do período em curso.",
        "Na falta de indicação em contrário, o suporte é prestado por email e telefone, em dias úteis e em horário normal de expediente, sem tempos de resposta garantidos. Os valores recorrentes podem ser atualizados anualmente, mediante comunicação com 30 dias de antecedência.",
        "Não estão abrangidos pela manutenção os problemas causados por alterações de Ferramentas de Terceiros, por intervenções do Cliente ou de terceiros nos sistemas, ou por utilização fora do previsto. A sua resolução pode ser orçamentada à parte.",
      ],
    },
    {
      id: "ferramentas-terceiros",
      title: "Ferramentas de Terceiros",
      blocks: [
        "As integrações e automações dependem de Ferramentas de Terceiros, que a Undersoft não controla. Alterações, limites, indisponibilidades, mudanças de preços ou de termos, ou a descontinuação dessas ferramentas podem afetar o funcionamento dos Entregáveis. A Undersoft não responde por falhas que delas decorram, mas envidará esforços razoáveis na adaptação, que pode ser orçamentada como manutenção.",
        "Quando uma automação interage com programas de faturação ou contabilidade, o Cliente mantém a responsabilidade pelo enquadramento fiscal (incluindo IVA, retenções, séries e comunicações à Autoridade Tributária) e pela validação dos documentos emitidos. A Undersoft não presta aconselhamento fiscal, contabilístico ou jurídico.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propriedade intelectual",
      blocks: [
        "A Undersoft mantém todos os direitos sobre o seu know-how, metodologias, bibliotecas, componentes, modelos e ferramentas, anteriores ou desenvolvidos independentemente dos Serviços, bem como sobre melhorias de caráter geral que deles resultem.",
        "Após o pagamento integral do preço correspondente, o Cliente adquire uma licença de utilização dos Entregáveis específicos que lhe sejam destinados, não exclusiva, por tempo indeterminado, para uso interno na sua atividade e na do seu grupo empresarial, intransmissível sem acordo da Undersoft, salvo em caso de transmissão do estabelecimento. Se a Proposta previr a cessão de direitos de autor, prevalece o aí estabelecido.",
        "Os Dados do Cliente e os conteúdos que este fornece permanecem propriedade do Cliente. A Undersoft só os utiliza para prestar os Serviços. Componentes de terceiros e de código aberto ficam sujeitos às respetivas licenças.",
        "Salvo oposição escrita do Cliente, a Undersoft pode indicar o nome e o logótipo do Cliente como referência comercial.",
      ],
    },
    {
      id: "confidencialidade",
      title: "Confidencialidade",
      blocks: [
        "Cada parte compromete-se a manter confidencial a informação não pública da outra a que aceda por causa do contrato, a usá-la apenas para a sua execução e a divulgá-la só a quem dela precise para esse fim e esteja vinculado por dever de confidencialidade equivalente.",
        "Não é confidencial a informação que seja ou se torne pública sem culpa da parte recetora, que já fosse legitimamente conhecida desta, ou cuja divulgação seja exigida por lei ou por decisão de autoridade competente. Este dever mantém-se durante a vigência do contrato e por 3 anos após a sua cessação, e sem limite de tempo quanto a segredos comerciais enquanto o forem.",
      ],
    },
    {
      id: "protecao-dados",
      title: "Proteção de dados pessoais",
      blocks: [
        "Quando, na execução dos Serviços, a Undersoft trate dados pessoais por conta do Cliente, o Cliente é o responsável pelo tratamento e a Undersoft é subcontratante, nos termos do artigo 28.º do Regulamento (UE) 2016/679 (RGPD). Esse tratamento será regulado por acordo escrito, celebrado antes do seu início, que define o objeto, a duração, as instruções, as medidas de segurança e o regime de subcontratação.",
        "O Cliente garante que os dados foram recolhidos de forma lícita e que tem legitimidade para os disponibilizar. Quanto aos dados de contacto do Cliente e dos seus representantes, a Undersoft atua como responsável pelo tratamento, nos termos da [Política de Privacidade](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "seguranca",
      title: "Segurança e acessos",
      blocks: [
        "A Undersoft adota medidas técnicas e organizativas adequadas à proteção das credenciais e dos dados a que aceda, e usa-os apenas na medida necessária aos Serviços. Nenhum sistema é absolutamente seguro, pelo que a Undersoft não garante a ausência total de incidentes. O Cliente é responsável pela segurança da sua própria infraestrutura e contas, e deve notificar de imediato a Undersoft de qualquer suspeita de comprometimento.",
      ],
    },
    {
      id: "garantia",
      title: "Garantia de correção",
      blocks: [
        "Durante o período de garantia indicado na Proposta e, na sua falta, durante 30 dias após a aceitação, a Undersoft corrige sem custo adicional os defeitos dos Entregáveis que lhe sejam comunicados por escrito. A garantia não cobre defeitos causados por alterações feitas pelo Cliente ou por terceiros, por falhas ou mudanças em Ferramentas de Terceiros, por dados incorretos, por utilização fora do previsto ou por falhas de infraestrutura do Cliente.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitação de responsabilidade",
      blocks: [
        "Na máxima medida permitida pela lei, a responsabilidade total da Undersoft perante o Cliente, seja qual for o fundamento, fica limitada ao valor efetivamente pago pelo Cliente pelo Serviço que originou o dano, nos 12 meses anteriores ao facto.",
        "A Undersoft não responde por danos indiretos, lucros cessantes, perda de clientela ou de oportunidades, danos reputacionais, nem pela perda de dados que o Cliente poderia ter evitado com cópias de segurança.",
        "Nada nestes Termos exclui ou limita a responsabilidade por dolo ou culpa grave, por danos à vida, à integridade física ou à saúde, nem qualquer responsabilidade que a lei imperativa não permita excluir ou limitar.",
      ],
    },
    {
      id: "duracao-cessacao",
      title: "Duração e cessação",
      blocks: [
        "Os contratos de projeto vigoram até à conclusão dos Serviços e ao pagamento integral do preço. Os serviços recorrentes vigoram nos termos acima indicados.",
        "Qualquer parte pode resolver o contrato em caso de incumprimento grave da outra, se este não for sanado no prazo de 15 dias após notificação escrita. O Cliente pode ainda cancelar o contrato a qualquer momento, por escrito, ficando obrigado a pagar os Serviços prestados e as despesas incorridas até à data da cessação, bem como os trabalhos em curso, na proporção do executado.",
        "Cessado o contrato, a Undersoft devolve ou elimina os Dados do Cliente, conforme este indique, salvo obrigação legal de conservação, e o Cliente revoga os acessos concedidos. Mantêm-se em vigor as cláusulas que, pela sua natureza, devam sobreviver, como as de pagamento, propriedade intelectual, confidencialidade e responsabilidade.",
      ],
    },
    {
      id: "forca-maior",
      title: "Força maior",
      blocks: [
        "Nenhuma parte responde pelo incumprimento ou atraso causado por circunstâncias fora do seu controlo razoável, como falhas generalizadas de energia, de telecomunicações ou de serviços de nuvem, ciberataques não imputáveis à parte, greves, catástrofes ou decisões de autoridades. A parte afetada deve informar a outra com a possível brevidade. Se o impedimento durar mais de 60 dias, qualquer parte pode resolver o contrato, sem indemnização.",
      ],
    },
    {
      id: "nao-aliciamento",
      title: "Não aliciamento",
      blocks: [
        "Durante a vigência do contrato e nos 12 meses seguintes, o Cliente não deve contratar nem aliciar colaboradores ou subcontratados da Undersoft envolvidos na prestação dos Serviços, salvo acordo escrito.",
      ],
    },
    {
      id: "comunicacoes",
      title: "Comunicações",
      blocks: [
        "As comunicações entre as partes são feitas por escrito, preferencialmente por email, para os endereços indicados na Proposta ou, na falta de indicação, para os que constem do contrato ou do Website. Cada parte deve informar a outra de qualquer alteração aos seus contactos.",
      ],
    },
    {
      id: "gerais",
      title: "Disposições gerais",
      blocks: [
        "Qualquer das partes só pode ceder a sua posição contratual com o consentimento escrito da outra, salvo a Undersoft quanto a entidades do seu grupo ou em caso de transmissão da sua atividade. A tolerância no cumprimento não constitui renúncia a qualquer direito. A nulidade de uma cláusula não afeta as restantes. O contrato, composto nos termos acima indicados, substitui qualquer entendimento anterior sobre o mesmo objeto, e as suas alterações devem ser feitas por escrito.",
        "A Undersoft pode atualizar estes Termos, que se aplicam aos contratos celebrados após a sua publicação. Os contratos em curso mantêm a versão aceite, exceto quanto a alterações impostas por lei. A versão em língua portuguesa prevalece sobre qualquer tradução.",
      ],
    },
    {
      id: "lei-litigios",
      title: "Lei aplicável e resolução de litígios",
      blocks: [
        "O contrato rege-se pela lei portuguesa. As partes procurarão resolver amigavelmente qualquer diferendo, durante 15 dias após notificação escrita. Falhando a solução amigável, é competente o tribunal da comarca da sede da Undersoft, com renúncia a qualquer outro, salvo se o Cliente for consumidor, caso em que se aplicam as regras legais de competência.",
        `Nos termos da Lei n.º 144/2015, de 8 de setembro, informa-se que a Undersoft não se encontra vinculada a qualquer entidade de resolução alternativa de litígios de consumo, sem prejuízo de o consumidor poder recorrer a qualquer entidade RAL legalmente competente, cuja lista está disponível em consumidor.gov.pt. Os consumidores dispõem ainda do [Livro de Reclamações Eletrónico](${COMPLAINTS_URL}).`,
      ],
    },
  ],
};
