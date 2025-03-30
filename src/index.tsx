import { Hono } from 'hono'
import { renderer } from './renderer'
import { feedToJson } from './rss/rss-to-json'
import { getLetterboxdFeed } from './letterboxd/letterboxd'

export const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Zander's API Tools</h1>)
})

app.get('/rss', async (c) => {
  const feed = c.req.query('feed')
  const isValidUrl = new URL(feed ?? '')

  if (isValidUrl && feed) {
    const jsonFeed = await feedToJson(feed)
    return c.json(jsonFeed)
  }

  return c.json(
    {
      error: 'Feed not found',
    },
    404
  )
})

app.get('/letterboxd/:username', async (c) => {
  const username = c.req.param('username')

  if (username) {
    const letterBoxdFeed = await getLetterboxdFeed(username)
    return c.json(letterBoxdFeed)
  }

  return c.json(
    {
      error: 'User not found',
    },
    404
  )
})

app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text(err.message, 500)
})

export default app
