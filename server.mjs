import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL("./public/", import.meta.url).pathname;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = normalize(join(root, pathname === "/" ? "index.html" : pathname));
    if (!file.startsWith(root)) throw new Error("invalid path");
    try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); } catch { file = join(root, "index.html"); }
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
});
server.listen(4173, "127.0.0.1", () => process.stdout.write("BUS KASET running at http://127.0.0.1:4173\n"));
