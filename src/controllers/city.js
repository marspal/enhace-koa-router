const {
  controller,
  get
} = require('../lib/decorator');

@controller('/api/v0/city')
export class cityController {
  @get('/list')
  async getCityList(ctx, next){
    ctx.body = {
      status: 'success'
    }
  }
}