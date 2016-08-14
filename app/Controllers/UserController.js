var bcrypt = require('bcrypt')
var async = require('async')

module.exports = {
  index: (req, res)=>{
    res.render('Auth/login')
  },
  login: (req, res, end)=>{
    var name = req.body.user
    var pass = req.body.pass
    if(!name||!pass)
      throw new Error('User name and password can\'t be empty')

    User.findOne({name: name}, (err, user)=>{
      if(err)
        res.json(new Error('Unexpected error'))
      else if(user==null||!bcrypt.compareSync(pass, user.password))
        return end(new Error('Wrong user or password'))

      req.session.loggedin = true
      req.session.user = user
      res.json({success: true})
    })
  },
  signup: (req, res)=>{
    var name = req.body.user
    var pass = req.body.pass
    var cpass = req.body.cpass
    var email = req.body.email

    if(!name||!pass||!cpass||!email)
      throw new Error('Please fill the required fields')
    if(pass!=cpass)
      throw new Error('Passwords doesn\'t match')

    User.findOne({name: name}, (err, user)=>{
      if(err)
        return end(new Error(err?'Unexpected error':(user!=null?'User already exists':null)))

      var user = new User()
      user.name = name
      user.password = bcrypt.hashSync(pass, 10)
      user.email = email
      user.status = 0
      user.save((err)=>{
        if(err)
          return end(new Error('Can\'t register user, please try again later'))
        res.json({success: true})
        /*
        jsonp callback
        res.format
        res.redirect
        */
      })
    })
  },
  register: (req, res)=>{
    res.render('Auth/register')
  },
  logout: (req, res)=>{
    req.session.destroy(function(err){
      res.redirect('/login')
    })
  }
}