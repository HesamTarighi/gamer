function GetCookie(req, name) {
  // const cookies = req.headers.cookie.split(' ');
  // cookies.map((cookie) => {
  //   cookies.push({name: cookie.split(';')[0].split('=')[0], value: cookie.split(';')[0].split('=')[1]})
  // })

  // return cookies.find((cookie) => {
  //   const filter = cookie.name == name;
  //   return filter
  // }).value
}

module.exports = {
  GetCookie
}
