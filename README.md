# Super Simple Blog Loader

[![CI](https://github.com/rvagg/ssbl/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/rvagg/ssbl/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/ssbl.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/ssbl/)

Load markdown formatted blog files from a folder as a handy data structure for rendering.

Each file represents a post. Post metadata is stored in JSON at the head of each file (complete with optional backticks if you want it nicely viewable on GitHub).

## Installation

```bash
npm install ssbl
```

## Example

Given two files in a directory:

### myfirstpost.md

```
{
    "author" : "Rod Vagg"
  , "date"   : "2012-10-01"
  , "title"  : "My first post!"
}

This is my first post on my blog! How'd you like it?

### It's in Markdown too!

You can put **Markdown** in your *posts* and [links](https://github.com/rvagg/ssbl) too!
```

### w00t.md

```
{
    "author" : "Rod Vagg"
  , "date"   : "2013-10-01"
  , "title"  : "Sorry..."
}

So... it turns out I'm not so great at this blogging thing and I haven't posted in a year so I might just give up eh?
```

And the following code:

```js
import ssbl from 'ssbl'

const data = await ssbl('./example')
console.log(JSON.stringify(data, null, 2))
```

You'll see this:

```json
[
  {
    "spec": {
      "author": "Rod Vagg",
      "date": "2013-10-01T00:00:00.000Z",
      "title": "Sorry..."
    },
    "page": "<p>So... it turns out I'm not so great at this blogging thing and I haven't posted in a year so I might just give up eh?</p>\n"
  },
  {
    "spec": {
      "author": "Rod Vagg",
      "date": "2012-10-01T00:00:00.000Z",
      "title": "My first post!"
    },
    "page": "<p>This is my first post on my blog! How'd you like it?</p>\n<h3>It's in Markdown too!</h3>\n<p>You can put <strong>Markdown</strong> in your <em>posts</em> and <a href=\"https://github.com/rvagg/ssbl\">links</a> too!</p>\n"
  }
]
```

What you do with it from there is up to you. The data structure is ideal for passing through a templating engine.

This example is in the [example](./example/) directory.

## API

### `ssbl(path)`

Returns a `Promise<Post[]>` representing the given path to a directory containing Markdown files. The data will be returned in order of the `date` property in the metadata of each post, descending.

Only files ending in *.md* will be considered and only one level deep will be scanned.

### Post object

```typescript
interface Post {
  spec: {
    date: Date
    [key: string]: any  // Your custom metadata fields
  }
  page: string  // Rendered HTML content
}
```

## Metadata

Your metadata must be valid JSON and have the opening `{` and `}` on separate lines by themselves. The only restriction is that the metadata must contain a `"date"` property (used for sorting). Generally you'd also want an `"author"` and a `"title"` but it's totally up to you.

If a post has a `"draft"` field set to a truthy value, it will be excluded from the list of posts.

## Markdown

The markdown is processed with [Brucedown](https://github.com/rvagg/brucedown) which uses [Marked](https://github.com/markedjs/marked) to parse the Markdown (GFM by default) and [Shiki](https://shiki.style/) for syntax highlighting with VS Code-quality output.

## Licence

MIT Licence. Copyright (c) Rod Vagg.
