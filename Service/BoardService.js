const Board = require('../model').Board;

const getBoardList = async (pageNum, offset) => {
  return Board.findAll({
    include: [
      {
        model : Board,
        attributes : [ 'displayName' ],
      },
    ],
    where : {

    },
  
    attributes: [
      'idx', 'title', 'createdAt', 'displayName'
    ],
  })
} 