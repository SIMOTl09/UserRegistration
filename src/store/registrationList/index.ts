
const store={

  state:{ 
    list: [
      {
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        phone: '18757562024',
        regist_time: 1681309658336
      },
      {
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
        phone: '18750564424',
        regist_time: 1681309688169
      },
      {
       
        name: '胡彦祖2',
        age: 22,
        address: '西湖区湖底公园1号',
        phone: '18757564545',
        regist_time: 1681309712184
      },
      {
        name: '胡彦祖3',
        age: 45,
        address: '西湖区湖底公园1号',
        phone: '18757568424',
        regist_time: 1681309714184
      },
      {
       
        name: '胡彦祖2',
        age: 22,
        address: '西湖区湖底公园1号',
        phone: '18757564524',
        regist_time: 1681309715184
      },
      {
        name: '胡彦祖3',
        age: 45,
        address: '西湖区湖底公园1号',
        phone: '18757268424',
        regist_time: 1681309716184
      },
      {
       
        name: '胡彦祖2',
        age: 22,
        address: '西湖区湖底公园1号',
        phone: '18767564523',
        regist_time: 1681309816184
      },
      {
        name: '胡彦祖3',
        age: 45,
        address: '西湖区湖底公园1号',
        phone: '19757568420',
        regist_time: 1681309719184
      },
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
    }
  },
  actionNames:{
    key: ''
  }
}

let actionNames = {
  key: ''
} 
// actionNames有多少对键值对，取决于action里面有多少个函数。所以遍历store.actions，给actionNames添加键值对
for(let key in store.actions){
  actionNames.key = key
}
store.actionNames = actionNames;

export default store
