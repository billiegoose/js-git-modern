"use strict"
function promisify (fn) {
  return new Promise((resolve, reject) => {
    fn((err, ...results) => {
      return (err) ? reject(err) : resolve(...results)
    })
  })
}


const modes = require('js-git/lib/modes')

class GitRepo {
  constructor() {
    let repo = {}
    require('js-git/mixins/mem-db')(repo)

    require('js-git/mixins/create-tree')(repo)
    require('js-git/mixins/pack-ops')(repo)
    require('js-git/mixins/walkers')(repo)
    require('js-git/mixins/read-combiner')(repo)
    require('js-git/mixins/formats')(repo)
    this._repo = repo
    // Object.defineProperty(this, '_repo', {
    //   value: repo
    // });
    return this
  }
  saveAs (...args) { return promisify(this._repo.saveAs(...args)) }
  loadAs (...args) { return promisify(this._repo.loadAs(...args)) }
}

  // repo.loadAs = loadAs;
  // repo.saveRaw = saveRaw;
  // repo.loadRaw = loadRaw;
  // repo.hasHash = hasHash;
  // repo.readRef = readRef;
  // repo.updateRef = updateRef;
  // repo.listRefs = listRefs;

module.exports.GitRepo = GitRepo
module.exports.GitModes = modes
//module.exports.GitCommit = GitCommit
