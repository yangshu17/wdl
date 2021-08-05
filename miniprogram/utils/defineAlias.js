export default function (spreadConfig) {
  const originalApp = App
  App = function (originConfig) {
    return originalApp({ ...originConfig,
      ...spreadConfig
    })
  }
  const originalPage = Page
  Page = function (originConfig) {
    return originalPage({ ...originConfig,
      ...spreadConfig
    })
  }
  Object.assign(wx, spreadConfig)
}
