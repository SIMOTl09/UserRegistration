import listStore from "./index"

// 就是来管理数据的
let reducer = (state = {...listStore.state}, action:{ type:string })=>{
  // 调用dispatch执行这里的的代码
    let newState = JSON.parse(JSON.stringify(state))
    
    // 拿着action.type和actionNames进行每一项的对比，如果是相等，就调用 模块名.actions[下标](newState,action)
    for(let key in listStore.actionNames){
      // key是每一个键
      // 判断是不是相等
      // if(action.type==="add1"){
      if(action.type === listStore.actionNames[key]){
        listStore.actions[listStore.actionNames[key]](newState,action);
        break;
      }
    }
    // 这样写就达到每一次写一个方法都不需要再手动来添加这几case，终于可以解放双手了！
    return newState
}
export default reducer