import { Config } from "@/types";
import { OpenAPIV3 } from "openapi-types";
import { isMethod } from "@/utils/http";

export default function generateCoverMarkdown(
  schema: OpenAPIV3.Document,
  config?: Partial<Config>
): string {

  const title = config?.texts?.title ?? schema.info.title;
  const subtitle = config?.texts?.subtitle;
  const version = schema.info.version;

  let cover_str = "";

  cover_str += `<div style="margin-top: 130px;">`;

  cover_str += `<div class="cover-eyebrow">API Reference</div>`;
  cover_str += `<h1 class="cover-title">${title}</h1>`;

  if (subtitle) {
    cover_str += `<p class="cover-subtitle">${subtitle}</p>`;
  }

  cover_str += `<hr class="cover-rule" />`;

  const methods = getUsedMethods(schema);
  if (methods.length > 0) {
    cover_str += `<div class="cover-legend">`;
    for (const method of methods) {
      cover_str += `<span class="method-badge method-${method}">${method.toUpperCase()}</span>`;
    }
    cover_str += `</div>`;
  }

  cover_str += `<div class="cover-meta">Version ${version}</div>`;

  cover_str += `</div>`;
  cover_str += "\n\n";

  cover_str += `<div class="page-break"></div>`;
  cover_str += "\n\n";

  return cover_str;
}

/**
 * The methods actually used by the API, in a fixed reading order. Drives the
 * cover-page badge legend so it previews only what the document really contains.
 */
export function getUsedMethods(schema: OpenAPIV3.Document): string[] {
  const found = new Set<string>();

  for (const path_item of Object.values(schema.paths ?? {})) {
    for (const key of Object.keys(path_item ?? {})) {
      if (isMethod(key)) {
        found.add(key.toLowerCase());
      }
    }
  }

  const reading_order = ['get', 'post', 'put', 'patch', 'delete'];

  return reading_order.filter((method) => found.has(method));
}
