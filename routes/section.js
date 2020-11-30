const express = require('express');
const router = express.Router();
const db = require('../models')



// Create Section
// URL: /api/v1/section/:section_id
router.put('/:section_id', (req,res) => {
  const {user_id} = req.body
  const {section_id} = req.params


  if (!section_id) {
    res.status(404).json({error: 'Enter section number'})
  }

  db.Section.update({
    where:{
      id: section_id
    }
  },{
    UserId: user_id
  })
  .then((result) => {
    res.json({success: 'Section number updated'})
  })
  .catch(err => console.log(err))

})


// Delete Section based on ID
// URL: /api/v1/section/:section_id
router.delete('/:section_id', (req,res)=>{
  const {section_id} = req.params

  db.Guest.destroy({
    where: {
      id: section_id,
    }
  })
  .then(deleted => {
    if(deleted === 1) {
      res.status(202).json({
        success: 'Section deleted'
      })
    }
    else {
      res.status(404).json({
        error: 'Section not found'
      })
    }
  })
})



module.exports = router;