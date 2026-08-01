import React, { useMemo } from 'react';

/**
 * Lightweight GitHub-flavored Markdown renderer.
 * Handles: headings, bold, italic, inline code, code blocks,
 * blockquotes, links, images, ordered/unordered lists, horizontal rules,
 * tables (basic), and paragraphs.
 * No external dependencies.
 */

// ─── Inline parsers ────────────────────────────────────────────────────────────

const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const parseInline = (text) => {
  return text
    // Inline code (before bold/italic to prevent interference)
    .replace(/`([^`]+)`/g, (_, code) =>
      `<code class="inline-code">${escapeHtml(code)}</code>`
    )
    // Bold + italic ***text***
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Bold __text__
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic *text*
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Italic _text_
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Strikethrough ~~text~~
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // Links [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label, href) =>
        `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="md-link">${label}</a>`
    )
    // Auto-links <url>
    .replace(
      /<(https?:\/\/[^>]+)>/g,
      (_, url) =>
        `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="md-link">${url}</a>`
    );
};

// ─── Block parser ──────────────────────────────────────────────────────────────

const parseMarkdown = (markdown) => {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  const output = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block ```lang
    if (/^```/.test(line)) {
      const lang = line.replace(/^```/, '').trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      output.push(
        `<div class="md-code-block"><div class="md-code-lang">${lang || 'code'}</div><pre><code>${codeLines.join('\n')}</code></pre></div>`
      );
      i++;
      continue;
    }

    // Setext headings (===, ---)
    if (i + 1 < lines.length && /^={3,}$/.test(lines[i + 1])) {
      output.push(`<h1 class="md-h1">${parseInline(line)}</h1>`);
      i += 2;
      continue;
    }
    if (i + 1 < lines.length && /^-{3,}$/.test(lines[i + 1]) && line.trim()) {
      output.push(`<h2 class="md-h2">${parseInline(line)}</h2>`);
      i += 2;
      continue;
    }

    // ATX headings # ## ### ...
    const heading = line.match(/^(#{1,6})\s+(.+)/);
    if (heading) {
      const level = heading[1].length;
      const cls = `md-h${level}`;
      output.push(`<h${level} class="${cls}">${parseInline(heading[2])}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line)) {
      output.push('<hr class="md-hr" />');
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      output.push(
        `<blockquote class="md-blockquote">${parseInline(quoteLines.join(' '))}</blockquote>`
      );
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(`<li class="md-li">${parseInline(lines[i].replace(/^[-*+]\s/, ''))}</li>`);
        i++;
      }
      output.push(`<ul class="md-ul">${items.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(`<li class="md-li">${parseInline(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      output.push(`<ol class="md-ol">${items.join('')}</ol>`);
      continue;
    }

    // Image  ![alt](url)
    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      output.push(
        `<img src="${escapeHtml(img[2])}" alt="${escapeHtml(img[1])}" class="md-img" loading="lazy" />`
      );
      i++;
      continue;
    }

    // Basic table (| col | col |)
    if (/^\|.+\|/.test(line)) {
      const tableRows = [];
      while (i < lines.length && /^\|.+\|/.test(lines[i])) {
        if (/^\|[-| :]+\|/.test(lines[i])) {
          // separator row — skip
        } else {
          const cells = lines[i]
            .split('|')
            .filter((_, ci) => ci > 0 && ci < lines[i].split('|').length - 1)
            .map((c) => `<td class="md-td">${parseInline(c.trim())}</td>`)
            .join('');
          tableRows.push(`<tr>${cells}</tr>`);
        }
        i++;
      }
      output.push(
        `<div class="md-table-wrap"><table class="md-table"><tbody>${tableRows.join('')}</tbody></table></div>`
      );
      continue;
    }

    // Empty line
    if (!line.trim()) {
      output.push('<br />');
      i++;
      continue;
    }

    // Paragraph
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}|[-*+]|\d+\.|\||>|```|[-*_]{3,})/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      output.push(`<p class="md-p">${parseInline(paraLines.join(' '))}</p>`);
    } else {
      i++;
    }
  }

  return output.join('\n');
};

// ─── Component ─────────────────────────────────────────────────────────────────

const MarkdownRenderer = ({ content, className = '' }) => {
  const html = useMemo(() => parseMarkdown(content), [content]);

  return (
    <>
      <style>{`
        .md-content { color: inherit; }
        .md-h1 { font-size: 1.4rem; font-weight: 800; margin: 1.2rem 0 0.6rem; line-height: 1.3; }
        .md-h2 { font-size: 1.15rem; font-weight: 700; margin: 1rem 0 0.5rem; padding-bottom: 0.25rem; border-bottom: 1px solid rgba(128,128,128,0.2); }
        .md-h3 { font-size: 1rem; font-weight: 600; margin: 0.8rem 0 0.4rem; }
        .md-h4, .md-h5, .md-h6 { font-size: 0.875rem; font-weight: 600; margin: 0.6rem 0 0.3rem; }
        .md-p { font-size: 0.8125rem; line-height: 1.7; margin: 0.4rem 0; color: inherit; opacity: 0.85; }
        .md-ul, .md-ol { padding-left: 1.25rem; margin: 0.4rem 0; }
        .md-li { font-size: 0.8125rem; line-height: 1.6; margin-bottom: 0.2rem; opacity: 0.85; }
        .md-ul { list-style-type: disc; }
        .md-ol { list-style-type: decimal; }
        .inline-code {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.75rem;
          background: rgba(128,128,128,0.12);
          border: 1px solid rgba(128,128,128,0.2);
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }
        .md-code-block {
          background: rgba(0,0,0,0.06);
          border: 1px solid rgba(128,128,128,0.15);
          border-radius: 10px;
          overflow: hidden;
          margin: 0.75rem 0;
        }
        .dark .md-code-block { background: rgba(0,0,0,0.35); }
        .md-code-lang {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.75rem;
          background: rgba(128,128,128,0.08);
          border-bottom: 1px solid rgba(128,128,128,0.12);
          color: rgba(128,128,128,0.8);
        }
        .md-code-block pre {
          margin: 0;
          padding: 0.75rem;
          overflow-x: auto;
          font-size: 0.75rem;
          line-height: 1.6;
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }
        .md-blockquote {
          border-left: 3px solid rgba(128,128,128,0.4);
          padding-left: 0.75rem;
          margin: 0.6rem 0;
          font-size: 0.8125rem;
          opacity: 0.75;
          font-style: italic;
        }
        .md-hr { border: none; border-top: 1px solid rgba(128,128,128,0.2); margin: 1rem 0; }
        .md-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }
        .md-link:hover { text-decoration: underline; }
        .md-img {
          max-width: 100%;
          border-radius: 8px;
          margin: 0.5rem 0;
          border: 1px solid rgba(128,128,128,0.15);
        }
        .md-table-wrap { overflow-x: auto; margin: 0.75rem 0; }
        .md-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .md-td {
          padding: 0.4rem 0.75rem;
          border: 1px solid rgba(128,128,128,0.2);
          text-align: left;
        }
      `}</style>
      <div
        className={`md-content ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default MarkdownRenderer;
