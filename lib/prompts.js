import inquirer from 'inquirer';

export const promptUser = () => {
  return inquirer.prompt([
    { name: 'projectName', message: 'Project name?' },
    { type: 'confirm', name: 'useEnv', message: 'Use environment file?', default: true },
    { type: 'confirm', name: 'useMorgan', message: 'Use Morgan logger?', default: true },
    { type: 'confirm', name: 'useDocker', message: 'Use Docker?', default: false },
    { type: 'confirm', name: 'useESLint', message: 'Use ESLint?', default: true },
    { type: 'confirm', name: 'useAlias', message: 'Set @/ as path alias?', default: true },
    { type: 'confirm', name: 'autoInstall', message: 'Auto-install dependencies?', default: true }
  ]);
};
