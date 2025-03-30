import { XMLParser } from 'fast-xml-parser'

export interface Feed {
  feed: FeedMetadata
  entries: Entry[]
}

export interface Entry {
  title: string
  link: string
  published: string
  [key: string]: any
}

export interface FeedMetadata {
  title: string
  link?: string
}

const options = {
  ignoreAttributes: false,
}
const parser = new XMLParser(options)

export const feedToJson = async (
  feedUrl: string
): Promise<Feed | undefined> => {
  let req = await fetch(feedUrl)
  let xmlData = await req.text()
  let data = parser.parse(xmlData)

  let feed: Feed | undefined
  if (data.feed) {
    feed = reformatData(data.feed)
  }
  if (data.rss) {
    feed = reformatData(data.rss)
  }

  return feed
}

function reformatData(d: any): Feed {
  if (d?.link?.length) {
    d.link = d.link.map(fixLink)
  }

  let result: Feed = {
    feed: {
      title: '',
      link: '',
    },
    entries: [],
  }

  // feed is metadata about the feed
  if (d.channel) {
    result.feed = {
      title: d.channel.title,
      link: d.channel.link,
    }

    result.entries = d.channel.item?.map(
      ({ title, link, pubDate, 'content:encoded': content, ...rest }: any) => {
        return {
          title: title,
          link: link,
          published: pubDate,
          content,
          ...rest,
        }
      }
    )
  } else {
    result.feed = {
      title: d.title,
    }

    if (d.link) {
      let alt = d.link.filter((d) => d.rel === 'alternate')
      if (alt.length) result.feed.link = alt[0]['href']
      else {
        // accept the link with _no_ rel
        result.feed.link = d.link.filter((d) => !d.rel)[0]['href']
      }
    }

    result.entries = d.entry?.map(
      ({ title, link, updated, content, ...rest }: any) => {
        if (link) {
          link = fixLink(link)
        }

        if (content) {
          let newContent = {}
          newContent.text = content['#text']
          newContent.type = content['@_type']
          content = newContent
        }

        return {
          title: title,
          published: updated,
          content: content.text,
          link: link.href,
          ...rest,
        }
      }
    )
  }

  return result
}

function fixLink(l: any) {
  let result: any = {}
  if (l['@_href']) {
    result.href = l['@_href']
  }
  if (l['@_rel']) {
    result.rel = l['@_rel']
  }
  if (l['@_type']) {
    result.type = l['@_type']
  }
  if (l['@_title']) {
    result.type = l['@_title']
  }
  return result
}
