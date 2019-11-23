import { post, required } from '../lib/decorator';

const {
  controller,
  get,
  auth,
  admin,
  log
} = require('../lib/decorator');

@controller('/api/v1/log')
export class cityController {
  @get('/')
  @admin('admin')
  @log
  async getCityList(ctx, next){
    ctx.body = {
      status: 'success',
      result: 'v1'
    }
  }

  @post('/login')
  @required({
    body: ['email', 'password']
  })
  async login(ctx, next){
    const {email, password} = ctx.request.body;
    ctx.body = {
      status: 'success',
      result: `${email} + ${password}`
    }
  }
}