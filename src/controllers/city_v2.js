const {
  controller,
  get,
  auth
} = require('../lib/decorator');

@controller('/api/v2/city')
export class cityController {
  @get('/list')
  async getCityList(ctx, next){
    ctx.body = {
      status: 'success',
      result: 'v2'
    }
  }
}