/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    inputFilePath: string
    outputFilePath: string
  }
  export const config: Config
  export type Config = IConfig
}
