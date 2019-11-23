import { admin } from '../lib/decorator';

const {
  controller,
  get,
  auth
} = require('../lib/decorator');

@controller('/api/v3/city')
export class cityController {
  @get('/list')
  @admin('admin')
  async getCityList(ctx, next){
    ctx.body = {
      status: 'success',
      result: 'v3'
    }
  }
}