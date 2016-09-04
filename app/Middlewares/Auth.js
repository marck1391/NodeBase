module.exports = (req, res, next)=>{
  if(req.session.loggedin||req.user){
    return next()
  }
  res.redirect('/login')
}
