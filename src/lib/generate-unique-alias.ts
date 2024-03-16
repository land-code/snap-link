import {adjectives, animals, colors, countries, languages, starWars, uniqueNamesGenerator} from 'unique-names-generator'


export const generateUniqueAlias = (existingLinks: string[]): string => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [ adjectives, colors, animals, countries, languages, starWars ],
    separator: '-',
    length: 2
  })
  if (existingLinks.includes(randomName)) {
    return generateUniqueAlias(existingLinks)
  }
  return randomName
}