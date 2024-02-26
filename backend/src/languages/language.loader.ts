import fs from 'fs';
import path from 'path';

import { LANGUAGE } from "../config/environment";

const loadTranslations = (language: string) => {
  const filePath = path.join(__dirname, `${language}.json`);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
  return fs.readFileSync(path.join(__dirname, 'en.json'), 'utf8');
};

const language = loadTranslations(LANGUAGE)
export default language