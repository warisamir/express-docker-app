import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import execa from 'execa';
import { writeJSON, checkDockerAvailable } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const scaffoldProject = async (options) => {
  const {
    projectName, useEnv, useMorgan, useDocker, useESLint, useAlias, autoInstall
  } = options;

  const projectPath = path.join(process.cwd(), projectName);
  fs.mkdirSync(projectPath);
  process.chdir(projectPath);

  await execa('npm', ['init', '-y']);
  const pkgPath = path.join(projectPath, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkgJson.scripts = {
    dev: 'node src/index.js',
    start: 'node src/index.js'
  };

  if (useDocker && await checkDockerAvailable(execa)) {
    pkgJson.scripts.start = 'docker build -t express-app . && docker run -p 3000:3000 express-app';
  }

  writeJSON(pkgPath, pkgJson);

  const deps = ['express'];
  if (useMorgan) deps.push('morgan');
  if (useEnv) deps.push('dotenv');

  fs.mkdirSync('src');
  fs.writeFileSync('src/index.js', generateIndexJs(useMorgan, useEnv));

  if (useEnv) fs.writeFileSync('.env', 'PORT=3000\n');
  if (useESLint) fs.writeFileSync('.eslintrc.json', generateESLintConfig());
  if (useAlias) fs.writeFileSync('jsconfig.json', generateAliasConfig());
  if (useDocker) fs.writeFileSync('Dockerfile', generateDockerfile());
  fs.writeFileSync('.prettierrc', generatePrettierConfig());
  fs.writeFileSync('README.md', generateReadme(projectName, options));

  if (autoInstall) {
    console.log(chalk.yellow('\n📦 Installing dependencies...'));
    await execa('npm', ['install', ...deps]);
  } else {
    console.log(chalk.yellow(`\n📦 Run manually:\nnpm install ${deps.join(' ')}`));
  }

  await execa('git', ['init']);
  fs.writeFileSync('.gitignore', `node_modules\n.env`);

  console.log(chalk.green('\n✅ Project scaffolded successfully!'));
  console.log(chalk.cyan(`\nTo get started:\n  cd ${projectName}\n  npm run start\n`));
};

const generateIndexJs = (useMorgan, useEnv) => `
const express = require('express');
${useMorgan ? "const morgan = require('morgan');" : ''}
${useEnv ? "require('dotenv').config();" : ''}

const app = express();
const PORT = process.env.PORT || 3000;

${useMorgan ? "app.use(morgan('dev'));" : ''}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
`.trim();

const generateESLintConfig = () => JSON.stringify({
  env: { es2021: true, node: true },
  extends: 'eslint:recommended',
  parserOptions: { ecmaVersion: 'latest' },
  rules: {}
}, null, 2);

const generateAliasConfig = () => JSON.stringify({
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"]
    }
  }
}, null, 2);

const generateDockerfile = () => `
FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
`.trim();

const generatePrettierConfig = () => JSON.stringify({
  semi: true,
  singleQuote: true,
  trailingComma: 'none'
}, null, 2);

const generateReadme = (name, opts) => {
  const features = [
    '- Express',
    opts.useMorgan && '- Morgan logging',
    opts.useEnv && '- dotenv',
    opts.useESLint && '- ESLint',
    opts.useAlias && '- Path aliasing',
    opts.useDocker && '- Dockerfile included'
  ].filter(Boolean).join('\n');

  return `# ${name}

Generated with \`create-express-docker-app\` CLI

## Available Scripts

\`\`\`bash
npm start
\`\`\`

## Features
${features}
`;
};
