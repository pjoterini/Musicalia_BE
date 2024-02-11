const mapCovers = async (query) => {
  const modelsMongo = await query
  const modelsCovers = modelsMongo.map((model) => {
    return model.coverImage.toString('base64')
  })

  return (modelsWithBase64Covers = modelsMongo.map((model, idx) => {
    return { ...model, coverImage: modelsCovers[idx] }
  }))
}

exports.mapCovers = mapCovers
