
import { useSelector, useDispatch } from "react-redux"

const View = () => {

  const dispatch = useDispatch();

  // 通过useSelector获取仓库数据
  const { list } = useSelector((state:RootState)=>({
    list: state.listStore.list
  }))

  const onClickCheck = ()=> {
    dispatch({ type:"add", val:{
      name: 'ttt',
      age: 18
    } }) 
  }

  return(
    <div className='home'>
        <p>这是Page1页面内容</p>
        <ul>
          {
            list.map(item => {
              return (
                <li>
                  {item.name}
                </li>
              )
            })
          }
        </ul>
        <button onClick={onClickCheck}>点击发送</button>
    </div>
  )
}

export default View