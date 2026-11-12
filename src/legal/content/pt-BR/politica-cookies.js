import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Política de Cookies",
  short: "Política de Cookies",
  subtitle: "Quais tecnologias de armazenamento o site utiliza e como você pode gerenciá-las.",
  sections: [
    {
      id: "o-que-sao",
      title: "O que são cookies e tecnologias semelhantes",
      blocks: [
        "Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Existem ainda tecnologias semelhantes, como o armazenamento local e de sessão do navegador (localStorage e sessionStorage), que permitem guardar informações no dispositivo. Nesta Política, a expressão “cookies” abrange todas elas.",
      ],
    },
    {
      id: "enquadramento",
      title: "Enquadramento legal",
      blocks: [
        "Em Portugal, o armazenamento de informações, ou o acesso a informações já armazenadas, no equipamento do usuário exige o seu consentimento prévio e informado, nos termos do artigo 5.º da Lei n.º 41/2004, de 18 de agosto, na sua redação atual. Ficam dispensadas de consentimento as técnicas estritamente necessárias à prestação de um serviço expressamente solicitado pelo usuário. Quando houver tratamento de dados pessoais, aplica-se também o RGPD (Regulamento Geral sobre a Proteção de Dados, GDPR).",
      ],
    },
    {
      id: "o-que-usamos",
      title: "O que o site utiliza",
      blocks: [
        "O site pede o seu consentimento antes de guardar qualquer tecnologia que não seja estritamente necessária. No primeiro acesso, e sempre que a sua escolha expirar (após 6 meses), é exibido um aviso em que você pode aceitar, rejeitar ou escolher por categoria. Você pode alterar a escolha a qualquer momento em “Configurações de cookies”, no rodapé de qualquer página.",
        "**Atualmente, o site não utiliza cookies de estatística, de publicidade, de personalização de anúncios ou de redes sociais.** Utiliza as seguintes tecnologias de armazenamento:",
        {
          table: {
            head: ["Nome", "Tipo", "Finalidade", "Duração"],
            rows: [
              [
                "undersoft:cookie-consent (localStorage)",
                "Estritamente necessária, própria",
                "Guardar a sua escolha de cookies (categorias aceitas e data), para não perguntar novamente a cada visita.",
                "6 meses",
              ],
              [
                "undersoft:scrollY (sessionStorage)",
                "Funcional, própria",
                "Guardar a posição de leitura para restaurá-la caso a página seja recarregada. Não identifica o usuário e não é enviada à Undersoft nem a terceiros.",
                "Até o fechamento da aba",
              ],
              [
                "undersoft:lang (localStorage)",
                "Preferências, própria",
                "Lembrar o idioma escolhido para aplicá-lo nas visitas seguintes e nas demais páginas. Só é guardado se você aceitar a categoria “Preferências”.",
                "Até 6 meses, ou até retirar o consentimento",
              ],
            ],
          },
        },
        "Se a Undersoft passar a utilizar ferramentas de estatística, de marketing ou outras que não sejam estritamente necessárias, só as carregará depois de obter o seu consentimento para a respectiva categoria, e atualizará esta Política.",
      ],
    },
    {
      id: "terceiros",
      title: "Recursos de terceiros",
      blocks: [
        "O site carrega recursos de terceiros para funcionar, como fontes, ícones e bandeiras (Google Fonts, cdnjs, unpkg e FlagCDN), e utiliza serviços externos no formulário de contato: o Formspree, para receber as solicitações, e o Cloudflare Turnstile (com um Worker da Cloudflare), que protege o formulário contra spam e abusos. Por razões de segurança, o Turnstile é considerado estritamente necessário e não depende de consentimento. Até onde a Undersoft tem conhecimento, esses serviços não definem cookies de rastreamento nesse contexto, mas recebem o endereço IP e dados técnicos da requisição. Consulte a [Política de Privacidade](" + LEGAL_PAGES["politica-de-privacidade"] + ") para mais informações.",
        "Ao acessar links para LinkedIn, Instagram, WhatsApp ou outros sites externos, aplicam-se as políticas de cookies desses sites.",
      ],
    },
    {
      id: "gerir",
      title: "Como gerenciar ou excluir",
      blocks: [
        "Você pode alterar ou retirar o consentimento a qualquer momento, em “Configurações de cookies”, no rodapé de qualquer página. Retirar o consentimento é tão simples quanto dá-lo e não afeta a licitude do tratamento realizado até então. O armazenamento de sessão é excluído quando você fecha a aba do navegador. Você também pode gerenciar, bloquear ou excluir cookies e dados de sites nas configurações de privacidade do seu navegador. Bloquear as tecnologias indicadas acima não afeta o funcionamento do site; apenas deixa de ser restaurada a posição de leitura após recarregar a página e de ser lembrado o idioma.",
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
      title: "Contatos e reclamações",
      blocks: [
        `Para qualquer questão, entre em contato por meio de ${C.email}. O titular também pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), em www.cnpd.pt.`,
      ],
    },
  ],
};
