const express = require('express')
const path = require('path')
const data = require('./src/mocks/blogs.json')
// const { myblog } = require('./src/models') //import myblog models
const app = express()
const PORT = 5000

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Query } = require('pg')
const sequelize = new Sequelize(config.development)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))

app.use(express.urlencoded({ extended: false }))

//routing
app.get('/', home)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/blog-page/:id', blogPage) //url params
app.get('/delete-blog/:id', deleteBlog)
app.get('/add-blog', formBlog)
app.post('/add-blog', addBlog)
app.get('/edit-blog/:id', formEdit)
app.post('/update-blog/:id', updateBlog)

app.listen(PORT, () => {
  console.log("Server running on port 5000");
})

async function home(req, res) {
  try {
    const query = `SELECT id, title, description, duration, html, css, javascript, php, image FROM myblogs`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res
    }))
    res.render('index', {myblogs:data})

  } catch (error) {
    console.log(error);
  }
}

// Using findall() method
// async function home(req, res) {
//   try {
//     const data = await myblog.findAll()

//     console.log(data)

//   } catch (error) {
//     console.log(error);
//   }
// }
async function blogPage(req, res) {
  try {
    const { id } = req.params
    const query = `SELECT id, title, description, "startDate", "endDate", duration, html, css, javascript, php, image, "createdAt", "updatedAt" FROM myblogs WHERE id=${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res
    }))
  
    res.render('blog-page', { blog:data[0] })
  } catch (error) {
    console.log(error);
  }
}

function testimonial(req, res) {
  res.render('testimonial')
}
function contact(req, res) {
  res.render('contact')
}


function formBlog(req, res) {
  res.render('add-blog')
}

async function addBlog(req, res) {
  try {
    let { title, startDate, endDate, description, html, css, javascript, php, imageblog} = req.body

    // Month Duration
    let startYear = Number(startDate.slice(0, 4))
    let endYear = Number(endDate.slice(0, 4))
    let startMonth = Number(startDate.slice(5, 7))
    let endMonth = Number(endDate.slice(5, 7))
    let yearMonthCv = (endYear-startYear) * 12
  
    let monthDuration = (endMonth - startMonth) + yearMonthCv
  
    // Technologies
      if (html === 'on') {
        html = "fa-brands fa-html5"
      } else {
          html = ""
      };
      if (css === 'on'){
          css = "fa-brands fa-css3-alt"
      } else {
          css = ""
      };
      if (javascript === 'on'){
          javascript = "fa-brands fa-js"
      } else {
          javascript = ""
      };
      if (php === 'on'){
          php = "fa-brands fa-php"
      } else {
          php = ""
      };

    let query = `INSERT INTO myblogs (title, description, "startDate", "endDate", duration, html, css, javascript, php, image, "createdAt", "updatedAt") VALUES ('${title}', '${description}', '${startDate}', '${endDate}', '${monthDuration}', '${html}', '${css}', '${javascript}', '${php}', '${imageblog}', NOW(), NOW())`
  
    await sequelize.query(query)
  
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params
    const query = `DELETE FROM myblogs WHERE id = ${id}`
    await sequelize.query(query)

    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

async function formEdit(req, res){
  try {
    const { id } = req.params
    const query = `SELECT id, title, description, "startDate", "endDate", duration, html, css, javascript, php, image, "createdAt", "updatedAt" FROM myblogs WHERE id=${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res
    }))
  
    res.render('edit-blog', { blog:data[0]})
  } catch (error) {
    console.log(error)
  }
}

async function updateBlog(req, res){
  try {
    const { id } = req.params
    let { title, startDate, endDate, description, html, css, javascript, php, imageblog} = req.body

    // Month Duration
    let startYear = Number(startDate.slice(0, 4))
    let endYear = Number(endDate.slice(0, 4))
    let startMonth = Number(startDate.slice(5, 7))
    let endMonth = Number(endDate.slice(5, 7))
    let yearMonthCv = (endYear-startYear) * 12
  
    let monthDuration = (endMonth - startMonth) + yearMonthCv
  
    // Technologies
      if (html === 'on') {
        html = "fa-brands fa-html5"
      } else {
          html = ""
      };
      if (css === 'on'){
          css = "fa-brands fa-css3-alt"
      } else {
          css = ""
      };
      if (javascript === 'on'){
          javascript = "fa-brands fa-js"
      } else {
          javascript = ""
      };
      if (php === 'on'){
          php = "fa-brands fa-php"
      } else {
          php = ""
      };

    let query = `UPDATE myblogs SET title='${title}', description='${description}', "startDate"='${startDate}', "endDate"='${endDate}', duration=${monthDuration}, html='${html}', css='${css}', javascript='${javascript}', php='${php}', image='${imageblog}', "createdAt"=NOW(), "updatedAt"=NOW() WHERE id=${id}`
  
    await sequelize.query(query)
  
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}