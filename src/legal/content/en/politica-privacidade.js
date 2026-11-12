import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Privacy Policy",
  short: "Privacy Policy",
  subtitle: "How Undersoft collects, uses and protects personal data, in accordance with the GDPR and Portuguese law.",
  sections: [
    {
      id: "introducao",
      title: "Introduction and legal framework",
      blocks: [
        "Undersoft respects the privacy of those who visit its website, contact it or engage its services. This Policy explains which personal data is processed, for what purposes, on what lawful basis, for how long, and which rights data subjects have.",
        "The processing of personal data complies with Regulation (EU) 2016/679 (General Data Protection Regulation, GDPR), with Law No. 58/2019 of 8 August, which ensures its implementation in the Portuguese legal order, and with Law No. 41/2004 of 18 August on privacy in electronic communications, as currently in force.",
      ],
    },
    {
      id: "responsavel",
      title: "Data controller",
      blocks: [
        `The data controller is **${C.legalName}**, tax identification number (NIPC) ${C.nipc}, whose registered office is at ${C.address} ("Undersoft").`,
        `For any question about privacy or to exercise your rights, please contact ${C.email}. Undersoft is not legally required to appoint a data protection officer, but maintains this dedicated channel for data subjects.`,
        "This Policy does not apply to data that Undersoft processes **on behalf of its clients** in the course of projects (for example, the data of a company's end customers). In those cases, the client is the controller and Undersoft acts as processor under a separate agreement, pursuant to Article 28 of the GDPR.",
      ],
    },
    {
      id: "dados",
      title: "Personal data we process",
      blocks: [
        {
          table: {
            head: ["Category", "Examples", "Source"],
            rows: [
              ["Identification and contact details", "Name, email, telephone number, company, job title", "Provided by the data subject, through the form or other channels"],
              ["Content of communications", "Message and description of the process you wish to improve; emails, WhatsApp messages or telephone calls exchanged", "Provided by the data subject"],
              ["Contractual and invoicing data", "Details of the company and its representatives, tax identification number (NIF), address, history of proposals and invoices", "Provided by the data subject or by the company"],
              ["Technical data", "IP address, browser and device type, date and time of access", "Collected automatically when accessing the website and submitting the form"],
              ["Record of acceptance", "Acceptance of the Terms and Conditions, with the date and time of the request", "Generated when the form is submitted"],
            ],
          },
        },
        "Undersoft does not intend to collect special categories of data (Article 9 of the GDPR) or data relating to minors. Please do not include such data in the messages you send.",
      ],
    },
    {
      id: "finalidades",
      title: "Purposes, lawful bases and retention",
      blocks: [
        {
          table: {
            head: ["Purpose", "Lawful basis", "Retention"],
            rows: [
              [
                "Responding to contact requests and carrying out the initial assessment",
                "Pre-contractual steps taken at the request of the data subject (Art. 6(1)(b) GDPR)",
                "Up to 24 months after the last contact, unless it develops into a contract",
              ],
              [
                "Preparing proposals, entering into and performing contracts, managing client relationships",
                "Performance of a contract or pre-contractual steps (Art. 6(1)(b))",
                "For the duration of the contract and for the statutory periods after it ends",
              ],
              [
                "Invoicing, accounting and tax obligations",
                "Compliance with legal obligations (Art. 6(1)(c))",
                "As a rule, 10 years",
              ],
              [
                "Website security, prevention of abuse and spam",
                "Undersoft's legitimate interest (Art. 6(1)(f))",
                "For the period strictly necessary, as a rule up to 12 months",
              ],
              [
                "Debt recovery and the defence of rights in judicial or administrative proceedings",
                "Legitimate interest (Art. 6(1)(f))",
                "Until the limitation periods or the proceedings have ended",
              ],
              [
                "Commercial communications about Undersoft's services",
                "Consent (Art. 6(1)(a)) or, in the case of clients and similar services, legitimate interest under Article 13-A of Law No. 41/2004, with a right to object",
                "Until consent is withdrawn or you object",
              ],
            ],
          },
        },
        "Once these periods have elapsed, the data is deleted or anonymised, unless the law requires it to be retained for longer.",
      ],
    },
    {
      id: "obrigatoriedade",
      title: "Mandatory nature of the data",
      blocks: [
        "The fields marked with an asterisk on the form are mandatory. Without them, it is not possible to respond to the request. Acceptance of the Terms and Conditions is a condition for submitting the form.",
      ],
    },
    {
      id: "decisoes-automatizadas",
      title: "Automated decision-making",
      blocks: [
        "Undersoft does not make decisions based solely on automated processing, including profiling, that produce legal effects or significantly affect data subjects.",
      ],
    },
    {
      id: "destinatarios",
      title: "Recipients of the data",
      blocks: [
        "The data may be disclosed to entities that process data on Undersoft's behalf (processors), bound by contract pursuant to Article 28 of the GDPR, and to entities that receive it under a legal obligation. Specifically:",
        {
          ul: [
            "providers of the contact form and of the delivery of its email (Cloudflare Workers and Cloudflare Email Routing), of spam and abuse protection (Cloudflare Turnstile) and of hosting and infrastructure for the website;",
            "providers of email, communication and productivity services;",
            "the certified accountant and invoicing software;",
            "legal advisers, auditors and insurers, where necessary;",
            "public authorities, such as the Portuguese Tax and Customs Authority, the courts and the National Data Protection Commission (CNPD), where required by law.",
          ],
        },
        "Undersoft does not sell or transfer personal data to third parties for marketing purposes.",
      ],
    },
    {
      id: "transferencias",
      title: "International transfers",
      blocks: [
        "Some providers may process data outside the European Economic Area, in particular in the United States of America. In such cases, Undersoft relies on the mechanisms provided for in the GDPR, such as European Commission adequacy decisions (including the EU-US Data Privacy Framework, where the recipient is certified) or standard contractual clauses. You may request information about the safeguards applied by using the contact details provided.",
      ],
    },
    {
      id: "recursos-terceiros",
      title: "Third-party resources loaded by the website",
      blocks: [
        "In order to display the website, the visitor's browser loads resources hosted by third parties, which means that the IP address and technical data of the request are received by those providers:",
        {
          table: {
            head: ["Resource", "Purpose"],
            rows: [
              ["Google Fonts (Google)", "Website typeface"],
              ["cdnjs (Cloudflare)", "Icon library"],
              ["unpkg", "Icon library"],
              ["FlagCDN", "Flag images for the language selector"],
              ["Cloudflare Turnstile (Cloudflare)", "Protection of the contact form against spam and abuse. It analyses technical data from the browser, is loaded on the home page, and the form submission is validated by a Cloudflare service (Workers)"],
            ],
          },
        },
        "These providers process data in accordance with their own privacy policies. See also the [Cookie Policy](" + LEGAL_PAGES["politica-de-cookies"] + ").",
      ],
    },
    {
      id: "direitos",
      title: "Rights of data subjects",
      blocks: [
        "Under the GDPR, data subjects have the right to:",
        {
          ul: [
            "**access**: find out whether we process data concerning you and obtain a copy;",
            "**rectification**: have inaccurate or incomplete data corrected;",
            "**erasure**: request the deletion of data where there is no basis for retaining it;",
            "**restriction**: request the restriction of processing in certain situations;",
            "**portability**: receive the data you have provided in a structured, commonly used format, where the processing is based on consent or contract and is carried out by automated means;",
            "**objection**: object to processing based on legitimate interest and, at any time, to processing for marketing purposes;",
            "**withdraw consent**, at any time, without affecting the lawfulness of processing carried out before its withdrawal.",
          ],
        },
        `To exercise these rights, send a request to ${C.email}. We may ask for information that allows us to confirm the identity of the requester. We respond within one month, which may be extended by a further two months in complex cases, and free of charge, except for requests that are manifestly unfounded or excessive.`,
        "Data subjects also have the right to lodge a complaint with the supervisory authority, the National Data Protection Commission (CNPD), at www.cnpd.pt.",
      ],
    },
    {
      id: "seguranca",
      title: "Security",
      blocks: [
        "Undersoft applies technical and organisational measures appropriate to the risk, such as encrypted connections, access controls, the principle of least privilege and confidentiality undertakings. No system is completely secure. In the event of a personal data breach, Undersoft will act in accordance with Articles 33 and 34 of the GDPR, notifying the CNPD and the affected data subjects where legally required.",
      ],
    },
    {
      id: "ligacoes-externas",
      title: "Social networks and external links",
      blocks: [
        "The website contains links to LinkedIn, Instagram and WhatsApp. When the user follows them or contacts Undersoft through those platforms, the privacy policies of their respective owners apply, over which Undersoft has no control.",
      ],
    },
    {
      id: "menores",
      title: "Minors",
      blocks: [
        "The services and the website are intended for companies and professionals and not for persons under 18 years of age. If you become aware that we have collected data from a minor, please contact us so that we can delete it.",
      ],
    },
    {
      id: "alteracoes",
      title: "Changes to this Policy",
      blocks: [
        "This Policy may be updated to reflect changes in the law or in our activity. The version in force is the one published on this page, showing the date of the last update. In the event of significant changes, these will be communicated by appropriate means.",
      ],
    },
  ],
};
