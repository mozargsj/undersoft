import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Política de Cookies",
  short: "Política de Cookies",
  subtitle: "Qué tecnologías de almacenamiento utiliza el sitio web y cómo puede gestionarlas.",
  sections: [
    {
      id: "o-que-sao",
      title: "Qué son las cookies y las tecnologías similares",
      blocks: [
        "Las cookies son pequeños archivos de texto que se guardan en su dispositivo cuando visita un sitio web. Existen también tecnologías similares, como el almacenamiento local y de sesión del navegador (localStorage y sessionStorage), que permiten guardar información en el dispositivo. En esta Política, el término «cookies» abarca todas ellas.",
      ],
    },
    {
      id: "enquadramento",
      title: "Marco legal",
      blocks: [
        "En Portugal, el almacenamiento de información, o el acceso a información ya almacenada, en el equipo del usuario requiere su consentimiento previo e informado, conforme al artículo 5 de la Ley n.º 41/2004, de 18 de agosto, en su redacción vigente. Quedan exentas de consentimiento las técnicas estrictamente necesarias para la prestación de un servicio expresamente solicitado por el usuario. Cuando exista tratamiento de datos personales, se aplica también el RGPD.",
      ],
    },
    {
      id: "o-que-usamos",
      title: "Qué utiliza el sitio web",
      blocks: [
        "El sitio web solicita su consentimiento antes de guardar cualquier tecnología que no sea estrictamente necesaria. En el primer acceso, y siempre que su elección caduque (transcurridos 6 meses), se muestra un aviso en el que puede aceptar, rechazar o elegir por categoría. Puede cambiar su elección en cualquier momento en «Ajustes de cookies», en el pie de cualquier página.",
        "**Actualmente, el sitio web no utiliza cookies de estadística, publicitarias, de personalización de anuncios ni de redes sociales.** Utiliza las siguientes tecnologías de almacenamiento:",
        {
          table: {
            head: ["Nombre", "Tipo", "Finalidad", "Duración"],
            rows: [
              [
                "undersoft:cookie-consent (localStorage)",
                "Estrictamente necesaria, propia",
                "Guardar su elección de cookies (categorías aceptadas y fecha), para no volver a preguntar en cada visita.",
                "6 meses",
              ],
              [
                "undersoft:scrollY (sessionStorage)",
                "Funcional, propia",
                "Guardar la posición de lectura para restablecerla si se recarga la página. No identifica al usuario y no se envía a Undersoft ni a terceros.",
                "Hasta el cierre de la pestaña",
              ],
              [
                "undersoft:lang (localStorage)",
                "Preferencias, propia",
                "Recordar el idioma elegido para aplicarlo en las visitas siguientes y en el resto de páginas. Solo se guarda si acepta la categoría «Preferencias».",
                "Hasta 6 meses, o hasta que retire el consentimiento",
              ],
            ],
          },
        },
        "Si Undersoft empezase a utilizar herramientas de estadística, de marketing u otras que no sean estrictamente necesarias, solo las cargará después de obtener su consentimiento para la categoría correspondiente, y actualizará esta Política.",
      ],
    },
    {
      id: "terceiros",
      title: "Recursos de terceros",
      blocks: [
        "El sitio web carga recursos de terceros para funcionar, como tipografías, iconos y banderas (Google Fonts, cdnjs, unpkg y FlagCDN), y utiliza servicios externos en el formulario de contacto: Cloudflare Turnstile (con un Worker de Cloudflare), que protege el formulario frente a spam y abusos. Por razones de seguridad, Turnstile se considera estrictamente necesario y no depende del consentimiento. Hasta donde Undersoft tiene conocimiento, estos servicios no instalan cookies de seguimiento en este contexto, pero sí reciben la dirección IP y datos técnicos de la solicitud. Consulte la [Política de Privacidad](" + LEGAL_PAGES["politica-de-privacidade"] + ") para obtener más información.",
        "Al acceder a enlaces de LinkedIn, Instagram, WhatsApp u otros sitios externos, se aplican las políticas de cookies de dichos sitios.",
      ],
    },
    {
      id: "gerir",
      title: "Cómo gestionarlas o eliminarlas",
      blocks: [
        "Puede cambiar o retirar su consentimiento en cualquier momento en «Ajustes de cookies», en el pie de cualquier página. Retirar el consentimiento es tan sencillo como darlo y no afecta a la licitud del tratamiento realizado hasta entonces. El almacenamiento de sesión se elimina al cerrar la pestaña del navegador. También puede gestionar, bloquear o eliminar cookies y datos de sitios en los ajustes de privacidad de su navegador. Bloquear las tecnologías indicadas anteriormente no afecta al funcionamiento del sitio web; simplemente, la posición de lectura dejará de restablecerse al recargar la página y dejará de recordarse el idioma.",
      ],
    },
    {
      id: "alteracoes",
      title: "Modificaciones",
      blocks: [
        "Esta Política podrá actualizarse, en particular si se incorporan nuevas funcionalidades. La versión vigente es la publicada en esta página, con la fecha de la última actualización.",
      ],
    },
    {
      id: "contactos",
      title: "Contacto y reclamaciones",
      blocks: [
        `Para cualquier cuestión, póngase en contacto con ${C.email}. El interesado puede también presentar una reclamación ante la Comisión Nacional de Protección de Datos (CNPD), en www.cnpd.pt.`,
      ],
    },
  ],
};
