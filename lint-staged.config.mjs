const generatedPath = '/src/api/generated/';
const relativeGeneratedPath = 'src/api/generated/';

const excludeGenerated = (files) =>
  files.filter(
    (file) =>
      !file.includes(generatedPath) && !file.startsWith(relativeGeneratedPath),
  );

const quote = (file) => JSON.stringify(file);

const config = {
  '*.{js,jsx,ts,tsx}': (files) => {
    const targetFiles = excludeGenerated(files);

    if (targetFiles.length === 0) {
      return [];
    }

    const paths = targetFiles.map(quote).join(' ');

    return [`eslint --fix ${paths}`, `prettier --write ${paths}`];
  },
  '*.{json,css,md}': (files) => {
    const targetFiles = excludeGenerated(files);

    if (targetFiles.length === 0) {
      return [];
    }

    return `prettier --write ${targetFiles.map(quote).join(' ')}`;
  },
};

export default config;
