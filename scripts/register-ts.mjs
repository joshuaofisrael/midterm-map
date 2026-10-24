/**
 * Let node --experimental-strip-types import this repo's TypeScript.
 * Resolves the @/ alias and extensionless relative imports to .ts files.
 */
import { register } from "node:module";

register("./ts-hooks.mjs", import.meta.url);
