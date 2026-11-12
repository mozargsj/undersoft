import { COMPANY, LEGAL_PAGES } from "../../company";

const C = COMPANY;

export default {
  title: "Cookie Policy",
  short: "Cookie Policy",
  subtitle: "Which storage technologies the website uses and how you can manage them.",
  sections: [
    {
      id: "o-que-sao",
      title: "What cookies and similar technologies are",
      blocks: [
        "Cookies are small text files stored on your device when you visit a website. There are also similar technologies, such as the browser's local and session storage (localStorage and sessionStorage), which allow information to be stored on the device. In this Policy, the term “cookies” covers all of them.",
      ],
    },
    {
      id: "enquadramento",
      title: "Legal framework",
      blocks: [
        "In Portugal, storing information, or gaining access to information already stored, on a user's device requires their prior and informed consent, pursuant to Article 5 of Law No. 41/2004 of 18 August, as currently in force. Techniques that are strictly necessary to provide a service expressly requested by the user are exempt from consent. Where personal data is processed, the GDPR (Regulation (EU) 2016/679) also applies.",
      ],
    },
    {
      id: "o-que-usamos",
      title: "What the website uses",
      blocks: [
        "The website asks for your consent before storing any technology that is not strictly necessary. On your first visit, and whenever your choice expires (after 6 months), a notice is displayed where you can accept, reject or choose by category. You can change your choice at any time under “Cookie settings”, in the footer of any page.",
        "**The website does not currently use statistics, advertising, ad personalisation or social media cookies.** It uses the following storage technologies:",
        {
          table: {
            head: ["Name", "Type", "Purpose", "Duration"],
            rows: [
              [
                "undersoft:cookie-consent (localStorage)",
                "Strictly necessary, first-party",
                "Stores your cookie choice (categories accepted and date), so that you are not asked again on every visit.",
                "6 months",
              ],
              [
                "undersoft:scrollY (sessionStorage)",
                "Functional, first-party",
                "Stores your reading position so that it can be restored if the page is reloaded. It does not identify the user and is not sent to Undersoft or to third parties.",
                "Until the tab is closed",
              ],
              [
                "undersoft:lang (localStorage)",
                "Preferences, first-party",
                "Remembers the language you chose so that it is applied on later visits and on the other pages. It is only stored if you accept the “Preferences” category.",
                "Up to 6 months, or until you withdraw consent",
              ],
            ],
          },
        },
        "If Undersoft starts to use statistics, marketing or other tools that are not strictly necessary, it will only load them after obtaining your consent for the relevant category, and will update this Policy.",
      ],
    },
    {
      id: "terceiros",
      title: "Third-party resources",
      blocks: [
        "The website loads third-party resources in order to function, such as fonts, icons and flags (Google Fonts, cdnjs, unpkg and FlagCDN), and uses external services for the contact form: Formspree, to receive submissions, and Cloudflare Turnstile (with a Cloudflare Worker), which protects the form against spam and abuse. For security reasons, Turnstile is considered strictly necessary and does not depend on consent. To the best of Undersoft's knowledge, these services do not set tracking cookies in this context, but they do receive the IP address and technical data of the request. See the [Privacy Policy](" + LEGAL_PAGES["politica-de-privacidade"] + ") for more information.",
        "When you follow links to LinkedIn, Instagram, WhatsApp or other external websites, the cookie policies of those websites apply.",
      ],
    },
    {
      id: "gerir",
      title: "How to manage or delete them",
      blocks: [
        "You can change or withdraw your consent at any time under “Cookie settings”, in the footer of any page. Withdrawing consent is as easy as giving it and does not affect the lawfulness of processing carried out until then. Session storage is deleted when you close the browser tab. You can also manage, block or delete cookies and site data in your browser's privacy settings. Blocking the technologies listed above does not affect the operation of the website; it simply means that your reading position is no longer restored after the page is reloaded and your language is no longer remembered.",
      ],
    },
    {
      id: "alteracoes",
      title: "Changes",
      blocks: [
        "This Policy may be updated, in particular if new features are introduced. The version in force is the one published on this page, showing the date of the last update.",
      ],
    },
    {
      id: "contactos",
      title: "Contact details and complaints",
      blocks: [
        `For any question, please contact ${C.email}. Data subjects may also lodge a complaint with the National Data Protection Commission (CNPD) at www.cnpd.pt.`,
      ],
    },
  ],
};
