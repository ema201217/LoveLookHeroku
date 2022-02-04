module.exports = (req,res,next)=>{
    if(req.session.user && req.session.user.rol === 3){
        next()
    }else{
        res.redirect('/admin/products')
    }
}