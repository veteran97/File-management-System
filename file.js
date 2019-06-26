const express = require('express');
const router = express.Router();

const File = require('../models/file');
const Department = require('../models/department');

router.post('/add',ensureAuthenticated,(req,res)=>{
	//console.log(req.body);
	var newFile = File();
	newFile.name = req.body.name;
	newFile.type = req.body.type;
	newFile.details = req.body.details;
	newFile.createdBy = req.body.createdBy;
	newFile.createdOn = new Date(req.body.createdOn).getTime();
	newFile.save();
	res.redirect('/user/home');
})

router.get('/delete/:fileId',ensureAuthenticated,(req,res)=>{
	File.remove({_id:req.params.fileId},(err)=>{
		if(err)
      		throw err;
    	req.flash('success_msg', 'File Succesfully Deleted');
    	res.redirect('/user/home');
	});
})

router.get('/edit/:fileId',ensureAuthenticated,(req,res)=>{
	File.findOne({_id:req.params.fileId},(err,file)=>{
		if(err) throw err;
		Department.find({},(err,departments)=>{
			if(err) throw err;
			res.render('file',{movement:file.movement,file:file,departments:departments});
		})
	});
})

router.post('/update/:fileId',ensureAuthenticated,(req,res)=>{
	//console.log(req.body);
	const movedon = new Date(req.body.movedOn).getTime();
	//console.log(movedon);
	File.findOneAndUpdate(
		{_id:req.params.fileId},
		{$push:{movement:{from:req.body.from,to:req.body.to,movedOn:movedon,remark:req.body.remark}}},
		(err,file)=>{
			if(err)
				throw(err);
			else
				res.redirect(`/file/edit/${req.params.fileId}`)
		});
})

router.get('/delete/:fileId/:moveId',ensureAuthenticated,(req,res)=>{
	File.findOne({_id:req.params.fileId},(err,file)=>{
		if(err) throw err;
		File.update({_id:req.params.fileId},
								{$pull:{movement:{_id:req.params.moveId}}},
								(err,file)=>{
									if(err) throw err;
									res.redirect(`/file/edit/${req.params.fileId}`);
								});
	})
});

router.get('/report1',ensureAuthenticated,(req,res)=>{
	res.render('report1',{movement:[]});
});

router.post('/report1',ensureAuthenticated,(req,res)=>{
	var from = new Date(req.body.from).getTime();
	var to = new Date(req.body.to).getTime();
	File.find({},(err,files)=>{
		if(err) throw err;
		var arr = [];
		for(var i=0;i<files.length;i++)
		{
			//console.log(files[i]._id);
			for(var j=0;j<files[i].movement.length;j++)
			{
					var ti = files[i].movement[j].movedOn;
					if(ti>=from && ti <=to)
					{
						//console.log(ti);
						arr.push({
							fileId:files[i].fileId,
							from:files[i].movement[j].from,
							to:files[i].movement[j].to,
							movedOn:files[i].movement[j].movedOn,
							remark:files[i].movement[j].remark
						});
					}
			}
		}
		res.render('report11',{movement:arr,from:from,to:to});
	});
})

router.get('/report2',ensureAuthenticated,(req,res)=>{
	Department.find({},(err,departments)=>{
		if(err) throw err;
		res.render('report2',{files:[],departments:departments});
	})
})

router.post('/report2',ensureAuthenticated,(req,res)=>{
	//console.log(req.body);
	File.find({"createdBy":req.body.department},(err,files)=>{
		if(err) throw err;
		Department.find({},(err,departments)=>{
			if(err) throw err;
			res.render('report22',{files:files,department:req.body.department});
		})
	});
})

router.get('/report3',ensureAuthenticated,(req,res)=>{
	File.find({},(err,files)=>{
		if(err) throw err;
		res.render('report3',{files:files});
	})
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login');
  }
}

module.exports = router;
