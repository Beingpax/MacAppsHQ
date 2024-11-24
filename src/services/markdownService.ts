import { marked } from 'marked';
import { getHighlighter } from 'shiki';
import rehypeSanitize from 'rehype-sanitize';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';

interface MarkedExtensions {
  renderer?: {
    code(code: string, language: string | undefined, isEscaped: boolean): string;
  };
}

// Configure marked with syntax highlighting
const configureMarked = async () => {
  const highlighter = await getHighlighter({
    themes: ['github-dark'],
    langs: ['bash', 'javascript', 'typescript', 'json', 'markdown']
  });

  const extensions: MarkedExtensions = {
    renderer: {
      code(code, language) {
        try {
          return highlighter.codeToHtml(code, { 
            lang: language || 'text', 
            themes: {
              light: 'github-light',
              dark: 'github-dark'
            }
          });
        } catch (e) {
          return code;
        }
      }
    }
  };

  marked.use(extensions);
};

// Initialize marked
await configureMarked();

export const renderMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  
  try {
    return marked.parse(markdown, { async: false }) as string;
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return markdown;
  }
};

// Sanitize HTML
export const sanitizeHtml = async (html: string): Promise<string> => {
  if (!html) return '';

  try {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(html);

    return String(file);
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return html;
  }
}; 