
const store={

  state:{ 
    list: [
      {
        name: '周深',
        age: 32,
        address: '北京市朝阳区',
        phone: '18757562024',
        regist_time: 1681309658336
      },
      {
        name: '胡歌',
        age: 42,
        address: '杭州市西湖区',
        phone: '18750564424',
        regist_time: 1681309688169
      },
      {
       
        name: '言承旭',
        age: 22,
        address: '上海市',
        phone: '18757564545',
        regist_time: 1681309712184
      }
    ]
  },

  // 只放同步的方法
  actions:{  
    newAdd(newState:{ list: any[] }, action:{ type:string, val: any }){
      const value = action.val
      console.log(value, '--val--')
      newState.list.push(value)
    },
    delete(newState:{ list: any[] }, action:{ type:string, val: string }){
      const id = action.val
      const arr = newState.list.filter(item => item.phone !== id)
      newState.list = arr
    },
    edit(newState:{ list: any[] }, action:{ type:string, val: any }){
      const arr = newState.list.map(item => {
        if (item.phone === action.val.phone) {
          return {
            ...item,
            ...action.val
          }
        }
        return item
      })
      newState.list = arr
    }
  },
  actionNames:{}
}

let actionNames = {} 
// actionNames有多少对键值对，取决于action里面有多少个函数。所以遍历store.actions，给actionNames添加键值对
for(let key in store.actions){
  actionNames[key] = key
}
store.actionNames = actionNames;

export default store
