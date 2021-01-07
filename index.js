const {join, basename, dirname} = require('path')
const {existsSync, mkdirSync, writeFileSync, unlinkSync} = require('fs')
module.exports = function lockfile({ dir = '', name = name => join(dir, basename(name) + '.lock')}) {
  let lockfiles = {}

  const deleteAllLockfiles = () => {
    for (const [name, file] of Object.entries(lockfiles)) {
      if (existsSync(file)) {
        unlinkSync(file)
      }
    }
  }

  return {
    name: 'lockfile',
    buildStart({input}) {
      // reset tracked lockfiles for this build
      lockfiles = {}

      // lock each input file
      for(const file of input) {
        let lockfile = lockfiles[basename(file)] = name(file)
        mkdirSync(dirname(lockfile), { recursive: true })
        writeFileSync(lockfile)
      }
    },
    buildEnd(error) {
      // if there is a build failure, release locks
      if (error) {
        deleteAllLockfiles()
      }
    },
    writeBundle(outputOpts, bundles) {
      // After the output has been written, delete all lockfiles
      deleteAllLockfiles()
    }
  }
}
