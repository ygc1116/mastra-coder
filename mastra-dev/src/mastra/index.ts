
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { codeGeneratorAgent } from './agents/codeGeneratorAgent';
import { Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const codeGeneratorWorkflow = new Workflow({
  name: "code-generator-workflow",
  triggerSchema: z.object({
    instruction: z.string().describe("The instruction for code generation")
  })
});

codeGeneratorWorkflow.commit();

const app = new Hono();

app.use('*', cors({
  origin: '*'
}));

export const mastra = new Mastra({
  workflows: { weatherWorkflow, codeGeneratorWorkflow },
  agents: { weatherAgent, codeGeneratorAgent },
  server: app,
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
