/**
 * 后台接口入口
 */
import blogApi from './blog'
import todoApi from './todo'

export default {
  ...blogApi,
  ...todoApi
}
