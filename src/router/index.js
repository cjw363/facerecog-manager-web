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
    route('/register', '/Register', 'Register'),
    route('/web', '/Web', 'Web', [
      //device
      route('/device/device', '/device/Device', "Device", [
        route('/device/device_tbl', '/device/DeviceTbl', "DeviceTbl"),
        route('/device/device_detail', '/device/DeviceDetail', "DeviceDetail"),
        route('/device/device_inact_detail', '/device/DeviceInactDetail', "DeviceInactDetail"),
      ]),
      //person
      route('/person/person', '/person/Person', 'Person', [
        route('/person/person_tbl', '/person/PersonTbl', 'PersonTbl'),
        route('/person/person_add', '/person/PersonAdd', 'PersonAdd'),
        route('/person/person_detail', '/person/PersonDetail', 'PersonDetail'),
      ]),
      //group
      route('/group/group', '/group/Group', 'Group', [
        route('/group/group_tbl', '/group/GroupTbl', 'GroupTbl'),
        route('/group/group_detail', '/group/GroupDetail', 'GroupDetail'),
      ]),
      //grant
      route('/grant/grant', '/grant/Grant', 'Grant', []),
      //record
      route('/record/record', '/record/Record', 'Record', []),
      //attend
      route('/attend/Attend', '/attend/Attend', 'Attend', []),
    ])
  ]
})
