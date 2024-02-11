const { getArticles } = require('./utility/getArticles')

const getQueriedArticles = async (req, res) => {
  try {
    const articles = await getArticles(req.body.query)

    res.status(200).json(articles)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

exports.getQueriedArticles = getQueriedArticles
