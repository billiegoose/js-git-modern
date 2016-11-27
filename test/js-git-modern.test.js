import test from 'ava'

import { GitRepo, GitModes } from '..'

test('exists', t => {
  t.truthy(GitRepo)
  let repo = new GitRepo
  t.is(typeof repo.saveAs, 'function')
})

test('create blob using original callback', async t => {
  t.plan(1)
  let repo = new GitRepo
  repo._repo.saveAs("blob", "Hello World\n", (err, blobHash) => {
    t.is(blobHash, "557db03de997c86a4a028e1ebd3a1ceb225be238")
  })
})

test('create blob using new async/await interface', async t => {
  t.plan(1)
  let repo = new GitRepo
  let blobHash = await repo.saveAs("blob", "Hello World\n")
  t.is(blobHash, "557db03de997c86a4a028e1ebd3a1ceb225be238")
})

test('create a tree using original callback', async t => {
  let repo = new GitRepo
  t.plan(3)
  repo._repo.saveAs("blob", "Hello World\n", (err, blobHash) => {
    t.is(blobHash, "557db03de997c86a4a028e1ebd3a1ceb225be238")
    repo._repo.saveAs("tree", {
      "greeting.txt": { mode: GitModes.file, hash: blobHash }
    }, (err, treeHash) => {
      t.falsy(err)
      t.is(treeHash, "648fc86e8557bdabbc2c828a19535f833727fa62")
    })
  })
})

test('create a tree using new async/await interface', async t => {
  t.plan(2)
  let repo = new GitRepo
  let blobHash = await repo.saveAs("blob", "Hello World\n")
  t.is(blobHash, "557db03de997c86a4a028e1ebd3a1ceb225be238")
  let treeHash = await repo.saveAs("tree", {
    "greeting.txt": { mode: GitModes.file, hash: blobHash }
  })
  t.is(treeHash, "648fc86e8557bdabbc2c828a19535f833727fa62")
})
