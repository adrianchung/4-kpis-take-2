import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // console.log('Hey there!!!!!!!!!!!!!!!' + filePath);
    // this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    // TODO(AC) For some reason when the nest application starts up the string isn't provided from the module and you get an undefined filePath
    this.envConfig = dotenv.parse(fs.readFileSync('/Users/adrianchung/dev/4-kpis-take-2/project/development.env'));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}