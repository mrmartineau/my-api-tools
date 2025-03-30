import { describe, it, expect } from 'vitest'
import { letterboxdMovieTitleParser } from './letterboxdMovieTitleParser'

describe('letterboxdMovieTitleParser', () => {
  it('should correctly parse valid movie strings', () => {
    const validMovies = [
      {
        input: 'The Dark Knight, 2008 - ★★★★½',
        expected: {
          title: 'The Dark Knight',
          releaseYear: 2008,
          rating: '★★★★½',
          ratingNumber: 4.5,
        },
      },
      {
        input: 'The Fall Guy, 2024 - ★★★½',
        expected: {
          title: 'The Fall Guy',
          releaseYear: 2024,
          rating: '★★★½',
          ratingNumber: 3.5,
        },
      },
      {
        input: 'DodgeBall: A True Underdog Story, 2004 - ★★★½',
        expected: {
          title: 'DodgeBall: A True Underdog Story',
          releaseYear: 2004,
          rating: '★★★½',
          ratingNumber: 3.5,
        },
      },
      {
        input: 'E.T. the Extra-Terrestrial, 1982 - ★★★★★',
        expected: {
          title: 'E.T. the Extra-Terrestrial',
          releaseYear: 1982,
          rating: '★★★★★',
          ratingNumber: 5,
        },
      },
      {
        input: 'Wallace & Gromit: Vengeance Most Fowl, 2024 - ★★★★',
        expected: {
          title: 'Wallace & Gromit: Vengeance Most Fowl',
          releaseYear: 2024,
          rating: '★★★★',
          ratingNumber: 4,
        },
      },
      {
        input: 'Harry Potter and the Philosopher&#039;s Stone, 2001 - ★★★½',
        expected: {
          title: 'Harry Potter and the Philosopher&#039;s Stone',
          releaseYear: 2001,
          rating: '★★★½',
          ratingNumber: 3.5,
        },
      },
    ]

    validMovies.forEach(({ input, expected }) => {
      const result = letterboxdMovieTitleParser(input)
      expect(result).toEqual(expected)
    })
  })

  it('should return null for invalid movie strings', () => {
    const invalidMovie = 'Business - Based on a true story'
    const result = letterboxdMovieTitleParser(invalidMovie)
    expect(result).toBeNull()
  })
})
