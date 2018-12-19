module.exports  = function (req, res, ok) {
	if(req.session.athenticated){
		res.locals.flash ={}
		if (!res.locals.flash) return ok();

		res.locals.flash = _.clone(req.session.flash);

		req.session.flash = {};
		return ok();
    }

    var requireLoginError = [{message:'Debes registrarte'}]
    req.session.flash={
    	 err: requireLoginError
    }
    res.redirect('/');
    return;
}
