module.exports = {
  index: (req, res)=>{
    res.render('Auth/login')
  },
  login: (req, res)=>{
    var name = req.body.user
    var pass = req.body.pass

    if(name==''||pass=='')
    return res.json({success: false, error: 'User name and password can\'t be empty'})

    User.findOne({name: name}, (err, user)=>{
      var error
      if(err){
        error = 'Unexpected error'
      }else if(user==null||pass!=user.password){
        error = 'Wrong user or password'
      }else{
        req.session.loggedin = true
        req.session.user = user
      }
      res.json({success: !error, error: error})
    })
  },
  signup: (req, res)=>{
    console.log('asdasdasd')
    var name = req.body.user
    var pass = req.body.pass
    var cpass = req.body.cpass
    var email = req.body.email

    if(!name||!pass||!cpass||!email)
      return res.json({success: false, error: 'Please fill the required fields'})
    if(pass!=cpass)
      return res.json({success: false, error: 'Passwords doesn\'t match'})

    User.findOne({name: name}, (err, user)=>{
      var error = err?'Unexpected error':(user!=null?'User already exists':null)

      if(error) return res.json({success: !error, error: error})

      var user = new User()
      user.name = name
      user.password = pass
      user.email = email
      user.status = 0
      user.save((err)=>{
        if(err){
          error = 'Can\'t register user, please try later'
        }
        res.json({success: !error, error: error})
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
