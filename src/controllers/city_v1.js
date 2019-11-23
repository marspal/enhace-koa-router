const {
  controller,
  get,
  auth,
  admin
} = require('../lib/decorator');

@controller('/api/v1/city')
export class cityController {
  @get('/list')
  @auth
  @admin('user')
  async getCityList(ctx, next){
    ctx.body = {
      status: 'success',
      result: 'v1'
    }
  }
}