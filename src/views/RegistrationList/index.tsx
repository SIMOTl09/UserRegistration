
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { 
  message, 
  Table, 
  Button, 
  Divider, 
  Popconfirm, 
  Form,
  InputNumber
} from "antd";
import Search from "@/components/SearchForm";
import FormModal from "@/components/FormModal";
import { useNavigate } from "react-router-dom";
import type { ColumnsType, TableProps } from 'antd/es/table';
import { phoneNuberConvert, deepClone, dateFormat } from "@/uitls/index";

import styles from './index.module.scss'

interface DataType {
  key: React.Key;
  sex: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  remark: string
}

interface SearchType {
  name: string;
  phone: string
}

const View = () => {
  const dispatch = useDispatch();
  const [visible, setVisiable] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [recordId, setRecordId] = useState('');
  const navigateTo = useNavigate();

  // 通过useSelector获取仓库数据
  const { list } = useSelector((state:RootState)=>({
    list: state.listStore.list
  }))
  const [filterList, setFilterList] = useState(deepClone(list))

  const onDeleteRecord = ( id: string )=> {
    dispatch({ type:"delete", val: id }) 
    message.success('删除成功');
  }

  useEffect(()=> {
    setFilterList(deepClone(list).sort((a: { regist_time: number; }, b: { regist_time: number; }) => b.regist_time - a.regist_time))
  }, [list])

  // 搜索
  const onSearch = (values: SearchType)=> {
    const { name, phone } = values;
    if (!name && !phone) return;
    let filterData = filterList;
    for (let key in values) {
      if (values[key]) {
        filterData = filterData.filter((item: any) =>
          (item[key]).includes(values[key])
        );
      }
    }
    setFilterList(filterData)
  }

  const onCancel = ()=> {
    setVisiable(false)
    setIsEdit(false)
  }

  const onShow = ()=> {
    setVisiable(true)
  }

  // 搜索
  const onReset = ()=> {
    setFilterList(deepClone(list).sort((a: { regist_time: number; }, b: { regist_time: number; }) => b.regist_time - a.regist_time))
  }

  // 编辑
  const onGoEditPage = (id: string )=> {
    setIsEdit(true)
    setRecordId(id)
    onShow()
  }

  // 编辑
  const onGoDetailPage = (id: string )=> {
    navigateTo('/page2', { state: id })
  }

  // 注册
  const gotoRegis = ()=> {
    onShow()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: (text: any) => {
        return (
          <span>
            {phoneNuberConvert(text)}
          </span>
        )
      }
    },
    {
      title: '注册时间',
      dataIndex: 'regist_time',
      key: 'regist_time',
      render: (text: any) => {
        return (
          <span>{ dateFormat(text) }</span>
        )
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text: any, record: any) => {

        return (
          <div>
            <a onClick={()=> {
              onGoDetailPage(record.phone)
            }}>详细信息</a>
            <Divider type="vertical" />
            <a onClick={()=> {
              onGoEditPage(record.phone)
            }}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="您确定要删除此条任务吗"
              description=""
              onConfirm={(e)=>{
                onDeleteRecord(record.phone)
              }}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const pagination = {
    pageSize: 6,
    showQuickJumper: true,
  }
  
  return(
    <div className={styles.home}>
      <Search onReset={onReset} onSearch={onSearch}/>
      <div className={styles.table_title}><Button type='primary' onClick={gotoRegis}>注册</Button></div>
      <Table 
        dataSource={filterList} 
        columns={columns} 
        onChange={onChange} 
        pagination={pagination} 
        rowKey={(record)=> record.phone}
      />
      <FormModal visible={visible} cancel={onCancel} isEdit={isEdit} id={recordId} />
    </div>
  )
}

export default View