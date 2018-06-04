/**
 * 后台接口入口
 */
import blogApi from './blog'
import todoApi from './todo'
import external from './external'
import admin from './admin'

export default {
  ...blogApi,
  ...todoApi,
  ...external,
  ...admin
}
