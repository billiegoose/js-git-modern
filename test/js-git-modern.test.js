import test from 'ava'

import { GitRepo } from '..'

test('exists', t => {
  t.truthy(GitRepo)
})
