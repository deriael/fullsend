const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptsDir = __dirname; // apps/frontend/scripts
const frontendDir = path.dirname(scriptsDir); // apps/frontend
const schemaSource = path.resolve(frontendDir, '../backend/prisma/schema.prisma');
const prismaDir = path.join(frontendDir, 'prisma');
const schemaDest = path.join(prismaDir, 'schema.prisma');

fs.mkdirSync(prismaDir, { recursive: true });
fs.copyFileSync(schemaSource, schemaDest);

try {
  execSync(`npx prisma generate --schema=${schemaDest}`, { stdio: 'inherit', cwd: frontendDir });
} finally {
  fs.rmSync(schemaDest, { force: true });
  // optional: remove directory if empty
  try { fs.rmdirSync(prismaDir); } catch (_) {}
}
