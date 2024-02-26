import { GiphyFetch } from '@giphy/js-fetch-api'

export const useGiphy = () => {
  const giphy = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

  return { giphy }
}
