const fetch = require('node-fetch')
const { mapArticlesQuery } = require('./mapArticlesQuery')

const getArticles = async (reqQuery) => {
  try {
    let query = 'music'
    if (reqQuery) query = mapArticlesQuery(reqQuery)

    const lastTwentyDays = new Date(
      new Date().setDate(new Date().getDate() - 20)
    )
      .toISOString()
      .slice(0, 10)

    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${lastTwentyDays}&sortBy=relevancy&apiKey=${process.env.API_KEY}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    const articles = data.articles.slice(0, 8)

    return articles
  } catch (error) {
    console.error(error)
  }
}

exports.getArticles = getArticles
