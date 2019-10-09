// @ts-check
declare module 'rollup-plugin-lockfile' {
  import {Plugin} from 'rollup'

  interface Options {
    dir?: string
    name?: (string: string) => string
  }

  export default function babel(options?: Options): Plugin
}

