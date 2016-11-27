

function GitRepo () {
  let repo = {}
  require('js-git/mixins/mem-db')(repo)
  require('js-git/mixins/create-tree')(repo)
  require('js-git/mixins/pack-ops')(repo)
  require('js-git/mixins/walkers')(repo)
  require('js-git/mixins/read-combiner')(repo)
  require('js-git/mixins/formats')(repo)
  return repo
}

module.exports.GitRepo = GitRepo
//module.exports.GitCommit = GitCommit
