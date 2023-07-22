const express = require('express')
const router = express.Router()
const Thermocouple = require('../models/thermocouple')
const { body, validationResult } = require('express-validator')

// GET all
router.get('/', async (req, res) => {
    try{
      const thermocouple = await Thermocouple.find()
      res.json(thermocouple)
    } catch (err) {
      res.status(500).json({message: err.message}) // client error
    }
})

// GET one
router.get('/:id', getThermStats, (req, res) => {
    res.json(res.thermocouple)
})

// CREATE -> one (POST/PUT)
router.post('/', async (req, res) => { // requests by ID

    const thermocouple = new Thermocouple({
        // body = json, thermSN property
        temp: req.body.temp,
        status: req.body.status,
        time: req.body.time,
        sp1_time: req.body.sp1_time,
        sp1_temp: req.body.sp1_temp,
        sp2_time: req.body.sp1_time,
        sp2_temp: req.body.sp1_temp,
        sp3_time: req.body.sp1_time,
        sp4_temp: req.body.sp1_temp
})

try {
  
  if (req.is('json')) {
    const thermocouple = new Thermocouple({
      temp: req.body.temp,
      status: req.body.status,
      time: req.body.time,
      sp1_time: req.body.sp1_time,
      sp1_temp: req.body.sp1_temp,
      sp2_time: req.body.sp1_time,
      sp2_temp: req.body.sp1_temp,
      sp3_time: req.body.sp1_time,
      sp4_temp: req.body.sp1_temp
    })

    const newSetting = await thermocouple.save();
    res.status(201).json(newSetting); // success
  } else {
    res.status(415).json({ error: 'Unsupported Media Type. Use proper JSON schema. ' })
  }
} catch (error) {
  res.status(400).json({ error: 'Invalid JSON data' })
}

})

// UPDATE one (not PUT, but for updates)
router.patch('/:id', getThermStats, async (req, res) => {

    if (req.body.temp != null) {
        res.thermocouple.temp = req.body.temp
    }

    if (req.body.status != null) {
        res.thermocouple.status = req.body.status
        
    }

    if (req.body.time != null) {
        res.thermocouple.time = req.body.time
        
    }
    if (req.body.sp1_time != null) {
      res.thermocouple.sp1_time = req.body.sp1_time
      
    }
    if (req.body.sp1_temp != null) {
      res.thermocouple.sp1_temp = req.body.sp1_temp
      
    }
    if (req.body.sp2_time != null) {
      res.thermocouple.sp2_time = req.body.sp2_time
      
    }
    if (req.body.sp2_temp != null) {
      res.thermocouple.sp2_temp = req.body.sp2_temp
      
    }
    if (req.body.sp3_time != null) {
      res.thermocouple.sp3_time = req.body.sp3_time
      
    }
    if (req.body.sp3_temp != null) {
      res.thermocouple.sp3_temp = req.body.sp3_temp
      
    }    

    try {
      if (req.is('json')) {
        if (req.body.temp != null) {
          res.thermocouple.temp = req.body.temp
        }
        if (req.body.status != null) {
          res.thermocouple.status = req.body.status
        }
        if (req.body.time != null) {
          res.thermocouple.time = req.body.time
          
        }
        if (req.body.sp1_time != null) {
          res.thermocouple.sp1_time = req.body.sp1_time
          
        }
        if (req.body.sp1_temp != null) {
          res.thermocouple.sp1_temp = req.body.sp1_temp
          
        }
        if (req.body.sp2_time != null) {
          res.thermocouple.sp2_time = req.body.sp2_time
          
        }
        if (req.body.sp2_temp != null) {
          res.thermocouple.sp2_temp = req.body.sp2_temp
          
        }
        if (req.body.sp3_time != null) {
          res.thermocouple.sp3_time = req.body.sp3_time
          
        }
        if (req.body.sp3_temp != null) {
          res.thermocouple.sp3_temp = req.body.sp3_temp
          
        }
  
        const updatedSettings = await res.thermocouple.save();
        res.json(updatedSettings);
      } else {
        res.status(415).json({ error: 'Unsupported Media Type' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
})

// DELETE one

router.delete('/:id', async (req, res) => {
    try {
      const removedSetting = await Thermocouple.findByIdAndRemove(req.params.id);
      if (!removedSetting) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.json({ message: 'Deleted settings' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

// Middleware Settings
async function getThermStats(req, res, next) {
  let thermocouple
  try {
    thermocouple = await Thermocouple.findById(req.params.id) // pass the id
    if (thermocouple == null) {
      return res.status(404).json({ message: 'Cannot find setting' }) // if not able to find
    
    }

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

    res.thermocouple = thermocouple
  next()
}


module.exports = router