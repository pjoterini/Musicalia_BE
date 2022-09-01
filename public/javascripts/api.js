const searchForm = document.querySelector('.search-form')
const findApiBtns = document.querySelectorAll('.find-api-btn')
const apiLinksList = document.querySelector('.api-links-list')

// REMOVE EXISTING ARTICLES AND ADD NEW CORRESPONDING TO BTN VALUE

// findApiBtns.forEach( async function(apiBtn) {
//     apiBtn.addEventListener('click', async function(e) {
//         e.preventDefault()
        
//         const queryData = {
//             queryData: e.target.value
//         }



//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/json'
//             },
//             body: JSON.stringify(queryData)
//         }
//         fetch('/article', options)
        
        

        
//     })
// })



// url = `https://newsapi.org/v2/everything?q=${e.target.value}&from=${date}&sortBy=relevancy&apiKey=${apiKey}`

//         const res = await fetch(url)
//         const data = await res.json()
//         const articlesList = await data.articles.slice(0, 8)

//         articlesList.forEach(article => {
//             let li = document.createElement('li')
//             li.classList.add('api-li')
//             let a = document.createElement('a')
//             a.classList.add('api-a')
//             let img = document.createElement('img')
//             img.classList.add('api-img')
//             let p = document.createElement('p')
//             p.classList.add('api-p')
//             let pTitle = document.createElement('p')
//             pTitle.classList.add('api-title')
            
//             p.textContent = article.description.slice(0, 110)
//             p.textContent += '..'
//             img.src = article.urlToImage
//             a.setAttribute('href', article.url)
//             a.setAttribute('target', '_blank')
//             pTitle.textContent = article.title
//             a.appendChild(pTitle)
//             a.appendChild(img)
//             a.appendChild(p)
//             li.appendChild(a)
//             apiLinksList.appendChild(li)
//         })