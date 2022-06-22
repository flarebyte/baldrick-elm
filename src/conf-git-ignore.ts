const gitIgnoreRows: string[] = [
  'elm-stuff',
  'repl-temp-*',
  '*.pyc',
  '*.log',
  '.vscode/*.log',
  '.DS_Store',
  'report/',
  '.message',
];

export const gitIgnoreConfig = gitIgnoreRows.join('\n');
