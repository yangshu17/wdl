export default (opt) => {
  const { name, query } = opt
  let url = `/${name}`
  if (query) {
    url += `?${Object.keys(query).map(_ => `${_}=${query[_]}`).join('&')}`
  }
  wx.navigateTo({ url })
}
