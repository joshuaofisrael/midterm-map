import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcDir = fileURLToPath(new URL("../src/", import.meta.url));

function fileUrl(specifier) {
  if (path.extname(specifier)) return pathToFileURL(specifier).href;
  return pathToFileURL(`${specifier}.ts`).href;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = path.join(srcDir, specifier.slice(2));
    return nextResolve(fileUrl(target), context);
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && !path.extname(specifier)) {
    return nextResolve(`${specifier}.ts`, context);
  }
  return nextResolve(specifier, context);
}

/** Node requires an import attribute for JSON. Next does not. Synthesize a default export. */
export async function load(url, context, nextLoad) {
  if (url.endsWith(".json")) {
    const source = readFileSync(fileURLToPath(url), "utf8");
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${source}`,
    };
  }
  return nextLoad(url, context);
}
