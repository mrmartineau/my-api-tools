/**
 * Interface for a parsed movie object
 */
interface Movie {
  title: string
  releaseYear: number
  rating: string
  ratingNumber: number
}

/**
 * Parses a Letterboxd title string (from RSS feed) and extracts the title, release year, and star rating.
 * Expected format: "Movie Title, YYYY - ★★★..."
 *
 * @param movieString - The string to parse
 * @returns A Movie object if valid, null if invalid
 */
export function letterboxdMovieTitleParser(movieString: string): Movie | null {
  // Regular expression to match movie strings
  // Format: "Movie Title, YYYY - ★★★..."
  const movieRegex = /^(.+),\s*(\d{4})\s*-\s*([\u2605\u2606\u00BD½]+)$/

  const match = movieString.match(movieRegex)

  if (!match) {
    return null // Invalid format
  }

  const [, title, releaseYearStr, rating] = match

  // Validate year is a 4-digit number
  const releaseYear = parseInt(releaseYearStr, 10)
  if (isNaN(releaseYear) || releaseYearStr.length !== 4) {
    return null
  }

  // Validate rating contains only star characters and half-star character
  const validRatingChars = /^[\u2605\u2606\u00BD½]+$/
  if (!validRatingChars.test(rating)) {
    return null
  }

  // Convert rating to number
  const trimmedRating = rating.trim()
  const fullStars = (trimmedRating.match(/★/g) || []).length
  const halfStar = trimmedRating.includes('½') ? 0.5 : 0
  const ratingNumber = fullStars + halfStar

  return {
    title: title.trim(),
    releaseYear,
    rating: trimmedRating,
    ratingNumber,
  }
}
