const express = require('express')
const router = express.Router()
const clubs = require('../db/clubs')

router.post('/recordgame', (req, res) => {
  const { clubhomename, clubawayname, score } = req.body

  if (typeof clubhomename !== 'string') {
    res.status(400)
    res.json({
      message: 'Field clubhomename cannot be empty'
    })
    return
  }

  if (clubhomename === '') {
    res.status(400)
    res.json({
      message: 'Field clubhomename cannot be empty'
    })
    return
  }

  if (typeof clubawayname !== 'string') {
    res.status(400)
    res.json({
      message: 'Field clubawayname cannot be empty'
    })
    return
  }

  if (clubawayname === '') {
    res.status(400)
    res.json({
      message: 'Field clubawayname cannot be empty'
    })
    return
  }

  if (typeof score !== 'string') {
    res.status(400)
    res.json({
      message: "Field score cannot be empty"
    })
    return
  }

  if (score === '') {
    res.status(400)
    res.json({
      message: 'Field score cannot be empty'
    })
    return
  }

  const scores = score.split(' ')

  if (scores.length != 3) {
    res.status(400)
    res.json({
      message: 'Invalid Score Format'
    })
    return
  }

  const home = {
    clubname: clubhomename,
    points: 0
  }

  const away = {
    clubname: clubawayname,
    points: 0
  }

  const scoreHome = parseInt(scores[0], 10)
  const scoreaway = parseInt(scores[2], 10)

  if (scoreHome == scoreaway) {
    home.points += 1
    away.points += 1
  } else if (scoreHome > scoreaway) {
    home.points += 3
  } else {
    away.points += 3
  }

  const clubChecker = (club) => {
    const index = clubs.findIndex((c) => c.clubname === club.clubname)

    if (index !== -1) {
      const filteredClubs = clubs.filter((c) => c.clubname === club.clubname)[0]

      const points = club.points + filteredClubs.points

      clubs[index] = {
        ...clubs[index],
        points
      }
    } else {
      clubs.push(club)
    }
  }

  clubChecker(home)
  clubChecker(away)

  res.status(201)
  res.json({
    message: 'Record Game Success'
  })
})

router.get('/leaguestanding', (req, res) => {
  clubs.sort((a, b) => b.points - a.points)

  res.json(clubs)
})

router.get('/rank', (req, res) => {
  const clubname = req.query.clubname

  res.json(
    clubs.sort((a, b) => b.points - a.points).filter((c) => c.clubname === `${clubname}`)
  )
})

module.exports = router