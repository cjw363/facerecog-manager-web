import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function route(path, file, name, children) {
  return {
    path,
    name,
    children,
    component: () => import('@/pages' + file)
  }
}

export default new Router({
  routes: [
    {// 默认重定向
      path: '/',
      redirect: '/login'
    },
    route('/login', '/Login', 'Login'),
    route('/web', '/Web', 'Web', [
      route('/device/device', '/device/Device', "Device", [
        route('/device/device_tbl', '/device/DeviceTbl', "DeviceTbl"),
        route('/device/device_detail', '/device/DeviceDetail', "DeviceDetail"),
        route('/device/device_inact_detail', '/device/DeviceInactDetail', "DeviceInactDetail"),
      ]),
    ])
  ]
})
