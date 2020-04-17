## rollup-plugin-lockfile

It makes a `*.lock` file (based on the name of the entry point) while rollup is compiling that file.

That's it!

### Usage:


#### Simple usage

Lockfiles will be generated based on the input name(s), in the `dir` directory.

```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
  input: './main.ts',
  plugins: [
    lockfile({
      dir: '/path/to/output/directory'
    })
  ]
}
```

#### Advanced usage

The full filename can be configured by passing `name`

```js
// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
  input: './main.ts',
  plugins: [
    lockfile({
      name(name) {
        return myCustomLockfileFilenameDeterminer(name)
      }
    })
  ]
}
```
