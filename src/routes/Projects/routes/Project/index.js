export default store => ({
  path: ':projectname',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Project = require('./components/ProjectPage').default

        /*  Return getComponent   */
        cb(null, Project)

        /* Webpack named bundle   */
      },
      'Project'
    )
  },

/*   getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        require('./routes/settings').default(store)
      ])
    })
  } */
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Settings = require('./routes/settings').default

      /*  Return getComponent   */
      cb(null, [Settings(store)])
    })
  }
})
