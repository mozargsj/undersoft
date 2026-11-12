import { COMPANY, COMPLAINTS_URL, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Términos de Servicio",
  short: "Términos de Servicio",
  subtitle: "Condiciones generales aplicables a la prestación de servicios de Undersoft a clientes empresariales.",
  sections: [
    {
      id: "prestador",
      title: "Prestador y definiciones",
      blocks: [
        `Los servicios son prestados por **${C.legalName}**, con número de identificación fiscal (NIPC) ${C.nipc}, domicilio social en ${C.address}, inscrita en ${C.registry} («Undersoft»). Contacto: ${C.email} y ${C.phone}.`,
        "En estos Términos, se entiende por:",
        {
          ul: [
            "**Cliente**: la empresa, empresario o profesional que contrata los Servicios;",
            "**Servicios**: el análisis de procesos, la automatización, la integración entre herramientas, el desarrollo de sistemas a medida, los informes, el mantenimiento y la evolución, y demás trabajos descritos en la Propuesta;",
            "**Propuesta**: el documento escrito, enviado por Undersoft y aceptado por el Cliente, que define el alcance, las fases, los plazos, el precio y las condiciones específicas;",
            "**Entregables**: los resultados concretos de los Servicios indicados en la Propuesta, como automatizaciones, integraciones, aplicaciones, paneles o documentación;",
            "**Herramientas de Terceros**: programas, plataformas, API y servicios en línea que no pertenecen a Undersoft, incluidos los que el Cliente ya utiliza;",
            "**Datos del Cliente**: toda la información y los contenidos, incluidos los datos personales, a los que Undersoft acceda o que trate por cuenta del Cliente.",
          ],
        },
      ],
    },
    {
      id: "ambito",
      title: "Ámbito y destinatarios",
      blocks: [
        "Estos Términos se aplican a todos los Servicios prestados por Undersoft, que están dirigidos a empresas, empresarios y profesionales en el ámbito de su actividad.",
        "Si, excepcionalmente, el Cliente fuese consumidor, conforme a la Ley de Defensa del Consumidor portuguesa (Ley n.º 24/96, de 31 de julio), se le aplicarán las normas imperativas de protección del consumidor, que prevalecen sobre estos Términos en caso de conflicto.",
        "El alcance concreto de cada contrato es el definido en la Propuesta. Lo que no figure en ella queda fuera del alcance y solo se ejecutará mediante acuerdo escrito.",
      ],
    },
    {
      id: "formacao-contrato",
      title: "Formación del contrato",
      blocks: [
        "La contratación sigue, por lo general, las siguientes etapas: solicitud de contacto, análisis inicial, envío de la Propuesta y aceptación por parte del Cliente. El análisis inicial se realiza sin coste y sin compromiso, en los términos indicados en el Sitio web.",
        "La Propuesta es válida durante 30 días desde la fecha de envío, salvo indicación en contrario. La aceptación puede efectuarse mediante firma, por correo electrónico o por cualquier otro medio escrito, incluido el electrónico, conforme al Decreto-Ley n.º 7/2004, de 7 de enero. El pago del primer importe debido, o el inicio de la ejecución a petición del Cliente, equivale a la aceptación.",
        "El contrato se compone, por orden decreciente de prevalencia, de: (i) el acuerdo de tratamiento de datos personales, cuando exista; (ii) la Propuesta aceptada y sus anexos; (iii) estos Términos de Servicio.",
        "Estos Términos constituyen condiciones generales de la contratación, conforme al Decreto-Ley n.º 446/85, de 25 de octubre. El Cliente declara que los conoció antes de contratar, que se le dio la oportunidad de aclarar sus dudas y que los acepta íntegramente.",
      ],
    },
    {
      id: "execucao",
      title: "Ejecución por fases",
      blocks: [
        "Los Servicios se ejecutan, preferentemente, por fases, comenzando por la parte de mayor impacto y menor riesgo. Cada fase tiene objetivos, Entregables, plazos estimados y criterios de aceptación definidos en la Propuesta. Undersoft podrá proponer una nueva aceptación del Cliente antes de iniciar cada fase siguiente.",
        "Undersoft presta los Servicios con la diligencia y la competencia técnica exigibles a un profesional de su sector, pudiendo recurrir a colaboradores y subcontratistas, de los que responde ante el Cliente.",
        "Salvo que la Propuesta indique expresamente un resultado medible como Entregable, la obligación de Undersoft es de medios y no de resultado. Las estimaciones de ahorro de tiempo o de costes, o de aumento de ingresos, son meramente indicativas y no constituyen garantía.",
      ],
    },
    {
      id: "obrigacoes-cliente",
      title: "Obligaciones del Cliente",
      blocks: [
        "Para que los Servicios puedan prestarse, el Cliente se obliga a:",
        {
          ul: [
            "facilitar a tiempo la información, los accesos y las decisiones necesarias, designando a una persona de contacto con poder de decisión;",
            "poner a disposición credenciales con los permisos estrictamente necesarios y mantenerlas actualizadas, revocándolas al finalizar el contrato;",
            "mantener vigentes las licencias y suscripciones de las Herramientas de Terceros que utiliza y cumplir sus respectivos términos;",
            "asegurar copias de seguridad de sus datos antes de cualquier intervención en sus sistemas;",
            "estar legitimado para tratar los datos personales que facilita y para compartirlos con Undersoft;",
            "validar los Entregables en los plazos previstos y comunicar por escrito cualquier defecto.",
          ],
        },
        "Los retrasos u omisiones del Cliente prorrogan los plazos en la medida correspondiente y pueden dar lugar a la facturación de costes adicionales, cuando estén documentados.",
      ],
    },
    {
      id: "prazos",
      title: "Plazos",
      blocks: [
        "Los plazos indicados son estimaciones de buena fe, salvo que la Propuesta los fije como obligación. Dependen del cumplimiento de las obligaciones del Cliente y de la disponibilidad y el funcionamiento de las Herramientas de Terceros implicadas.",
      ],
    },
    {
      id: "aceitacao",
      title: "Aceptación de los Entregables",
      blocks: [
        "Una vez concluido un Entregable, Undersoft lo notifica al Cliente, que dispone de 5 días hábiles para probarlo y comunicar por escrito, de forma motivada, cualquier defecto. Se considera defecto la desviación objetiva respecto de las especificaciones de la Propuesta.",
        "Transcurrido ese plazo sin comunicación, o si el Cliente utiliza el Entregable en un entorno real, este se considera aceptado. Undersoft corregirá los defectos comunicados en un plazo razonable. Las solicitudes que modifiquen las especificaciones se tratan como una modificación del alcance.",
      ],
    },
    {
      id: "alteracoes-ambito",
      title: "Modificaciones del alcance",
      blocks: [
        "Cualquier modificación del alcance debe solicitarse por escrito. Undersoft indicará su impacto en el precio y en el plazo y solo la ejecutará previo acuerdo del Cliente.",
      ],
    },
    {
      id: "preco-pagamento",
      title: "Precio y pago",
      blocks: [
        "Los precios son los definidos en la Propuesta, expresados en euros y a los que se añadirá el IVA al tipo legal vigente. El pago puede ser fraccionado, mediante anticipo, por hitos o mensual, según la Propuesta. La facturación se realiza por vía electrónica.",
        "Salvo indicación diferente en la Propuesta o en la factura, el pago debe efectuarse en el plazo de 15 días desde la fecha de emisión de la factura.",
        "En caso de retraso, se devengarán intereses de demora a los tipos legales aplicables a las operaciones comerciales y la compensación por los costes de cobro prevista en el Decreto-Ley n.º 62/2013, de 10 de mayo. Si persiste la mora, Undersoft podrá suspender los Servicios previo aviso escrito con 8 días de antelación, sin que ello constituya incumplimiento por su parte.",
        "Salvo indicación en contrario, no están incluidos en el precio los costes de licencias, suscripciones, API, alojamiento o uso de Herramientas de Terceros, que corren a cargo del Cliente.",
      ],
    },
    {
      id: "servicos-recorrentes",
      title: "Servicios recurrentes",
      blocks: [
        "Cuando la Propuesta incluya mantenimiento, soporte o evolución continua, el contrato estará vigente durante el período inicial indicado en ella y se renovará automáticamente por períodos iguales, salvo denuncia por cualquiera de las partes, por escrito, con una antelación mínima de 30 días respecto del vencimiento del período en curso.",
        "A falta de indicación en contrario, el soporte se presta por correo electrónico y teléfono, en días hábiles y en horario laboral habitual, sin tiempos de respuesta garantizados. Los importes recurrentes podrán actualizarse anualmente, mediante comunicación con 30 días de antelación.",
        "No están cubiertos por el mantenimiento los problemas causados por modificaciones de Herramientas de Terceros, por intervenciones del Cliente o de terceros en los sistemas, o por un uso distinto del previsto. Su resolución podrá presupuestarse por separado.",
      ],
    },
    {
      id: "ferramentas-terceiros",
      title: "Herramientas de Terceros",
      blocks: [
        "Las integraciones y automatizaciones dependen de Herramientas de Terceros, que Undersoft no controla. Los cambios, límites, indisponibilidades, variaciones de precios o de condiciones, o la discontinuación de dichas herramientas pueden afectar al funcionamiento de los Entregables. Undersoft no responde de los fallos que de ello se deriven, pero se esforzará razonablemente en la adaptación, que podrá presupuestarse como mantenimiento.",
        "Cuando una automatización interactúe con programas de facturación o contabilidad, el Cliente mantiene la responsabilidad del encuadre fiscal (incluidos el IVA, las retenciones, las series y las comunicaciones a la Autoridad Tributaria y Aduanera portuguesa) y de la validación de los documentos emitidos. Undersoft no presta asesoramiento fiscal, contable ni jurídico.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propiedad intelectual",
      blocks: [
        "Undersoft conserva todos los derechos sobre su know-how, metodologías, bibliotecas, componentes, modelos y herramientas, anteriores o desarrollados con independencia de los Servicios, así como sobre las mejoras de carácter general que de ellos resulten.",
        "Tras el pago íntegro del precio correspondiente, el Cliente adquiere una licencia de uso de los Entregables específicos que se le destinen, no exclusiva, por tiempo indefinido, para uso interno en su actividad y en la de su grupo empresarial, intransmisible sin el acuerdo de Undersoft, salvo en caso de transmisión del establecimiento. Si la Propuesta prevé la cesión de derechos de autor, prevalece lo allí establecido.",
        "Los Datos del Cliente y los contenidos que este facilite siguen siendo propiedad del Cliente. Undersoft solo los utiliza para prestar los Servicios. Los componentes de terceros y de código abierto quedan sujetos a sus respectivas licencias.",
        "Salvo oposición escrita del Cliente, Undersoft podrá indicar el nombre y el logotipo del Cliente como referencia comercial.",
      ],
    },
    {
      id: "confidencialidade",
      title: "Confidencialidad",
      blocks: [
        "Cada parte se compromete a mantener confidencial la información no pública de la otra a la que acceda con motivo del contrato, a utilizarla únicamente para su ejecución y a divulgarla solo a quienes la necesiten para ese fin y estén vinculados por un deber de confidencialidad equivalente.",
        "No es confidencial la información que sea o llegue a ser pública sin culpa de la parte receptora, que ya fuese legítimamente conocida por esta, o cuya divulgación sea exigida por la ley o por decisión de una autoridad competente. Este deber se mantiene durante la vigencia del contrato y durante 3 años tras su extinción, y sin límite de tiempo respecto de los secretos comerciales mientras tengan tal carácter.",
      ],
    },
    {
      id: "protecao-dados",
      title: "Protección de datos personales",
      blocks: [
        "Cuando, en la ejecución de los Servicios, Undersoft trate datos personales por cuenta del Cliente, el Cliente es el responsable del tratamiento y Undersoft es el encargado del tratamiento, conforme al artículo 28 del Reglamento (UE) 2016/679 (RGPD). Dicho tratamiento se regulará mediante un acuerdo escrito, celebrado antes de su inicio, que defina el objeto, la duración, las instrucciones, las medidas de seguridad y el régimen de subcontratación.",
        "El Cliente garantiza que los datos se han recogido de forma lícita y que está legitimado para facilitarlos. En cuanto a los datos de contacto del Cliente y de sus representantes, Undersoft actúa como responsable del tratamiento, conforme a la [Política de Privacidad](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "seguranca",
      title: "Seguridad y accesos",
      blocks: [
        "Undersoft adopta medidas técnicas y organizativas adecuadas para la protección de las credenciales y de los datos a los que acceda, y los utiliza únicamente en la medida necesaria para los Servicios. Ningún sistema es absolutamente seguro, por lo que Undersoft no garantiza la ausencia total de incidentes. El Cliente es responsable de la seguridad de su propia infraestructura y de sus cuentas, y debe notificar de inmediato a Undersoft cualquier sospecha de vulneración.",
      ],
    },
    {
      id: "garantia",
      title: "Garantía de corrección",
      blocks: [
        "Durante el período de garantía indicado en la Propuesta y, en su defecto, durante 30 días desde la aceptación, Undersoft corrige sin coste adicional los defectos de los Entregables que se le comuniquen por escrito. La garantía no cubre los defectos causados por modificaciones realizadas por el Cliente o por terceros, por fallos o cambios en Herramientas de Terceros, por datos incorrectos, por un uso distinto del previsto o por fallos de la infraestructura del Cliente.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitación de responsabilidad",
      blocks: [
        "En la máxima medida permitida por la ley, la responsabilidad total de Undersoft frente al Cliente, cualquiera que sea su fundamento, queda limitada al importe efectivamente abonado por el Cliente por el Servicio que originó el daño, en los 12 meses anteriores al hecho.",
        "Undersoft no responde de los daños indirectos, del lucro cesante, de la pérdida de clientela o de oportunidades, de los daños reputacionales, ni de la pérdida de datos que el Cliente habría podido evitar mediante copias de seguridad.",
        "Nada de lo dispuesto en estos Términos excluye o limita la responsabilidad por dolo o culpa grave, por daños a la vida, a la integridad física o a la salud, ni cualquier responsabilidad que la ley imperativa no permita excluir o limitar.",
      ],
    },
    {
      id: "duracao-cessacao",
      title: "Duración y extinción",
      blocks: [
        "Los contratos de proyecto están vigentes hasta la conclusión de los Servicios y el pago íntegro del precio. Los servicios recurrentes están vigentes en los términos indicados anteriormente.",
        "Cualquiera de las partes podrá resolver el contrato en caso de incumplimiento grave de la otra, si este no se subsana en el plazo de 15 días desde la notificación escrita. El Cliente podrá, además, cancelar el contrato en cualquier momento, por escrito, quedando obligado a pagar los Servicios prestados y los gastos incurridos hasta la fecha de extinción, así como los trabajos en curso, en proporción a lo ejecutado.",
        "Extinguido el contrato, Undersoft devuelve o elimina los Datos del Cliente, según este indique, salvo obligación legal de conservación, y el Cliente revoca los accesos concedidos. Se mantienen en vigor las cláusulas que, por su naturaleza, deban subsistir, como las relativas al pago, la propiedad intelectual, la confidencialidad y la responsabilidad.",
      ],
    },
    {
      id: "forca-maior",
      title: "Fuerza mayor",
      blocks: [
        "Ninguna de las partes responde del incumplimiento o del retraso causado por circunstancias ajenas a su control razonable, como fallos generalizados del suministro eléctrico, de las telecomunicaciones o de los servicios en la nube, ciberataques no imputables a la parte, huelgas, catástrofes o decisiones de las autoridades. La parte afectada debe informar a la otra con la mayor brevedad posible. Si el impedimento dura más de 60 días, cualquiera de las partes podrá resolver el contrato, sin indemnización.",
      ],
    },
    {
      id: "nao-aliciamento",
      title: "No captación de personal",
      blocks: [
        "Durante la vigencia del contrato y los 12 meses siguientes, el Cliente no contratará ni tratará de captar a colaboradores o subcontratistas de Undersoft que hayan participado en la prestación de los Servicios, salvo acuerdo escrito.",
      ],
    },
    {
      id: "comunicacoes",
      title: "Comunicaciones",
      blocks: [
        "Las comunicaciones entre las partes se realizan por escrito, preferentemente por correo electrónico, a las direcciones indicadas en la Propuesta o, en su defecto, a las que consten en el contrato o en el Sitio web. Cada parte debe informar a la otra de cualquier cambio en sus datos de contacto.",
      ],
    },
    {
      id: "gerais",
      title: "Disposiciones generales",
      blocks: [
        "Ninguna de las partes podrá ceder su posición contractual sin el consentimiento escrito de la otra, salvo Undersoft en favor de entidades de su grupo o en caso de transmisión de su actividad. La tolerancia en el cumplimiento no constituye renuncia a ningún derecho. La nulidad de una cláusula no afecta a las restantes. El contrato, compuesto conforme a lo indicado anteriormente, sustituye a cualquier acuerdo previo sobre el mismo objeto, y sus modificaciones deben realizarse por escrito.",
        "Undersoft podrá actualizar estos Términos, que se aplicarán a los contratos celebrados tras su publicación. Los contratos en curso mantienen la versión aceptada, salvo en lo relativo a las modificaciones impuestas por la ley. La versión en lengua portuguesa prevalece sobre cualquier traducción.",
      ],
    },
    {
      id: "lei-litigios",
      title: "Ley aplicable y resolución de litigios",
      blocks: [
        "El contrato se rige por la ley portuguesa. Las partes procurarán resolver amistosamente cualquier controversia durante los 15 días siguientes a la notificación escrita. De no alcanzarse una solución amistosa, será competente el tribunal de la circunscripción judicial del domicilio social de Undersoft, con renuncia a cualquier otro, salvo que el Cliente sea consumidor, en cuyo caso se aplicarán las normas legales de competencia.",
        `Conforme a la Ley n.º 144/2015, de 8 de septiembre, se informa de que Undersoft no está vinculada a ninguna entidad de resolución alternativa de litigios de consumo, sin perjuicio de que el consumidor pueda recurrir a cualquier entidad de resolución alternativa legalmente competente, cuya lista está disponible en consumidor.gov.pt. Los consumidores disponen, además, del [Libro de Reclamaciones Electrónico](${COMPLAINTS_URL}).`,
      ],
    },
  ],
};
