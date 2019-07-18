const menuData = {
  "entity": null,
  "childs": [
    {
      "entity": {
        "id": 1,
        "parentMenuId": 0,
        "name": "Device-Manage",
        "icon": "el-icon-mobile-phone",
        "alias": "设备管理",
        "state": "ENABLE",
        "value": "/device/device",
        "type": "LINK",
      },
      "childs": null
    },
    {
      "entity": {
        "id": 2,
        "parentMenuId": 0,
        "name": "Person-Manage",
        "icon": "el-icon-service",
        "alias": "人员管理",
        "state": "ENABLE",
        "value": null,
        "type": "NONE",
      },
      "childs": [
        {
          "entity": {
            "id": 20,
            "parentMenuId": 2,
            "name": "Person-List",
            "icon": "el-icon-phone-outline",
            "alias": "人员列表",
            "state": "ENABLE",
            "value": "person/person",
            "type": "LINK",
          },
          "childs": null
        },
        {
          "entity": {
            "id": 21,
            "parentMenuId": 2,
            "name": "Batch-Upload",
            "icon": "el-icon-picture",
            "alias": "批量上传",
            "state": "ENABLE",
            "value": "person/person_batch_upload",
            "type": "LINK",
          },
          "childs": null
        }
      ]
    },
    {
      "entity": {
        "id": 3,
        "parentMenuId": 0,
        "name": "Grant-Manage",
        "icon": "el-icon-printer",
        "alias": "权限管理",
        "state": "ENABLE",
        "value": "grant/grant",
        "type": "LINK",
      },
      "childs": null
    },
    {
      "entity": {
        "id": 4,
        "parentMenuId": 0,
        "name": "Group-Manage",
        "icon": "el-icon-menu",
        "alias": "分组管理",
        "state": "ENABLE",
        "value": "group/group",
        "type": "LINK",
      },
      "childs": null
    },
    {
      "entity": {
        "id": 5,
        "parentMenuId": 0,
        "name": "Record-Manage",
        "icon": "el-icon-document",
        "alias": "记录管理",
        "state": "ENABLE",
        "value": "record/record",
        "type": "LINK",
      },
      "childs": null
    },
    {
      "entity": {
        "id": 6,
        "parentMenuId": 0,
        "name": "Attend-Manage",
        "icon": "el-icon-bell",
        "alias": "考勤管理",
        "state": "ENABLE",
        "value": "attend/attend",
        "type": "LINK",
      },
      "childs": null
    }
  ]
}
export {menuData}
