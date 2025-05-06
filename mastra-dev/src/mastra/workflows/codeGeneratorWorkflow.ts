import { google } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { Step, Workflow } from '@mastra/core/workflows';
import { z } from 'zod';
import { codeGeneratorAgent } from '../agents/codeGeneratorAgent';

const generateCode = new Step({
  id: 'generate-code',
  description: 'Generates code based on user instructions',
  inputSchema: z.object({
    instructions: z.string().describe('The instructions for generating code'),
    language: z.string().optional().describe('The programming language to use'),
  }),
  execute: async ({ context }) => {
    const triggerData = context?.getStepResult<{ instructions: string, language?: string }>('trigger');

    if (!triggerData) {
      throw new Error('Trigger data not found');
    }

    const { instructions, language } = triggerData;

    const prompt = `Generate code based on the following instructions: ${instructions}. Language: ${language || 'Not specified'}`;

    const response = await codeGeneratorAgent.stream([
      {
        role: 'user',
        content: prompt,
      },
    ]);

    let codeText = '';

    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      codeText += chunk;
    }

    return {
      code: codeText,
    };
  },
});

const codeGeneratorWorkflow = new Workflow({
  name: 'code-generator-workflow',
  triggerSchema: z.object({
    instructions: z.string().describe('The instructions for generating code'),
    language: z.string().optional().describe('The programming language to use'),
  }),
})
  .step(generateCode);

codeGeneratorWorkflow.commit();

export { codeGeneratorWorkflow };