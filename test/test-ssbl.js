/* eslint-env mocha */

import * as chai from 'chai'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import ssbl from '../ssbl.js'

const { assert } = chai

describe('ssbl', () => {
  /** @type {string} */
  let tempDir

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true })
      tempDir = null
    }
  })

  describe('single file blog', () => {
    it('should parse a single post', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await writeFile(
        join(tempDir, 'foobar.md'),
        '{\n"name":"foo","date":"2013-01-02","title":"bar"\n}\nThis\n\nis\n\ncontent'
      )

      const data = await ssbl(tempDir)

      assert.lengthOf(data, 1)
      assert.deepEqual(data[0].spec, {
        name: 'foo',
        date: new Date('2013-01-02'),
        title: 'bar'
      })
      assert.include(data[0].page, '<p>This</p>')
      assert.include(data[0].page, '<p>is</p>')
      assert.include(data[0].page, '<p>content</p>')
    })
  })

  describe('multi-file blog', () => {
    it('should sort by date descending and filter drafts', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await Promise.all([
        writeFile(
          join(tempDir, 'a.md'),
          '{\n"name":"foo1","date":"2013-01-02","title":"bar1"\n}\nThis\n\nis\n\ncontent 1'
        ),
        writeFile(
          join(tempDir, 'b.md'),
          '{\n"name":"foo2","date":"2012-01-02","title":"bar2"\n}\nThis\n\nis\n\ncontent 2'
        ),
        writeFile(
          join(tempDir, 'b2.md'),
          '{\n"name":"foo2-1","date":"2012-01-02","title":"bar2-1","draft":true\n}\nThis\n\nis\n\ncontent 2 of a draft'
        ),
        writeFile(
          join(tempDir, 'c.md'),
          '{\n"name":"foo3","date":"2013-02-02","title":"bar3"\n}\nThis\n\nis\n\ncontent 3'
        )
      ])

      const data = await ssbl(tempDir)

      // Should have 3 posts (draft excluded)
      assert.lengthOf(data, 3)

      // Should be sorted by date descending
      assert.strictEqual(data[0].spec.name, 'foo3') // 2013-02-02
      assert.strictEqual(data[1].spec.name, 'foo1') // 2013-01-02
      assert.strictEqual(data[2].spec.name, 'foo2') // 2012-01-02

      // Verify content
      assert.include(data[0].page, 'content 3')
      assert.include(data[1].page, 'content 1')
      assert.include(data[2].page, 'content 2')
    })
  })

  describe('JSON header formats', () => {
    it('should handle optional backticks around header', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await writeFile(
        join(tempDir, 'post.md'),
        '```\n{\n"name":"test","date":"2020-01-01"\n}\n```\nContent here'
      )

      const data = await ssbl(tempDir)

      assert.lengthOf(data, 1)
      assert.strictEqual(data[0].spec.name, 'test')
      assert.include(data[0].page, 'Content here')
    })
  })

  describe('error handling', () => {
    it('should throw on missing JSON header', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await writeFile(join(tempDir, 'bad.md'), 'Just plain content')

      try {
        await ssbl(tempDir)
        assert.fail('Expected an error')
      } catch (err) {
        assert.include(err.message, 'Not a JSON header')
      }
    })

    it('should throw on missing date property', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await writeFile(join(tempDir, 'nodate.md'), '{\n"name":"test"\n}\nContent')

      try {
        await ssbl(tempDir)
        assert.fail('Expected an error')
      } catch (err) {
        assert.include(err.message, 'no "date" property')
      }
    })

    it('should throw on invalid JSON', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await writeFile(join(tempDir, 'badjson.md'), '{\n"name": broken\n}\nContent')

      try {
        await ssbl(tempDir)
        assert.fail('Expected an error')
      } catch (err) {
        assert.include(err.message, 'JSON error')
      }
    })
  })

  describe('file filtering', () => {
    it('should only process .md files', async () => {
      tempDir = await mkdtemp(join(tmpdir(), 'ssbl-test-'))
      await Promise.all([
        writeFile(
          join(tempDir, 'post.md'),
          '{\n"name":"valid","date":"2020-01-01"\n}\nValid post'
        ),
        writeFile(join(tempDir, 'readme.txt'), 'Not a markdown file'),
        writeFile(join(tempDir, 'config.json'), '{"key": "value"}')
      ])

      const data = await ssbl(tempDir)

      assert.lengthOf(data, 1)
      assert.strictEqual(data[0].spec.name, 'valid')
    })
  })
})
