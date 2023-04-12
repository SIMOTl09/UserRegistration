const store={

  state:{ 
    list: []
  },

  actions:{  // 只放同步的方法
    add(newState:{ list: any[] }, action:{ type:string, val: any }){
      const value = action.val
      newState.list.push(value)
    },
   
  },
  actionNames:{}
}
// 我们现在想做到actionNames自动生成。不用我每一次添加一个方法，都要在actionNames手动添加键值对，这样很麻烦。
let actionNames = {} // 定义一个全局的actionNames
// actionNames有多少对键值对，取决于action里面有多少个函数。所以遍历store.actions，给actionNames添加键值对
for(let key in store.actions){
  actionNames[key] = key
}
store.actionNames = actionNames;

export default store
