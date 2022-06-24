import { updateAll } from './io-sfx.js';
import { GenerateAction, GenerateActionOpts, RunnerContext } from './model.js';

export const cmdGenerateAction: GenerateAction = async (
  ctx: RunnerContext,
  options: GenerateActionOpts
) => {
  await updateAll(ctx, options);
  ctx.termFormatter({
    title: 'Normalized the project structure and documents',
    detail: [
      'You may need to run:',
      'make install-global',
      'make install',
    ].join('\n'),
    kind: 'info',
    format: 'default',
  });
};
