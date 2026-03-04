declare module "node:path" {
  const path: {
    join: (...parts: string[]) => string;
    resolve: (...parts: string[]) => string;
    dirname: (path: string) => string;
  };

  export default path;
}

declare module "node:fs/promises" {
  export function readFile(path: string | URL, options?: { encoding?: BufferEncoding } | BufferEncoding): Promise<string>;
  export function mkdir(
    path: string,
    options?: { recursive?: boolean }
  ): Promise<void>;
  export function writeFile(
    file: string,
    data: string,
    options?: { encoding?: BufferEncoding } | BufferEncoding
  ): Promise<void>;
}

type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "base64url"
  | "latin1"
  | "binary"
  | "hex";

declare const process: {
  exit(code?: number): void;
};
