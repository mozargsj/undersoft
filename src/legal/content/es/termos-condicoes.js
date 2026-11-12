import { COMPANY, COMPLAINTS_URL, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Términos y Condiciones",
  short: "Términos y Condiciones",
  subtitle: "Condiciones de uso del sitio web y del formulario de contacto.",
  sections: [
    {
      id: "identificacao",
      title: "Identificación y ámbito",
      blocks: [
        `El sitio web **${C.website}** («Sitio web») es propiedad de **${C.legalName}** y está gestionado por esta, persona jurídica con número de identificación fiscal (NIPC) ${C.nipc}, con domicilio social en ${C.address}, inscrita en ${C.registry} («Undersoft»). Contacto: ${C.email} y ${C.phone}.`,
        `Los presentes Términos y Condiciones regulan el acceso y el uso del Sitio web y de su formulario de contacto. No regulan la contratación de los servicios de Undersoft, que se rige por los [Términos de Servicio](${LEGAL_PAGES["termos-de-servico"]}) y por la propuesta aceptada por cada cliente.`,
        "Al navegar por el Sitio web o al enviar el formulario de contacto, el usuario declara haber leído, comprendido y aceptado estos Términos y Condiciones. Quien no esté de acuerdo debe abstenerse de utilizar el Sitio web.",
      ],
    },
    {
      id: "destinatarios",
      title: "A quién va dirigido",
      blocks: [
        "El Sitio web y los servicios que en él se presentan están dirigidos a empresas, empresarios y profesionales, en el ámbito de su actividad. El usuario declara ser mayor de 18 años y, cuando actúe en nombre de una empresa, tener poder para obligarla o para solicitar el contacto en su nombre.",
      ],
    },
    {
      id: "natureza-informativa",
      title: "Carácter informativo del contenido",
      blocks: [
        "Los contenidos del Sitio web tienen carácter meramente informativo y de presentación general de la actividad de Undersoft. No constituyen una oferta contractual vinculante, una promesa de resultados ni asesoramiento jurídico, fiscal, contable o de cualquier otra naturaleza regulada.",
        "Undersoft puede modificar, actualizar o retirar contenidos, descripciones de servicios y ejemplos en cualquier momento y sin previo aviso.",
        "Las marcas, logotipos y nombres de herramientas de terceros mencionados en el Sitio web (por ejemplo, programas de facturación, ERP u hojas de cálculo) se identifican únicamente para indicar compatibilidad o integración. Pertenecen a sus respectivos titulares y su mención no implica asociación, patrocinio ni aprobación.",
      ],
    },
    {
      id: "formulario",
      title: "Formulario de contacto",
      blocks: [
        "Al utilizar el formulario de contacto, el usuario se compromete a:",
        {
          ul: [
            "facilitar información veraz, completa y actualizada, en particular su nombre y su dirección de correo electrónico;",
            "describir su solicitud con el detalle suficiente para poder recibir una respuesta útil;",
            "no enviar datos personales de categorías especiales (por ejemplo, de salud o de convicciones), credenciales de acceso, contraseñas, datos bancarios ni información confidencial de terceros;",
            "no utilizar el formulario con fines publicitarios no solicitados, para enviar contenidos ilícitos ni para poner a prueba la seguridad del Sitio web.",
          ],
        },
        "El envío del formulario constituye únicamente una solicitud de contacto y de análisis inicial. **No crea ningún contrato ni obliga a Undersoft ni al usuario a contratar.** La prestación de servicios depende siempre de una propuesta escrita, aceptada por el cliente, conforme a los Términos de Servicio.",
        "Undersoft hará esfuerzos razonables por responder a las solicitudes, pero no garantiza un plazo de respuesta ni la aceptación de todas las solicitudes. Podrá rechazar las que no encajen en su actividad, sin obligación de justificarlo.",
        "El tratamiento de los datos personales enviados a través del formulario se describe en la [Política de Privacidad](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "utilizacao-permitida",
      title: "Uso permitido",
      blocks: [
        "El Sitio web debe utilizarse de forma lícita, de buena fe y conforme a estos Términos. Queda prohibido, en particular:",
        {
          ul: [
            "acceder o intentar acceder sin autorización a áreas, sistemas o datos, o tratar de explotar vulnerabilidades;",
            "sobrecargar, perturbar o interrumpir el funcionamiento del Sitio web, en particular mediante solicitudes automatizadas masivas;",
            "introducir o intentar introducir virus, código malicioso o cualquier elemento que pueda dañar sistemas o datos;",
            "recopilar contenidos de forma sistemática (scraping) o reproducir el Sitio web con fines comerciales;",
            "hacerse pasar por otra persona o entidad, o facilitar información falsa;",
            "realizar cualquier acto contrario a la ley, en particular a la Ley del Cibercrimen portuguesa (Ley n.º 109/2009, de 15 de septiembre), o que vulnere derechos de terceros.",
          ],
        },
        "Undersoft podrá bloquear el acceso a quien infrinja estas normas y comunicar la situación a las autoridades competentes, sin perjuicio de reclamar una indemnización por los daños sufridos.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propiedad intelectual",
      blocks: [
        "El Sitio web, incluidos su diseño, estructura, textos, imágenes, animaciones, código fuente, logotipo y la marca **Undersoft**, pertenece a Undersoft o se utiliza con autorización de sus titulares, y está protegido por el Código del Derecho de Autor y de los Derechos Afines portugués, por el régimen jurídico de los programas informáticos (Decreto-Ley n.º 252/94, de 20 de octubre) y por el Código de la Propiedad Industrial portugués.",
        "Se permite visualizar el Sitio web e imprimir o guardar extractos para uso personal o interno de la empresa del usuario. Cualquier otro uso, en particular la reproducción, adaptación, distribución, comunicación pública o utilización de la marca, requiere la autorización previa y por escrito de Undersoft.",
      ],
    },
    {
      id: "ligacoes-terceiros",
      title: "Enlaces y servicios de terceros",
      blocks: [
        "El Sitio web contiene enlaces a sitios y plataformas de terceros (por ejemplo, LinkedIn, Instagram y WhatsApp) y utiliza servicios de terceros para su funcionamiento. Undersoft no controla dichos servicios, no responde de sus contenidos, de su disponibilidad ni de sus prácticas de privacidad, y su uso se rige por los términos y políticas de sus respectivos titulares.",
      ],
    },
    {
      id: "disponibilidade",
      title: "Disponibilidad y seguridad",
      blocks: [
        "El Sitio web se ofrece «tal cual». Undersoft no garantiza el acceso continuo e ininterrumpido, la ausencia de errores ni que el Sitio web esté libre de elementos nocivos, y podrá suspender, limitar o modificar el Sitio web por motivos de mantenimiento, seguridad u otros. El usuario es responsable de la seguridad de su equipo y de su conexión.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitación de responsabilidad",
      blocks: [
        "En la máxima medida permitida por la ley, Undersoft no responde de los daños indirectos, del lucro cesante, de la pérdida de oportunidades ni de la pérdida de datos derivados del uso, o de la imposibilidad de uso, del Sitio web, ni de la confianza depositada en sus contenidos informativos.",
        "Nada de lo dispuesto en estos Términos excluye o limita la responsabilidad que, conforme a la ley, no pueda ser excluida o limitada, en particular en caso de dolo o culpa grave, ni los derechos imperativos de los consumidores.",
      ],
    },
    {
      id: "dados-cookies",
      title: "Protección de datos y cookies",
      blocks: [
        `El tratamiento de datos personales se describe en la [Política de Privacidad](${LEGAL_PAGES["politica-de-privacidade"]}) y el uso de cookies y tecnologías similares, en la [Política de Cookies](${LEGAL_PAGES["politica-de-cookies"]}). Ambas forman parte integrante de la información que Undersoft facilita al usuario.`,
      ],
    },
    {
      id: "alteracoes",
      title: "Modificaciones",
      blocks: [
        "Undersoft puede modificar estos Términos y Condiciones en cualquier momento. La versión vigente es la publicada en el Sitio web, con indicación de la fecha de la última actualización. El uso del Sitio web tras la publicación de las modificaciones implica su aceptación. Las modificaciones no se aplican con carácter retroactivo a las solicitudes ya enviadas.",
      ],
    },
    {
      id: "reclamacoes",
      title: "Comunicaciones y reclamaciones",
      blocks: [
        `Para cualquier cuestión relativa a estos Términos, el usuario puede ponerse en contacto con ${C.email}. Los consumidores disponen, además, del [Libro de Reclamaciones Electrónico](${COMPLAINTS_URL}), conforme al Decreto-Ley n.º 156/2005, de 15 de septiembre, en su redacción vigente.`,
      ],
    },
    {
      id: "lei-foro",
      title: "Ley aplicable y jurisdicción",
      blocks: [
        "Estos Términos y Condiciones se rigen por la ley portuguesa. En caso de litigio con un consumidor, se aplicarán las normas legales de competencia territorial. En los demás casos, será competente el tribunal de la circunscripción judicial del domicilio social de Undersoft, con renuncia expresa a cualquier otro.",
        "Si alguna disposición de estos Términos se considerase nula o ineficaz, las restantes seguirán en vigor.",
      ],
    },
  ],
};
