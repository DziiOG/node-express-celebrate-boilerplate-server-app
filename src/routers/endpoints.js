/**
 * @summary
 * This modules represents the endpoints construct for admin related API request.
 * All middlewares required for each endpoint methods are resgistered here
 * @author Chinedu Ekene Okpala <chinedu.okpala@completefarmer.com>
 */

module.exports.name = 'endpoints'
module.exports.dependencies = [
  'AnyController',
  'AnyValidations',
  'MiscValidations',
  'Cache',
  'Uploader',
  'access',
  'miscHelper'
]
module.exports.factory = (
  AnyController,
  AnyValidations,
  Cache,
  uploader,
  hasAccess,
  helper
) => {
  const { BUYER, ADMIN, OPERATION } = helper.Roles

  /**
   * @param { string } route defination
   * @param { Array<'post' || 'get'|| 'patch'|| 'put' || 'delete' >} methods allowed on a route
   * @param { bool } guard toggle for authentication
   * @param { { post: Array<Function>, get: Array<Function>, patch: Array<Function>, put: Array<Function>, delete: Array<Function> } } middlewares request handlers
   */

  return [
    // #region ANY ROUTE
    {
      route: 'anys',
      methods: ['post', 'get'],
      guard: true,
      middlewares: {
        post: [hasAccess([ADMIN, OPERATION]), AnyValidations.post, AnyController.insert],
        get: [
          hasAccess([ADMIN, OPERATION]),
          AnyValidations.querySearch,
          AnyController.get
        ]
      }
    },
    {
      route: 'anys/:id',
      methods: ['patch', 'get', 'delete'],
      guard: true,
      middlewares: {
        patch: [
          hasAccess([ADMIN, OPERATION]),
          MiscValidations.id,
          AnyValidations.patch,
          AnyController.update
        ],
        get: [hasAccess([ADMIN, OPERATION]), MiscValidations.id, AnyController.getById],
        delete: [hasAccess([ADMIN, OPERATION]), MiscValidations.id, AnyController.delete]
      }
    },
    // #endregion
  ]
}
