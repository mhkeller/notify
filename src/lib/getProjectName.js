import path from 'path';

export default function getProjectName () {
  const basePath = path.resolve('./');
  return path.basename(basePath);
}
