import fs from 'fs';

export const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const checkDockerAvailable = async (execa) => {
  try {
    await execa('docker', ['--version']);
    return true;
  } catch {
    return false;
  }
};
