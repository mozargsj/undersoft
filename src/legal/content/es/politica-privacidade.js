import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Política de Privacidad",
  short: "Política de Privacidad",
  subtitle: "Cómo Undersoft recoge, utiliza y protege los datos personales, conforme al RGPD y a la legislación portuguesa.",
  sections: [
    {
      id: "introducao",
      title: "Introducción y marco legal",
      blocks: [
        "Undersoft respeta la privacidad de quienes visitan su sitio web, se ponen en contacto con ella o contratan sus servicios. Esta Política explica qué datos personales se tratan, con qué fines, sobre qué base jurídica, durante cuánto tiempo y qué derechos asisten a los interesados.",
        "El tratamiento de datos personales cumple el Reglamento (UE) 2016/679 (Reglamento General de Protección de Datos, RGPD), la Ley n.º 58/2019, de 8 de agosto, que asegura su ejecución en el ordenamiento jurídico portugués, y la Ley n.º 41/2004, de 18 de agosto, relativa a la privacidad en las comunicaciones electrónicas, en su redacción vigente.",
      ],
    },
    {
      id: "responsavel",
      title: "Responsable del tratamiento",
      blocks: [
        `El responsable del tratamiento es **${C.legalName}** («Undersoft»).`,
        `Para cualquier cuestión sobre privacidad o para ejercer sus derechos, póngase en contacto con ${C.email}. Undersoft no está legalmente obligada a designar un delegado de protección de datos, sin perjuicio de mantener este canal dedicado a los interesados.`,
        "Esta Política no se aplica a los datos que Undersoft trate **por cuenta de sus clientes** en la ejecución de proyectos (por ejemplo, los datos de los clientes finales de una empresa). En esos casos, el cliente es el responsable del tratamiento y Undersoft actúa como encargado del tratamiento, en virtud de un acuerdo específico, conforme al artículo 28 del RGPD.",
      ],
    },
    {
      id: "dados",
      title: "Datos personales que tratamos",
      blocks: [
        {
          table: {
            head: ["Categoría", "Ejemplos", "Origen"],
            rows: [
              ["Identificación y contacto", "Nombre, correo electrónico, teléfono, empresa, cargo", "Facilitados por el interesado, en el formulario o por otros canales"],
              ["Contenido de las comunicaciones", "Mensaje y descripción del proceso que desea mejorar; intercambios de correo electrónico, WhatsApp o teléfono", "Facilitados por el interesado"],
              ["Datos contractuales y de facturación", "Datos de la empresa y de sus representantes, NIF (número de identificación fiscal), domicilio, historial de propuestas y facturas", "Facilitados por el interesado o por la empresa"],
              ["Datos técnicos", "Dirección IP, tipo de navegador y de dispositivo, fecha y hora de acceso", "Recogidos automáticamente al acceder al sitio web y al enviar el formulario"],
              ["Registro de la aceptación", "Aceptación de los Términos y Condiciones, con fecha y hora de la solicitud", "Generado al enviar el formulario"],
            ],
          },
        },
        "Undersoft no pretende recoger datos de categorías especiales (artículo 9 del RGPD) ni datos de menores. Le rogamos que no los incluya en los mensajes que envíe.",
      ],
    },
    {
      id: "finalidades",
      title: "Fines, bases jurídicas y conservación",
      blocks: [
        {
          table: {
            head: ["Fin", "Base jurídica del tratamiento", "Conservación"],
            rows: [
              [
                "Responder a las solicitudes de contacto y realizar el análisis inicial",
                "Aplicación de medidas precontractuales a petición del interesado (art. 6.1.b) del RGPD)",
                "Hasta 24 meses después del último contacto, salvo que derive en un contrato",
              ],
              [
                "Preparar propuestas, celebrar y ejecutar contratos, gestionar la relación con los clientes",
                "Ejecución de un contrato o aplicación de medidas precontractuales (art. 6.1.b))",
                "Durante la vigencia del contrato y durante los plazos legales tras su extinción",
              ],
              [
                "Facturación, contabilidad y obligaciones fiscales",
                "Cumplimiento de obligaciones legales (art. 6.1.c))",
                "Con carácter general, 10 años",
              ],
              [
                "Seguridad del sitio web, prevención de abusos y de spam",
                "Interés legítimo de Undersoft (art. 6.1.f))",
                "Durante el período estrictamente necesario, con carácter general hasta 12 meses",
              ],
              [
                "Cobro de créditos y defensa de derechos en procedimientos judiciales o administrativos",
                "Interés legítimo (art. 6.1.f))",
                "Hasta la expiración de los plazos de prescripción o la conclusión del procedimiento",
              ],
              [
                "Comunicaciones comerciales sobre los servicios de Undersoft",
                "Consentimiento (art. 6.1.a)) o, en el caso de clientes y de servicios análogos, interés legítimo conforme al artículo 13-A de la Ley n.º 41/2004, con derecho de oposición",
                "Hasta la retirada del consentimiento o la oposición",
              ],
            ],
          },
        },
        "Una vez transcurridos los plazos, los datos se suprimen o se anonimizan, salvo que la ley exija conservarlos durante más tiempo.",
      ],
    },
    {
      id: "obrigatoriedade",
      title: "Carácter obligatorio de los datos",
      blocks: [
        "Los campos marcados con un asterisco en el formulario son obligatorios. Sin ellos no es posible responder a la solicitud. La aceptación de los Términos y Condiciones es requisito para enviar el formulario.",
      ],
    },
    {
      id: "decisoes-automatizadas",
      title: "Decisiones automatizadas",
      blocks: [
        "Undersoft no adopta decisiones basadas únicamente en el tratamiento automatizado, incluida la elaboración de perfiles, que produzcan efectos jurídicos o afecten significativamente a los interesados.",
      ],
    },
    {
      id: "destinatarios",
      title: "Destinatarios de los datos",
      blocks: [
        "Los datos pueden comunicarse a entidades que tratan datos por cuenta de Undersoft (encargados del tratamiento), vinculadas por contrato conforme al artículo 28 del RGPD, y a entidades que los reciben en virtud de una obligación legal. En concreto:",
        {
          ul: [
            "proveedores del formulario de contacto y del envío de su correo electrónico (Cloudflare Workers y Cloudflare Email Routing), de protección contra spam y abusos (Cloudflare Turnstile) y de alojamiento e infraestructura del sitio web;",
            "proveedores de correo electrónico, comunicación y productividad;",
            "contable certificado y software de facturación;",
            "asesores jurídicos, auditores y aseguradoras, cuando sea necesario;",
            "autoridades públicas, como la Autoridad Tributaria y Aduanera portuguesa, los tribunales y la Comisión Nacional de Protección de Datos (CNPD), cuando la ley lo exija.",
          ],
        },
        "Undersoft no vende ni cede datos personales a terceros con fines de marketing.",
      ],
    },
    {
      id: "transferencias",
      title: "Transferencias internacionales",
      blocks: [
        "Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo, en particular en los Estados Unidos de América. En esos casos, Undersoft recurre a los mecanismos previstos en el RGPD, como las decisiones de adecuación de la Comisión Europea (incluido el Marco de Privacidad de Datos UE-EE. UU., cuando el destinatario esté certificado) o las cláusulas contractuales tipo. Puede solicitar información sobre las garantías aplicadas a través del contacto indicado.",
      ],
    },
    {
      id: "recursos-terceiros",
      title: "Recursos de terceros cargados por el sitio web",
      blocks: [
        "Para mostrar el sitio web, el navegador del visitante carga recursos alojados por terceros, lo que implica que esos proveedores reciban la dirección IP y datos técnicos de la solicitud:",
        {
          table: {
            head: ["Recurso", "Finalidad"],
            rows: [
              ["Google Fonts (Google)", "Tipografía del sitio web"],
              ["cdnjs (Cloudflare)", "Biblioteca de iconos"],
              ["unpkg", "Biblioteca de iconos"],
              ["FlagCDN", "Imágenes de las banderas del selector de idioma"],
              ["Cloudflare Turnstile (Cloudflare)", "Protección del formulario de contacto frente a spam y abusos. Analiza datos técnicos del navegador, se carga en la página de inicio y el envío del formulario se valida mediante un servicio de Cloudflare (Workers)"],
            ],
          },
        },
        "Estos proveedores tratan los datos conforme a sus propias políticas de privacidad. Consulte también la [Política de Cookies](" + LEGAL_PAGES["politica-de-cookies"] + ").",
      ],
    },
    {
      id: "direitos",
      title: "Derechos de los interesados",
      blocks: [
        "Conforme al RGPD, el interesado tiene derecho a:",
        {
          ul: [
            "**acceso**: saber si tratamos datos que le conciernen y obtener una copia;",
            "**rectificación**: corregir datos inexactos o incompletos;",
            "**supresión**: solicitar la eliminación de los datos cuando no exista fundamento para conservarlos;",
            "**limitación**: solicitar la restricción del tratamiento en determinadas situaciones;",
            "**portabilidad**: recibir los datos que haya facilitado en un formato estructurado y de uso común, cuando el tratamiento se base en el consentimiento o en un contrato y se efectúe por medios automatizados;",
            "**oposición**: oponerse al tratamiento basado en el interés legítimo y, en cualquier momento, al tratamiento con fines de marketing;",
            "**retirar el consentimiento**, en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.",
          ],
        },
        `Para ejercer estos derechos, envíe una solicitud a ${C.email}. Podemos pedirle información que permita confirmar la identidad del solicitante. Respondemos en el plazo de un mes, prorrogable por dos meses más en casos complejos, y sin coste alguno, salvo en el caso de solicitudes manifiestamente infundadas o excesivas.`,
        "El interesado tiene además derecho a presentar una reclamación ante la autoridad de control, la Comisión Nacional de Protección de Datos (CNPD), en www.cnpd.pt.",
      ],
    },
    {
      id: "seguranca",
      title: "Seguridad",
      blocks: [
        "Undersoft aplica medidas técnicas y organizativas adecuadas al riesgo, como conexiones cifradas, control de accesos, principio de mínimo privilegio y compromisos de confidencialidad. Ningún sistema es totalmente seguro. En caso de violación de la seguridad de los datos personales, Undersoft actuará conforme a los artículos 33 y 34 del RGPD, notificándola a la CNPD y a los interesados afectados cuando la ley lo exija.",
      ],
    },
    {
      id: "ligacoes-externas",
      title: "Redes sociales y enlaces externos",
      blocks: [
        "El sitio web contiene enlaces a LinkedIn, Instagram y WhatsApp. Cuando el usuario accede a ellos o se pone en contacto con Undersoft a través de esas plataformas, se aplican las políticas de privacidad de sus respectivos titulares, sobre las que Undersoft no tiene control.",
      ],
    },
    {
      id: "menores",
      title: "Menores",
      blocks: [
        "Los servicios y el sitio web están dirigidos a empresas y profesionales, y no a menores de 18 años. Si tiene conocimiento de que hemos recogido datos de un menor, póngase en contacto con nosotros para que los eliminemos.",
      ],
    },
    {
      id: "alteracoes",
      title: "Modificaciones de esta Política",
      blocks: [
        "Esta Política podrá actualizarse para reflejar cambios legales o de nuestra actividad. La versión vigente es la publicada en esta página, con la fecha de la última actualización. En caso de modificaciones relevantes, se comunicarán de forma adecuada.",
      ],
    },
  ],
};
