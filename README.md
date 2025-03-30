# My API Tools

A small but growing collection of APIs for my personal projects. Feel free to use them as you see fit.

They're all built with [Hono](https://hono.dev/) and designed to be used in [Cloudflare Workers](https://workers.cloudflare.com/).

## Development

```sh
pnpm install
pnpm run dev
```

## Deployment

```sh
pnpm run deploy
```

## Routes

### `/rss?feed={feedUrl}`

Returns a JSON object with the RSS/Atom feed for the given feed URL.

### `/letterboxd/:username`

Returns a JSON object with the [Letterboxd](https://letterboxd.com) feed for the given username.
