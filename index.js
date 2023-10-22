const express = require('express')
const path = require('path')
const data = require('./src/mocks/blogs.json')
const app = express()
const PORT = 5000

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
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

function testimonial(req, res) {
  res.render('testimonial')
}
function contact(req, res) {
  res.render('contact')
}

function blogPage(req, res) {
  const { id } = req.params

  const data = {
    id,
    title: "Javascript Project - 2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }

  res.render('blog-page', { data })
}

function formBlog(req, res) {
  res.render('add-blog')
}

function addBlog(req, res) {
  let { title, startdate, enddate, description, html, css, javascript, php, imageblog } = req.body

  // Month Duration
  let startYear = Number(startdate.slice(0, 4))
  let endYear = Number(enddate.slice(0, 4))
  let startMonth = Number(startdate.slice(5, 7))
  let endMonth = Number(enddate.slice(5, 7))
  let yearMonthCv = (endYear-startYear) * 12
  let monthDuration = (endMonth - startMonth) + yearMonthCv

  // Technologies
    if (html === 'on') {
      html = "html5"
    } else {
        html = ""
    };
    if (css === 'on'){
        css = "css3"
    } else {
        css = ""
    };
    if (javascript === 'on'){
        javascript = "js"
    } else {
        javascript = ""
    };
    if (php === 'on'){
        php = "php"
    } else {
        php = ""
    };

  let items = {
    title,
    monthDuration,
    description,
    html,
    css,
    javascript,
    php,
    imageblog
  }

  data.unshift(items)
  res.redirect('/')
}

function deleteBlog(req, res) {
  const { id } = req.params

  data.splice(id, 1)
  res.redirect('/')
}