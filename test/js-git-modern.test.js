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

test('create a commit using original callback', async t => {
  let repo = new GitRepo
  t.plan(6)
  repo._repo.saveAs("blob", "Hello World\n", (err, blobHash) => {
    t.falsy(err)
    t.is(blobHash, "557db03de997c86a4a028e1ebd3a1ceb225be238")
    repo._repo.saveAs("tree", {
      "greeting.txt": { mode: GitModes.file, hash: blobHash }
    }, (err, treeHash) => {
      t.falsy(err)
      t.is(treeHash, "648fc86e8557bdabbc2c828a19535f833727fa62")
      repo._repo.saveAs("commit", {
        author: {
          name: "Tim Caswell",
          email: "tim@creationix.com",
          date: new Date(0)
        },
        tree: "648fc86e8557bdabbc2c828a19535f833727fa62",
        message: "Test commit\n"
      }, (err, commitHash) => {
        t.falsy(err)
        t.is(commitHash, "e956f5c8ba902b6f3bfe45f5a4bede883d7e07c2")
      })
    })
  })
})

test('create a commit using new async/await interface', async t => {
  let repo = new GitRepo
  t.plan(1)

  let blobHash = await repo.saveAs("blob", "Hello World\n")
  let treeHash = await repo.saveAs("tree", {
    "greeting.txt": { mode: GitModes.file, hash: blobHash }
  })
  let commitHash = await repo.saveAs("commit", {
    author: {
      name: "Tim Caswell",
      email: "tim@creationix.com",
      date: new Date(0)
    },
    tree: "648fc86e8557bdabbc2c828a19535f833727fa62",
    message: "Test commit\n"
  })

  t.is(commitHash, "e956f5c8ba902b6f3bfe45f5a4bede883d7e07c2")
})
