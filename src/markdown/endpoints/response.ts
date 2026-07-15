import { getStatusName } from "@/utils/http";
import { OpenAPIV3 } from "openapi-types";
import { generateMediaTypeMarkdown } from ".";
import { generateSubSectionTocMarkdown, getToc } from "../toc";
import { Toc } from "@/types";

export type ResponseGroup = {
  codes: string[],
  descriptions: Record<string, string | undefined>,
  response: OpenAPIV3.ResponseObject
};

export function generateResponsesMarkdown(
  h: string,
  responses: OpenAPIV3.ResponsesObject
): string {
  let endpoints_str = "";

  const responses_title = generateResponsesTitleMarkdown(h);

  let responses_toc: Toc = [];

  /** @ts-expect-error we resolve all references */
  const groups = groupResponsesByContent(responses);

  for (const group of groups) {

    const response_title_markdown = generateResponseTitleMarkdown(h, group.codes);

    responses_toc = [...responses_toc, ...getToc(response_title_markdown)];

    endpoints_str += response_title_markdown;

    endpoints_str += generateResponseMarkdown(h, group);
  }

  const responses_toc_markdown = generateSubSectionTocMarkdown(responses_toc);

  return responses_title + responses_toc_markdown + endpoints_str;
}

/**
 * Groups response codes that share an identical headers/content shape (e.g. the
 * same error schema reused across 400/403/404/500/503) so the body table is
 * rendered once per unique shape instead of once per status code.
 */
export function groupResponsesByContent(
  responses: { [code: string]: OpenAPIV3.ResponseObject }
): ResponseGroup[] {
  const groups: ResponseGroup[] = [];
  const signature_to_group = new Map<string, ResponseGroup>();

  for (const [code, response] of Object.entries(responses)) {

    const signature = JSON.stringify({
      headers: response.headers ?? null,
      content: response.content ?? null
    });

    let group = signature_to_group.get(signature);

    if (!group) {
      group = { codes: [], descriptions: {}, response };
      signature_to_group.set(signature, group);
      groups.push(group);
    }

    group.codes.push(code);
    group.descriptions[code] = response.description;
  }

  return groups;
}

export function generateResponsesTitleMarkdown(h: string): string {
  let endpoints_str = "";

  endpoints_str += `${h}### Responses`;
  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateResponseMarkdown(
  h: string,
  group: ResponseGroup
): string {
  let endpoints_str = "";

  if (group.codes.length > 1) {
    endpoints_str += "Applies to:\n\n";
    for (const code of group.codes) {
      const description = group.descriptions[code];
      endpoints_str += `- \`${code} ${getStatusName(code)}\`${description ? `: ${description}` : ""}\n`;
    }
    endpoints_str += "\n\n";
  } else if (group.response.description) {
    endpoints_str += group.response.description;
    endpoints_str += "\n\n";
  }

  /** @ts-expect-error we resolve all references */
  endpoints_str += generateResponseHeadersMarkdown(h, group.response.headers);

  endpoints_str += generateResponseBodyMarkdown(h, group.response.content);


  return endpoints_str;
}

export function generateResponseTitleMarkdown(h: string, codes: string[]): string {
  let endpoints_str = "";

  const badges = codes
    .map((code) => `<span class="status-badge ${getStatusBadgeClass(code)}">${code} ${getStatusName(code)}</span>`)
    .join(" ");

  endpoints_str += `${h}#### ${badges}`;
  endpoints_str += "\n\n";

  return endpoints_str;
}

/**
 * Maps a status code to its badge color: 2xx success, 4xx client error,
 * 5xx server error. Mirrors the same semantics readers already learn from the
 * method badges on operation titles.
 */
export function getStatusBadgeClass(code: string): string {
  const numeric_code = Number(code);

  if (numeric_code >= 200 && numeric_code < 300) {
    return 'status-success';
  } else if (numeric_code >= 400 && numeric_code < 500) {
    return 'status-warn';
  } else if (numeric_code >= 500) {
    return 'status-error';
  }

  return 'status-neutral';
}

export function generateResponseHeadersMarkdown(
  h: string,
  headers?: { [key: string]: OpenAPIV3.HeaderObject }
): string {
  let endpoints_str = "";

  endpoints_str += `${h}##### Response Headers`;
  endpoints_str += "\n\n";

  if (headers) {
    endpoints_str += generateResponseHeadersTableMarkdown(headers);
  } else {
    endpoints_str += "No Specific Response Headers.";
    endpoints_str += "\n\n";
  }

  return endpoints_str;
}

export function generateResponseHeadersTableMarkdown(
  headers: { [key: string]: OpenAPIV3.HeaderObject }
): string {
  let endpoints_str = "";

  endpoints_str += "|Key|Type|Required|Example|\n";
  endpoints_str += "|-|-|-|-|\n";

  for (const [key, header] of Object.entries(headers)) {
    endpoints_str += generateResponseHeadersTableRowMarkdown(key, header);
  }

  endpoints_str += "\n\n";

  return endpoints_str;
}

export function generateResponseHeadersTableRowMarkdown(
  key: string,
  header: OpenAPIV3.HeaderObject
): string {
  let endpoints_str = "";

  endpoints_str += `|\`${key}\``;

  /** @ts-expect-error we resolve all references */
  const schema: OpenAPIV3.SchemaObject = header.schema;

  endpoints_str += `|${schema?.type ? `\`${schema.type}\`` : '-'}`;

  if (header.required) {
    endpoints_str += `|Yes`;
  } else {
    endpoints_str += `|No`;
  }

  if (header.example) {
    endpoints_str += `|${header.example}`;
  } else {
    endpoints_str += `|-`
  }

  endpoints_str += "|\n";

  return endpoints_str;
}

export function generateResponseBodyMarkdown(
  h: string,
  body?: { [key: string]: OpenAPIV3.MediaTypeObject }
): string {
  let endpoints_str = "";

  endpoints_str += `${h}##### Response Body`;
  endpoints_str += "\n\n"

  if (body) {
    endpoints_str += generateResponseBodyTablesMarkdown(body);
  } else {
    endpoints_str += "No Response Body";
    endpoints_str += "\n\n";
  }

  return endpoints_str;
}

export function generateResponseBodyTablesMarkdown(
  body: { [key: string]: OpenAPIV3.MediaTypeObject }
): string {
  let endpoints_str = "";

  for (const [media_type, obj] of Object.entries(body)) {
    endpoints_str += generateMediaTypeMarkdown(media_type, obj, 'response');
  }

  return endpoints_str;
}
