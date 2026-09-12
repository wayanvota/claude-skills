import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PACKAGE_FILES = [
  "skill-file-builder-prompt.md",
  "grant-prospect-research.md",
  "grant-application-drafter.md",
  "gates-grand-challenges-voice.md",
  "wellcome-research-voice.md",
  "grant-compliance-check.md",
  "content-credibility-audit.md",
  "seven-tools-why-when-how.md",
];

const CRC_TABLE = Array.from({ length: 256 }, (_, value) => {
  let current = value;
  for (let bit = 0; bit < 8; bit += 1) {
    current = (current >>> 1) ^ ((current & 1) ? 0xedb88320 : 0);
  }
  return current >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function localHeader(name, bytes, checksum) {
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(((2026 - 1980) << 9) | (1 << 5) | 1, 12);
  header.writeUInt32LE(checksum, 14);
  header.writeUInt32LE(bytes.length, 18);
  header.writeUInt32LE(bytes.length, 22);
  header.writeUInt16LE(name.length, 26);
  header.writeUInt16LE(0, 28);
  return header;
}

function centralHeader(name, bytes, checksum, offset) {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(0x031e, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt16LE(((2026 - 1980) << 9) | (1 << 5) | 1, 14);
  header.writeUInt32LE(checksum, 16);
  header.writeUInt32LE(bytes.length, 20);
  header.writeUInt32LE(bytes.length, 24);
  header.writeUInt16LE(name.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE((0o100644 << 16) >>> 0, 38);
  header.writeUInt32LE(offset, 42);
  return header;
}

export function buildPackage() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const name of PACKAGE_FILES) {
    const nameBytes = Buffer.from(name, "utf8");
    const bytes = readFileSync(path.join(root, name));
    const checksum = crc32(bytes);
    const local = localHeader(nameBytes, bytes, checksum);
    localParts.push(local, nameBytes, bytes);
    centralParts.push(centralHeader(nameBytes, bytes, checksum, offset), nameBytes);
    offset += local.length + nameBytes.length + bytes.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(PACKAGE_FILES.length, 8);
  end.writeUInt16LE(PACKAGE_FILES.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  writeFileSync(path.join(root, "claude-skills.zip"), Buffer.concat([...localParts, centralDirectory, end]));
  process.stdout.write(`Built claude-skills.zip with ${PACKAGE_FILES.length} files.\n`);
}

const isCli = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isCli) buildPackage();
