"use strict"

const { Sequelize, Model } = require("sequelize")

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      author: {
        type: Sequelize.STRING,
        validate: {
          notNull: true,
        },
      },
      genre: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
    }
  )

  return Book
}
