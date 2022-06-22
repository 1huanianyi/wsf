//搜索

const search = (key) => {
  let response = GET(`https://souxs.pigqq.com/search.aspx?key=${encodeURI(key)}&page=1&siteid=app2`)
  let array = []
  let $ = JSON.parse(response)
  $.data.forEach((child) => {
    array.push({
      name: child.Name,
      author: child.Author,
      cover: child.Img,
      detail: `https://infosxs.pigqq.com/BookFiles/Html/${parseInt(child.Id/1000) + 1}/${child.Id}/info.html`
    })
  })
  return JSON.stringify(array)
}

//详情

const detail = (url) => {
  let response = GET(url)
  let $ = JSON.parse(response).data
  let book = {
    summary: $.Desc,
    status: $.BookStatus,
    category: $.CName,
    update: $.LastTime,
    lastChapter: $.LastChapter,
    catalog: `${parseInt($.Id/1000) + 1}/${$.Id}`
  }
  return JSON.stringify(book)
}

//目录

const catalog = (url) => {
  let response = GET(`https://infosxs.pigqq.com/BookFiles/Html/${url}/index.html`).replaceAll("},]","}]")
  let $ = JSON.parse(response)
  let array = []
  $.data.list.forEach((booklet) =>
