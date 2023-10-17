const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static('src/assets'))

app.use(express.urlencoded({ extended: false }))

app.get('/', home)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/blog', blog)
app.get('/blog-page/:id', blogPage) //url params
app.get('/addblog', formblog)
app.post('/addblog', addblog)

app.listen(PORT, () => {
  console.log("Server running on port 5000");
})

function home(req, res) {
  res.render('index')
}
function testimonial(req, res) {
  res.render('testimonial')
}
function contact(req, res) {
  res.render('contact')
}
function blog(req, res) {
  res.render('blog')
}
function blogPage(req, res) {
  res.render('blogPage')
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


function formblog(req, res) {
  res.render('addblog')
}
function addblog(req, res) {
  const { title, description } = req.body
  console.log(title);
  console.log(description);
}