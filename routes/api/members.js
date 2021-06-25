const express= require('express')
const router= express.Router();
const uuid= require('uuid')
const members=require('../../Members')
//Get All Member API fetch
router.get('/', (req,res)=>{
    res.json(members);
});

//Get single member API fetch
router.get('/:id',(req,res)=>{
    //res.send(req.params.id);
    const found= members.some(member => member.id===parseInt(req.params.id));  //some() will check if any element of array passes a test

    if(found){
        res.json(members.filter(member=>member.id===parseInt(req.params.id)));  //It will filter members arrya based on condn 
    }else{
        res.status(400).json({msg:`Member Not Found on id:${req.params.id}`})
    }

});

//Create new member

router.post('/', (req,res)=>{
    const newMember={
        id: uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
     }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please enter mail and name'})
    }
    members.push(newMember);
    //res.json(members)  //It will show the list of object
    res.redirect('/')
});


//Update Member
router.put('/:id',(req,res)=>{
    const found = members.some(member=> member.id===parseInt(req.params.id));
    if(found){
        const updMember=req.body;
        members.forEach(member=>
            {
                if(member.id===parseInt(req.params.id)){
                    member.name=updMember.name ? updMember.name : member.name
                    member.email=updMember.email ? updMember.email : member.email
                    res.json({msg:'Mmber Updated!'})
                }
            }
        )}
    else{
        res.status(400).json({msg:'Record Not Found!'})
    }
    res.json(members)
});

//Delete Member
router.delete('/:id',(req,res)=>{
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        res.json({
            msg:'Deleted!!!', members: members.filter(member=> member.id!==parseInt(req.params.id))})
    }
    else{
        res.status(400).json({msg:'Not found!'})
    }
})

module.exports=router