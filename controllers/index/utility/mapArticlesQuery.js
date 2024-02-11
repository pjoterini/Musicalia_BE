const mapArticlesQuery = (query) => {
  let mappedQuery = query
  switch (query) {
    case 'music':
      mappedQuery = 'music'
      break
    case 'songs':
      mappedQuery = 'songs song chart top'
      break
    case 'festivals':
      mappedQuery = 'festival tour band music'
      break
    case 'classical':
      mappedQuery = 'classical concert opera music'
      break
    case 'artists':
      mappedQuery = 'bands artist artists band music'
      break
    case 'soundtracks':
      mappedQuery = 'soundtrack movie game music'
      break
    case 'retro':
      mappedQuery = 'old-music retro-music'
      break
    case 'alternative':
      mappedQuery = 'music alternative'
      break
    default:
      mappedQuery = 'music'
  }

  return mappedQuery
}

exports.mapArticlesQuery = mapArticlesQuery
