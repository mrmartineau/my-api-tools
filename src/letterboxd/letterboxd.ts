import { letterboxdMovieTitleParser } from './letterboxdMovieTitleParser'
import { feedToJson } from '../rss/rss-to-json'

export const getLetterboxdFeed = async (username: string) => {
  const feed = `https://letterboxd.com/${username}/rss`
  const jsonFeed = await feedToJson(feed)

  const entriesWithPoster = jsonFeed?.entries?.map((entry) => {
    const poster = entry?.description?.match(/<img src="([^"]+)"/)
    return {
      ...entry,
      'letterboxd:memberRatingText': letterboxdMovieTitleParser(entry.title)
        ?.rating,
      'letterboxd:poster': poster?.[1],
    }
  })

  return entriesWithPoster
}
