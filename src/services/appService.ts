import { supabase } from '../lib/supabase';
import type { App } from '../data/apps';
import { renderMarkdown, sanitizeHtml } from './markdownService';

export async function getAllApps(): Promise<App[]> {
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  
  return await Promise.all(data.map(async (app) => {
    if (app.description_md) {
      const html = renderMarkdown(app.description_md);
      app.description_html = await sanitizeHtml(html);
      if (!app.description) {
        app.description = app.description_md.split('\n')[0];
      }
    }
    return app;
  }));
} 