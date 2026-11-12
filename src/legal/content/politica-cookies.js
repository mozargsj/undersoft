import { COMPANY, LAST_UPDATED, LEGAL_PAGES } from "../company";

const C = COMPANY;

export default {
  id: "politica-de-cookies",
  path: LEGAL_PAGES["politica-de-cookies"],
  title: "Política de Cookies",
  short: "Política de Cookies",
  subtitle: "Que tecnologias de armazenamento o website utiliza e como as pode gerir.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "o-que-sao",
      title: "O que são cookies e tecnologias semelhantes",
      blocks: [
        "Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando visita um website. Existem ainda tecnologias semelhantes, como o armazenamento local e de sessão do navegador (localStorage e sessionStorage), que permitem guardar informação no dispositivo. Nesta Política, a expressão “cookies” abrange todas elas.",
      ],
    },
    {
      id: "enquadramento",
      title: "Enquadramento legal",
      blocks: [
        "Em Portugal, o armazenamento de informação, ou o acesso a informação já armazenada, no equipamento do utilizador exige o seu consentimento prévio e informado, nos termos do artigo 5.º da Lei n.º 41/2004, de 18 de agosto, na sua redação atual. Ficam dispensadas de consentimento as técnicas que sejam estritamente necessárias para a prestação de um serviço expressamente solicitado pelo utilizador. Quando haja tratamento de dados pessoais, aplica-se também o RGPD.",
      ],
    },
    {
      id: "o-que-usamos",
      title: "O que o website utiliza",
      blocks: [
        "O website pede o seu consentimento antes de guardar qualquer tecnologia que não seja estritamente necessária. No primeiro acesso, e sempre que a sua escolha expirar (passados 6 meses), é apresentado um aviso onde pode aceitar, rejeitar ou escolher por categoria. Pode alterar a escolha em qualquer momento em «Definições de cookies», no rodapé de qualquer página.",
        "**Atualmente, o website não utiliza cookies de estatística, de publicidade, de personalização de anúncios ou de redes sociais.** Utiliza as seguintes tecnologias de armazenamento:",
        {
          table: {
            head: ["Nome", "Tipo", "Finalidade", "Duração"],
            rows: [
              [
                "undersoft:cookie-consent (localStorage)",
                "Estritamente necessária, própria",
                "Guardar a sua escolha de cookies (categorias aceites e data), para não voltar a perguntar em cada visita.",
                "6 meses",
              ],
              [
                "undersoft:scrollY (sessionStorage)",
                "Funcional, própria",
                "Guardar a posição de leitura para a repor se a página for recarregada. Não identifica o utilizador e não é enviada para a Undersoft nem para terceiros.",
                "Até ao fecho do separador",
              ],
              [
                "undersoft:lang (localStorage)",
                "Preferências, própria",
                "Memorizar o idioma escolhido para o aplicar nas visitas seguintes e nas restantes páginas. Só é guardado se aceitar a categoria «Preferências».",
                "Até 6 meses, ou até retirar o consentimento",
              ],
            ],
          },
        },
        "Se a Undersoft passar a utilizar ferramentas de estatística, marketing ou outras que não sejam estritamente necessárias, só as carregará depois de obter o seu consentimento para a respetiva categoria, e atualizará esta Política.",
      ],
    },
    {
      id: "terceiros",
      title: "Recursos de terceiros",
      blocks: [
        "O website carrega recursos de terceiros para funcionar, como tipos de letra, ícones e bandeiras (Google Fonts, cdnjs, unpkg e FlagCDN), e utiliza serviços externos no formulário de contacto: o Cloudflare Turnstile (com um Worker da Cloudflare), que protege o formulário contra spam e abusos. Por razões de segurança, o Turnstile é considerado estritamente necessário e não depende de consentimento. Tanto quanto é do conhecimento da Undersoft, estes serviços não definem cookies de acompanhamento neste contexto, mas recebem o endereço IP e dados técnicos do pedido. Veja a [Política de Privacidade](" + LEGAL_PAGES["politica-de-privacidade"] + ") para mais informação.",
        "Ao seguir ligações para LinkedIn, Instagram, WhatsApp ou outros sites externos, aplicam-se as políticas de cookies desses sites.",
      ],
    },
    {
      id: "gerir",
      title: "Como gerir ou eliminar",
      blocks: [
        "Pode alterar ou retirar o consentimento em qualquer momento, em «Definições de cookies», no rodapé de qualquer página. Retirar o consentimento é tão simples como o dar e não afeta a licitude do tratamento realizado até então. O armazenamento de sessão é eliminado quando fecha o separador do navegador. Pode ainda gerir, bloquear ou eliminar cookies e dados de sites nas definições de privacidade do seu navegador. Bloquear as tecnologias indicadas acima não afeta o funcionamento do website; apenas deixa de ser reposta a posição de leitura após recarregar a página e de ser memorizado o idioma.",
      ],
    },
    {
      id: "alteracoes",
      title: "Alterações",
      blocks: [
        "Esta Política pode ser atualizada, nomeadamente se forem introduzidas novas funcionalidades. A versão em vigor é a publicada nesta página, com a data da última atualização.",
      ],
    },
    {
      id: "contactos",
      title: "Contactos e reclamações",
      blocks: [
        `Para qualquer questão, contacte ${C.email}. O titular pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), em www.cnpd.pt.`,
      ],
    },
  ],
};
