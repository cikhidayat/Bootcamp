const express = require('express')
const path = require('path')
const data = require('./src/mocks/blogs.json')
// const { myblog } = require('./src/models') //import myblog models
const app = express()
const PORT = 5000
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const upload = require('./src/middlewares/uploadFile')

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Query } = require('pg')
const sequelize = new Sequelize(config.development)

// Setup to call hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

// set static file server
app.use(express.static('src/assets'))
app.use(express.static('src/uploads'))

// parsing data from client
app.use(express.urlencoded({ extended: false }))

// Setup flash
app.use(flash())

// Setup session
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000*60*60*3
  },
  store: new session.MemoryStore(),
  saveUninitialized: true,
  resave: false,
  secret: 'rahmat123'
}))

//routing
app.get('/', home)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/blog-page/:id', blogPage) //url params
app.get('/delete-blog/:id', deleteBlog)
app.get('/add-blog', formBlog)
app.post('/add-blog', upload.single('imageblog'), addBlog)
app.get('/edit-blog/:id', formEdit)
app.post('/update-blog/:id', upload.single('imageblog'), updateBlog)
app.get('/register', register)
app.post('/reg-user', regUser)
app.get('/login', login)
app.post('/log-user', logUser)
app.get('/logout', logout)

app.listen(PORT, () => {
  console.log("Server running on port 5000");
})

async function home(req, res) {
  try {
    const query = `SELECT myblogs.id, title, description, duration, html, css, javascript, php, image, users.name AS author FROM myblogs LEFT JOIN users ON myblogs.author = users.id`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res,
      isLogin : req.session.isLogin
    }))
    console.log(data)
    res.render('index', {
      myblogs:data,
      isLogin: req.session.isLogin,
      user: req.session.user
    })

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
    const query = `SELECT myblogs.id, title, description, "startDate", "endDate", duration, html, css, javascript, php, image, users.name AS author FROM myblogs LEFT JOIN users ON myblogs.author = users.id WHERE myblogs.id=${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    const data = obj.map((res) => ({
      ...res
    }))
  
    res.render('blog-page', {
      blog:data[0],
      isLogin: req.session.isLogin,
      user: req.session.user
     })
  } catch (error) {
    console.log(error);
  }
}

function testimonial(req, res) {
  res.render('testimonial', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}
function contact(req, res) {
  res.render('contact', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}


function formBlog(req, res) {
  res.render('add-blog', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

async function addBlog(req, res) {
  try {
    let { title, startDate, endDate, description, html, css, javascript, php} = req.body
    const idUser = req.session.idUser
    const image = req.file.filename

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

    let query = `INSERT INTO myblogs (title, author, description, "startDate", "endDate", duration, html, css, javascript, php, image, "createdAt", "updatedAt") VALUES ('${title}', ${idUser}, '${description}', '${startDate}', '${endDate}', '${monthDuration}', '${html}', '${css}', '${javascript}', '${php}', '${image}', NOW(), NOW())`
  
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
  
    res.render('edit-blog', { 
      blog:data[0],
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateBlog(req, res){
  try {
    const { id } = req.params
    let { title, startDate, endDate, description, html, css, javascript, php } = req.body
    const image = req.file.filename
    const idUser = req.session.idUser

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

    let query = `UPDATE myblogs SET title='${title}', author=${idUser}, description='${description}', "startDate"='${startDate}', "endDate"='${endDate}', duration=${monthDuration}, html='${html}', css='${css}', javascript='${javascript}', php='${php}', image='${image}', "createdAt"=NOW(), "updatedAt"=NOW() WHERE id=${id}`
  
    await sequelize.query(query)
  
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

function register(req, res){
  res.render('register')
}

async function regUser(req, res){
  try {
    let { name, email, password } = req.body
    await bcrypt.hash(password, 10, (error, hashPassword) => {
      const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`
      sequelize.query(query)
    })
    res.redirect('login')
  } catch (error) {
    console.log(error)
  }
}

function login(req, res){
  res.render('login')
}

async function logUser(req, res){
  try {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE email='${email}'`
    let obj = await sequelize.query(query, { type:QueryTypes.SELECT })

    await bcrypt.compare(password, obj[0].password, (error, result) => {
      if (!result) {
        req.flash('danger', 'Password wrong')
        return res.redirect('/login')

      } else {
        req.session.isLogin = true
        req.session.idUser = obj[0].id
        req.session.user = obj[0].name
        req.flash('success', 'Login success')
        return res.redirect('/')
      }
    })

  } catch (error) {
    throw error
  }
}

function logout(req, res) {
  req.session.destroy()
  res.redirect('/')
}