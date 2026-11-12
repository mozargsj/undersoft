import { COMPANY, COMPLAINTS_URL, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Terms and Conditions",
  short: "Terms and Conditions",
  subtitle: "Conditions governing the use of the website and the contact form.",
  sections: [
    {
      id: "identificacao",
      title: "Identification and scope",
      blocks: [
        `The website **${C.website}** (the "Website") is owned and operated by **${C.legalName}**, a legal entity with tax identification number (NIPC) ${C.nipc}, whose registered office is at ${C.address}, registered with the ${C.registry} ("Undersoft"). Contact details: ${C.email} and ${C.phone}.`,
        `These Terms and Conditions govern access to and use of the Website and its contact form. They do not govern the engagement of Undersoft's services, which is governed by the [Terms of Service](${LEGAL_PAGES["termos-de-servico"]}) and by the proposal accepted by each client.`,
        "By browsing the Website or submitting the contact form, the user declares that they have read, understood and accepted these Terms and Conditions. Anyone who does not agree should refrain from using the Website.",
      ],
    },
    {
      id: "destinatarios",
      title: "Intended audience",
      blocks: [
        "The Website and the services presented on it are intended for companies, business owners and professionals acting in the course of their activity. The user declares that they are over 18 years of age and, when acting on behalf of a company, that they have the authority to bind it or to request contact on its behalf.",
      ],
    },
    {
      id: "natureza-informativa",
      title: "Informational nature of the content",
      blocks: [
        "The content of the Website is for information purposes only and provides a general presentation of Undersoft's activity. It does not constitute a binding contractual offer, a promise of results, or legal, tax, accounting or any other regulated advice.",
        "Undersoft may amend, update or remove content, service descriptions and examples at any time, without prior notice.",
        "The trademarks, logos and names of third-party tools mentioned on the Website (for example, invoicing software, ERP systems or spreadsheets) are identified solely to indicate compatibility or integration. They belong to their respective owners, and their mention does not imply any partnership, sponsorship or endorsement.",
      ],
    },
    {
      id: "formulario",
      title: "Contact form",
      blocks: [
        "By using the contact form, the user undertakes to:",
        {
          ul: [
            "provide true, complete and up-to-date information, in particular their name and email address;",
            "describe their request in enough detail to allow a useful reply;",
            "not submit special categories of personal data (for example, health data or beliefs), access credentials, passwords, banking details or confidential third-party information;",
            "not use the form for unsolicited advertising, for sending unlawful content or for testing the security of the Website.",
          ],
        },
        "Submitting the form is merely a request for contact and an initial assessment. **It does not create any contract and does not oblige Undersoft or the user to enter into one.** The provision of services always depends on a written proposal accepted by the client, in accordance with the Terms of Service.",
        "Undersoft will use reasonable efforts to respond to requests but does not guarantee a response time or that every request will be accepted. It may decline requests that fall outside its activity, without any obligation to give reasons.",
        "The processing of personal data submitted through the form is described in the [Privacy Policy](" + LEGAL_PAGES["politica-de-privacidade"] + ").",
      ],
    },
    {
      id: "utilizacao-permitida",
      title: "Permitted use",
      blocks: [
        "The Website must be used lawfully, in good faith and in accordance with these Terms. In particular, the following is prohibited:",
        {
          ul: [
            "accessing or attempting to access areas, systems or data without authorisation, or seeking to exploit vulnerabilities;",
            "overloading, disrupting or interrupting the operation of the Website, including through mass automated requests;",
            "introducing or attempting to introduce viruses, malicious code or any element that may damage systems or data;",
            "systematically harvesting content (scraping) or reproducing the Website for commercial purposes;",
            "impersonating another person or entity, or providing false information;",
            "committing any act that is contrary to the law, in particular the Cybercrime Law (Law No. 109/2009 of 15 September), or that infringes the rights of third parties.",
          ],
        },
        "Undersoft may block access for anyone who breaches these rules and report the matter to the competent authorities, without prejudice to claiming compensation for any damage suffered.",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Intellectual property",
      blocks: [
        "The Website, including its design, structure, texts, images, animations, source code, logo and the **Undersoft** brand, belongs to Undersoft or is used with the authorisation of its owners, and is protected by the Copyright and Related Rights Code, by the legal regime governing computer programs (Decree-Law No. 252/94 of 20 October) and by the Industrial Property Code.",
        "Users may view the Website and print or save extracts for their personal use or for the internal use of their company. Any other use, in particular reproduction, adaptation, distribution, communication to the public or use of the brand, requires Undersoft's prior written authorisation.",
      ],
    },
    {
      id: "ligacoes-terceiros",
      title: "Third-party links and services",
      blocks: [
        "The Website contains links to third-party websites and platforms (for example, LinkedIn, Instagram and WhatsApp) and relies on third-party services in order to operate. Undersoft does not control those services and is not responsible for their content, availability or privacy practices; their use is governed by the terms and policies of their respective owners.",
      ],
    },
    {
      id: "disponibilidade",
      title: "Availability and security",
      blocks: [
        "The Website is provided on an \"as is\" basis. Undersoft does not guarantee continuous and uninterrupted access, the absence of errors, or that the Website is free of harmful elements, and may suspend, restrict or modify the Website for maintenance, security or other reasons. The user is responsible for the security of their own equipment and connection.",
      ],
    },
    {
      id: "responsabilidade",
      title: "Limitation of liability",
      blocks: [
        "To the fullest extent permitted by law, Undersoft shall not be liable for indirect damage, loss of profit, loss of opportunity or loss of data arising from the use of, or inability to use, the Website, nor for any reliance placed on its informational content.",
        "Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under the law, in particular in cases of wilful misconduct or gross negligence, nor any mandatory consumer rights.",
      ],
    },
    {
      id: "dados-cookies",
      title: "Data protection and cookies",
      blocks: [
        `The processing of personal data is described in the [Privacy Policy](${LEGAL_PAGES["politica-de-privacidade"]}), and the use of cookies and similar technologies in the [Cookie Policy](${LEGAL_PAGES["politica-de-cookies"]}). Both form an integral part of the information that Undersoft provides to the user.`,
      ],
    },
    {
      id: "alteracoes",
      title: "Changes",
      blocks: [
        "Undersoft may amend these Terms and Conditions at any time. The version in force is the one published on the Website, showing the date of the last update. Continued use of the Website after changes have been published constitutes acceptance of them. Changes do not apply retroactively to requests already submitted.",
      ],
    },
    {
      id: "reclamacoes",
      title: "Communications and complaints",
      blocks: [
        `For any question about these Terms, the user may contact ${C.email}. Consumers may also use the [Electronic Complaints Book](${COMPLAINTS_URL}), pursuant to Decree-Law No. 156/2005 of 15 September, as currently in force.`,
      ],
    },
    {
      id: "lei-foro",
      title: "Governing law and jurisdiction",
      blocks: [
        "These Terms and Conditions are governed by Portuguese law. In the event of a dispute with a consumer, the statutory rules on territorial jurisdiction apply. In all other cases, the court of the district in which Undersoft has its registered office shall have jurisdiction, to the exclusion of any other.",
        "If any provision of these Terms is held to be void or ineffective, the remaining provisions shall remain in force.",
      ],
    },
  ],
};
