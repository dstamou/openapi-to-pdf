import { Config } from "@/types";
import marked from "marked";
import { Toc } from "@/types";
import { TocItem } from "@/types";

export function genererateTocMarkdown(
  md: string,
  config?: Partial<Config>
): string {
  let toc = getToc(md);

  let toc_str = `# ${config?.headings?.toc ?? 'Contents'}\n\n`;

  if (config?.max_toc_level) {
    toc = toc.filter((toc_item) => {
      return toc_item.level <= config.max_toc_level!;
    })
  }

  toc_str += `|Section|\n`;
  toc_str += "|-|\n"

  toc.map((toc_item) => {

    const section_title = generateSectionTitleMarkdown(toc_item);

    toc_str += `|${section_title}|\n`;
  })

  toc_str += "\n\n";

  toc_str += `<div class="page-break"></div>`;
  toc_str += "\n\n";


  return toc_str;
};

export function getToc(md: string, levels?: number[]): Toc {
  const toc: Toc = [];

  const renderer = new marked.Renderer();

  renderer.heading = (text, level, raw, slugger) => {
    const slug = slugger.slug(raw);

    if (levels) {
      if (levels.includes(level)) {
        toc.push({ level, text, slug });
      }
    } else {
      toc.push({ level, text, slug });
    }

    return text;
  };

  marked.marked(md, { renderer });

  return toc;
}

export function generateSubSectionTocMarkdown(
  toc: Toc
): string {
  let endpoints_str = "";

  if (toc.length > 0) {

    for (const toc_item of toc) {
      endpoints_str += `- [${toc_item.text}](#${toc_item.slug})\n`;
    }

    endpoints_str += `\n\n`;

  }

  return endpoints_str;
}

export function generateSectionTitleMarkdown(toc_item: TocItem): string {
  const link = `<a href="#${toc_item.slug}">${toc_item.text}</a>`;

  if (toc_item.level === 1) {
    return `**${link}**<img width="500" height="1">`;
  }

  const indent_px = (toc_item.level - 1) * 20;

  return `<span style="display:inline-block;margin-left:${indent_px}px;">${link}</span>`;
}
