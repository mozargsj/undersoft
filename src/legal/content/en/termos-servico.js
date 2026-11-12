import { COMPANY, COMPLAINTS_URL, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Terms of Service",
  short: "Terms of Service",
  subtitle: "General conditions applicable to the provision of Undersoft's services to business clients.",
  sections: [
    {
      id: "prestador",
      title: "Service provider and definitions",
      blocks: [
        `The services are provided by **${C.legalName}**, tax identification number (NIPC) ${C.nipc}, whose registered office is at ${C.address}, registered with the ${C.registry} ("Undersoft"). Contact details: ${C.email} and ${C.phone}.`,
        "In these Terms, the following definitions apply:",
        {
          ul: [
            "**Client**: the company, business owner or professional that engages the Services;",
            "**Services**: process analysis, automation, integration between tools, bespoke systems development, reporting, maintenance and enhancement, and any other work described in the Proposal;",
            "**Proposal**: the written document, sent by Undersoft and accepted by the Client, that sets out the scope, phases, deadlines, price and specific conditions;",
            "**Deliverables**: the concrete outputs of the Services identified in the Proposal, such as automations, integrations, applications, dashboards or documentation;",
            "**Third-Party Tools**: software, platforms, APIs and online services that do not belong to Undersoft, including those already used by the Client;",
            "**Client Data**: all information and content, including personal data, to which Undersoft has access or which it processes on behalf of the Client.",
          ],
        },
      ],
    },
    {
      id: "ambito",
      title: "Scope and intended audience",
      blocks: [
        "These Terms apply to all Services provided by Undersoft, which are intended for companies, business owners and professionals acting in the course of their activity.",
        "If, exceptionally, the Client is a consumer within the meaning of the Consumer Protection Act (Law No. 24/96 of 31 July), the mandatory consumer protection rules apply and prevail over these Terms in the event of conflict.",
        "The specific scope of each contract is that defined in the Proposal. Anything not included in it falls outside the scope and will be carried out only by written agreement.",
      ],
    },
    {
      id: "formacao-contrato",
      title: "Formation of the contract",
      blocks: [
        "Engagement generally follows these stages: a contact request, an initial assessment, the sending of the Proposal and its acceptance by the Client. The initial assessment is carried out free of charge and without obligation, as stated on the Website.",
        "The Proposal is valid for 30 days from the date it is sent, unless otherwise stated. Acceptance may be given by signature, by email or by any other written means, including electronic means, pursuant to Decree-Law No. 7/2004 of 7 January. Payment of the first amount due, or the commencement of performance at the Client's request, is deemed to constitute acceptance.",
        "The contract comprises, in descending order of precedence: (i) the personal data processing agreement, where one exists; (ii) the accepted Proposal and its annexes; (iii) these Terms of Service.",
        "These Terms constitute standard contractual terms within the meaning of Decree-Law No. 446/85 of 25 October. The Client declares that it was made aware of them before contracting, that it was given the opportunity to clarify any doubts, and that it accepts them in full.",
      ],
    },
    {
      id: "execucao",
      title: "Performance in phases",
      blocks: [
        "The Services are preferably performed in phases, starting with the part of greatest impact and lowest risk. Each phase has objectives, Deliverables, estimated deadlines and acceptance criteria defined in the Proposal. Undersoft may request the Client's renewed acceptance before starting each subsequent phase.",
        "Undersoft provides the Services with the diligence and technical competence expected of a professional in its field, and may use employees and subcontractors, for whom it remains responsible to the Client.",
        "Unless the Proposal expressly states a measurable result as a Deliverable, Undersoft's obligation is one of means and not of results. Estimates of time savings, cost savings or revenue increases are indicative only and do not constitute a guarantee.",
      ],
    },
    {
      id: "obrigacoes-cliente",
      title: "Client obligations",
      blocks: [
        "In order for the Services to be provided, the Client undertakes to:",
        {
          ul: [
            "provide the necessary information, access and decisions in good time, designating a contact person with authority to make decisions;",
            "make credentials available with strictly the permissions required and keep them up to date, revoking them at the end of the contract;",
            "keep valid the licences and subscriptions for the Third-Party Tools it uses and comply with their terms;",
            "ensure that backups of its data are made before any intervention in its systems;",
            "have the legitimacy to process the personal data it makes available and to share it with Undersoft;",
            "validate the Deliverables within the specified deadlines and report any defect in writing.",
          ],
        },
        "Delays or omissions on the part of the Client extend the deadlines accordingly and may give rise to the invoicing of additional costs, where documented.",
      ],
    },
    {
      id: "prazos",
      title: "Deadlines",
      blocks: [
        "The deadlines indicated are good-faith estimates, unless the Proposal fixes them as an obligation. They depend on the Client's compliance with its obligations and on the availability and operation of the Third-Party Tools involved.",
      ],
    },
    {
      id: "aceitacao",
      title: "Acceptance of Deliverables",
      blocks: [
        "Once a Deliverable is completed, Undersoft notifies the Client, which has 5 business days to test it and to report any defects in writing, with supporting reasons. A defect is an objective deviation from the specifications in the Proposal.",
        "If that period expires without any notification, or if the Client uses the Deliverable in a live environment, the Deliverable is deemed accepted. Undersoft will correct any reported defects within a reasonable time. Requests that change the specifications are treated as a change of scope.",
      ],
    },
    {
      id: "alteracoes-ambito",
      title: "Changes to scope",
      blocks: [
        "Any change to the scope must be requested in writing. Undersoft will state its impact on price and deadline and will carry it out only after the Client's agreement.",
      ],
    },
    {
      id: "preco-pagamento",
      title: "Price and payment",
      blocks: [
        "Prices are those set out in the Proposal, expressed in euros and exclusive of VAT at the statutory rate in force. Payment may be made in instalments, as a deposit, by milestones or monthly, as specified in the Proposal. Invoicing is carried out electronically.",
        "Unless otherwise stated in the Proposal or on the invoice, payment must be made within 15 days of the invoice date.",
        "In the event of late payment, default interest is due at the statutory rates applicable to commercial transactions, together with the compensation for recovery costs provided for in Decree-Law No. 62/2013 of 10 May. If the default persists, Undersoft may suspend the Services after giving 8 days' written notice, and such suspension shall not constitute a breach on its part.",
        "Unless otherwise stated, the price does not include the costs of licences, subscriptions, APIs, hosting or use of Third-Party Tools, which are borne by the Client.",
      ],
    },
    {
      id: "servicos-recorrentes",
      title: "Recurring services",
      blocks: [
        "Where the Proposal includes ongoing maintenance, support or enhancement, the contract remains in force for the initial period stated in it and is automatically renewed for equal periods, unless either party gives written notice of termination at least 30 days before the end of the current period.",
        "Unless otherwise stated, support is provided by email and telephone, on business days and during normal business hours, with no guaranteed response times. Recurring fees may be updated annually, upon 30 days' notice.",
        "Maintenance does not cover problems caused by changes to Third-Party Tools, by interventions by the Client or third parties in the systems, or by use other than as intended. Their resolution may be quoted separately.",
      ],
    },
    {
      id: "ferramentas-terceiros",
      title: "Third-Party Tools",
      blocks: [
        "Integrations and automations depend on Third-Party Tools, which Undersoft does not control. Changes, limits, unavailability, changes in prices or terms, or the discontinuation of those tools may affect the operation of the Deliverables. Undersoft is not liable for failures arising from them, but will make reasonable efforts to adapt, which may be quoted as maintenance.",
        "Where an automation interacts with invoicing or accounting software, the Client remains responsible for the tax treatment (including VAT, withholdings, series and communications to the Portuguese Tax and Customs Authority) and for validating the documents issued. Undersoft does not provide tax, accounting or legal advice.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Intellectual property",
      blocks: [
        "Undersoft retains all rights in its know-how, methodologies, libraries, components, templates and tools, whether pre-existing or developed independently of the Services, as well as in any improvements of a general nature arising from them.",
        "Upon full payment of the corresponding price, the Client acquires a non-exclusive, perpetual licence to use the specific Deliverables intended for it, for internal use in its business and that of its corporate group, which may not be transferred without Undersoft's agreement, except in the event of a transfer of the business. If the Proposal provides for an assignment of copyright, the Proposal prevails.",
        "Client Data and the content provided by the Client remain the property of the Client. Undersoft uses them only to provide the Services. Third-party and open-source components remain subject to their respective licences.",
        "Unless the Client objects in writing, Undersoft may cite the Client's name and logo as a commercial reference.",
      ],
    },
    {
      id: "confidencialidade",
      title: "Confidentiality",
      blocks: [
        "Each party undertakes to keep confidential the non-public information of the other to which it gains access by reason of the contract, to use it only for the performance of the contract, and to disclose it only to those who need it for that purpose and are bound by an equivalent duty of confidentiality.",
        "Information is not confidential if it is or becomes public through no fault of the receiving party, if it was already lawfully known to that party, or if its disclosure is required by law or by a decision of a competent authority. This duty remains in force for the term of the contract and for 3 years after it ends, and without time limit in respect of trade secrets for as long as they remain such.",
      ],
    },
    {
      id: "protecao-dados",
      title: "Protection of personal data",
      blocks: [
        "Where, in performing the Services, Undersoft processes personal data on behalf of the Client, the Client is the controller and Undersoft is the processor, pursuant to Article 28 of Regulation (EU) 2016/679 (GDPR). Such processing will be governed by a written agreement, entered into before it begins, which defines the subject matter, duration, instructions, security measures and the subcontracting regime.",
        "The Client warrants that the data was collected lawfully and that it is entitled to make it available. With regard to the contact details of the Client and its representatives, Undersoft acts as controller, in accordance with the [Privacy Policy](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "seguranca",
      title: "Security and access",
      blocks: [
        "Undersoft adopts technical and organisational measures appropriate to protect the credentials and data to which it has access, and uses them only to the extent necessary for the Services. No system is absolutely secure, and Undersoft therefore does not guarantee the complete absence of incidents. The Client is responsible for the security of its own infrastructure and accounts and must notify Undersoft immediately of any suspected compromise.",
      ],
    },
    {
      id: "garantia",
      title: "Warranty of correction",
      blocks: [
        "During the warranty period stated in the Proposal and, failing that, for 30 days after acceptance, Undersoft will correct, at no additional cost, defects in the Deliverables that are reported to it in writing. The warranty does not cover defects caused by changes made by the Client or third parties, by failures or changes in Third-Party Tools, by incorrect data, by use other than as intended, or by failures in the Client's infrastructure.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitation of liability",
      blocks: [
        "To the fullest extent permitted by law, Undersoft's total liability to the Client, on whatever basis, is limited to the amount actually paid by the Client for the Service that gave rise to the damage, in the 12 months preceding the event.",
        "Undersoft is not liable for indirect damage, loss of profit, loss of customers or opportunities, reputational damage, or for the loss of data that the Client could have avoided by making backups.",
        "Nothing in these Terms excludes or limits liability for wilful misconduct or gross negligence, for damage to life, physical integrity or health, or any liability that mandatory law does not allow to be excluded or limited.",
      ],
    },
    {
      id: "duracao-cessacao",
      title: "Term and termination",
      blocks: [
        "Project contracts remain in force until the Services are completed and the price has been paid in full. Recurring services remain in force on the terms set out above.",
        "Either party may terminate the contract in the event of a serious breach by the other, if it is not remedied within 15 days of written notice. The Client may also cancel the contract at any time, in writing, in which case it must pay for the Services provided and the expenses incurred up to the date of termination, as well as for work in progress, in proportion to the work performed.",
        "Upon termination of the contract, Undersoft returns or deletes the Client Data, as the Client directs, unless there is a legal obligation to retain it, and the Client revokes the access granted. Provisions which, by their nature, are intended to survive remain in force, such as those on payment, intellectual property, confidentiality and liability.",
      ],
    },
    {
      id: "forca-maior",
      title: "Force majeure",
      blocks: [
        "Neither party is liable for non-performance or delay caused by circumstances beyond its reasonable control, such as widespread power, telecommunications or cloud service failures, cyberattacks not attributable to the party, strikes, disasters or decisions of authorities. The affected party must inform the other as soon as possible. If the impediment lasts for more than 60 days, either party may terminate the contract, without compensation.",
      ],
    },
    {
      id: "nao-aliciamento",
      title: "Non-solicitation",
      blocks: [
        "During the term of the contract and for the following 12 months, the Client shall not hire or solicit employees or subcontractors of Undersoft involved in the provision of the Services, except by written agreement.",
      ],
    },
    {
      id: "comunicacoes",
      title: "Communications",
      blocks: [
        "Communications between the parties are made in writing, preferably by email, to the addresses stated in the Proposal or, failing that, to those appearing in the contract or on the Website. Each party must inform the other of any change to its contact details.",
      ],
    },
    {
      id: "gerais",
      title: "General provisions",
      blocks: [
        "Neither party may assign its contractual position without the written consent of the other, except Undersoft in favour of entities in its group or in the event of a transfer of its business. Forbearance in enforcement does not constitute a waiver of any right. The invalidity of one clause does not affect the others. The contract, composed as indicated above, supersedes any prior understanding on the same subject matter, and any amendments must be made in writing.",
        "Undersoft may update these Terms, which apply to contracts entered into after their publication. Contracts in progress remain subject to the version accepted, except for changes required by law. The Portuguese-language version prevails over any translation.",
      ],
    },
    {
      id: "lei-litigios",
      title: "Governing law and dispute resolution",
      blocks: [
        "The contract is governed by Portuguese law. The parties will seek to resolve any dispute amicably for 15 days following written notice. Failing an amicable solution, the court of the district in which Undersoft has its registered office shall have jurisdiction, to the exclusion of any other, unless the Client is a consumer, in which case the statutory rules on jurisdiction apply.",
        `Pursuant to Law No. 144/2015 of 8 September, please note that Undersoft is not bound to any alternative consumer dispute resolution entity, without prejudice to the consumer's right to resort to any legally competent alternative dispute resolution entity, the list of which is available at consumidor.gov.pt. Consumers may also use the [Electronic Complaints Book](${COMPLAINTS_URL}).`,
      ],
    },
  ],
};
