const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { first_word, last_word } = req.body

  res.json({
    containing: last_word.includes(first_word)
  })
})

module.exports = router