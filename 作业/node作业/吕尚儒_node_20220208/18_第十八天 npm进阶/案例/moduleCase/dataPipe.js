const { fs, path } = require('./httpRequire')
const dataPath = path.join(process.cwd(), '/data')
const DATA_MAP = {
  dbmovie: '/dbMovie.json'
}

function getMovieData (start, count, callback) {
  let dbPath = path.join(dataPath, DATA_MAP['dbmovie'])

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    let dataArr = JSON.parse(data)
    let end = (start * 1) + (count * 1);
    console.log(`返回${start} - ${end} 合计: ${count}条数据 `);
    let newDataArr = dataArr.slice(start, end);
    callback && callback(newDataArr);
  })
}

module.exports = {
  getMovieData
}