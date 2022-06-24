const bugReport = {
  name: 'Bug Report',
  description: 'File a bug report',
  title: '[Bug]: ',
  labels: ['bug', 'triage'],
  body: [
    {
      type: 'markdown',
      attributes: {
        value: 'Thanks for taking the time to fill out this bug report!\n',
      },
    },
    {
      type: 'textarea',
      id: 'what-happened',
      attributes: {
        label: 'What happened?',
        description: 'Please tell us, what did you expect to happen?',
        placeholder: 'Tell us what you see!',
        value: 'A bug happened!',
      },
      validations: {
        required: true,
      },
    },
    {
      type: 'textarea',
      id: 'version',
      attributes: {
        label: 'Version',
        description: 'What version of the library are you running?',
        placeholder: '0.0.0',
      },
      validations: {
        required: true,
      },
    },
    {
      type: 'dropdown',
      id: 'platform',
      attributes: {
        label: 'On which platform(s) do you have the issue ?',
        multiple: true,
        options: [
          'Node.js',
          'Typescript node',
          'Firefox',
          'Chrome',
          'Safari',
          'Microsoft Edge',
          'Linux',
          'Windows',
          'MacOs',
          'Other',
        ],
      },
    },
    {
      type: 'textarea',
      id: 'logs',
      attributes: {
        label: 'Relevant log output',
        description:
          'Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.',
        render: 'shell',
      },
    },
  ],
};

export { bugReport };
