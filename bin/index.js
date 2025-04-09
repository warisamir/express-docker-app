#!/usr/bin/env node
import chalk from 'chalk';
import { promptUser } from '../lib/prompts.js';
import { scaffoldProject } from '../lib/scaffold.js';

const run = async () => {
  try {
    const answers = await promptUser();
    await scaffoldProject(answers);
  } catch (err) {
    console.error(chalk.red('❌ Error creating project:'), err);
  }
};

run();
