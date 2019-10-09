const {join, basename, dirname} = require('path')
const {mkdirSync, writeFileSync, unlinkSync} = require('fs')
module.exports = function lockfile({ dir = '', name = name => join(dir, basename(name) + '.lock')}) {
  const lockfiles = {}
  return {
    name: 'lockfile',
    buildStart({input}) {
      for(const file of input) {
        let lockfile = lockfiles[basename(file)] = name(file)
        mkdirSync(dirname(lockfile), { recursive: true })
        writeFileSync(lockfile)
      }
    },
    generateBundle(outputOpts, bundles) {
      for(const [name, bundle] of Object.entries(bundles)) {
        if (bundle.isEntry) {
          unlinkSync(lockfiles[basename(bundle.facadeModuleId)])
        }
      }
    }
  }
}
