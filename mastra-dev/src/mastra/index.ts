
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { codeGeneratorAgent } from './agents/codeGeneratorAgent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow, codeGeneratorWorkflow },
  agents: { weatherAgent, codeGeneratorAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
