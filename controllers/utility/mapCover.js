const mapCover = async (query) => {
  const modelMongo = await query
  const modelCover = modelMongo.coverImage.toString('base64')

  return { ...modelMongo, coverImage: modelCover }
}

exports.mapCover = mapCover
