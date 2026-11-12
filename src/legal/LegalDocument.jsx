import { Fragment } from "react";

// Marcação inline suportada nos textos: **negrito**, [texto](ligação) e [PLACEHOLDER] (destacado).
const TOKEN = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(\[[^\]]+\])/g;

function renderInline(text, newTab) {
  const out = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [full] = m;
    if (m[1]) {
      out.push(<strong key={key++}>{full.slice(2, -2)}</strong>);
    } else if (m[2]) {
      const [, label, href] = full.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const external = /^https?:/.test(href);
      out.push(
        <a
          key={key++}
          href={href}
          {...(external || newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    } else {
      out.push(<mark key={key++} className="lg-todo">{full}</mark>);
    }
    last = m.index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ block, newTab }) {
  if (typeof block === "string") return <p>{renderInline(block, newTab)}</p>;

  if (block.ul || block.ol) {
    const Tag = block.ol ? "ol" : "ul";
    return (
      <Tag>
        {(block.ul || block.ol).map((item, i) => (
          <li key={i}>{renderInline(item, newTab)}</li>
        ))}
      </Tag>
    );
  }

  if (block.table) {
    const { head, rows } = block.table;
    return (
      <div className="lg-table-wrap" tabIndex={0}>
        <table>
          <thead>
            <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} data-label={head[c]}>{renderInline(cell, newTab)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

// Renderiza as secoes de um documento. Numeracao automatica (1, 2, 3...).
export default function LegalDocument({ doc, newTab = false }) {
  return (
    <div className="lg-doc">
      {doc.sections.map((section, i) => (
        <div key={section.id} id={section.id} className="lg-section">
          <h2>
            <span className="lg-num">{i + 1}</span>
            {section.title}
          </h2>
          {section.blocks.map((block, b) => (
            <Fragment key={b}>
              <Block block={block} newTab={newTab} />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
