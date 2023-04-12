
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
  message, 
  Table, 
  Button, 
  Divider, 
  Popconfirm, 
  Form,
  InputNumber
} from "antd"
import { useNavigate } from "react-router-dom"
import type { ColumnsType, TableProps } from 'antd/es/table';
import { phoneNuberConvert, deepClone, dateFormat } from "@/uitls/index"
import styles from './index.module.scss'

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  phone: string
}

const View = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
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
  const onSearch = ()=> {
    const values = form.getFieldsValue()
    const arr = list.filter((item: any) => item.age === values.age)
    setFilterList(arr)
  }

  // 搜索
  const onReset = ()=> {
    form.resetFields()
    setFilterList(deepClone(list))
  }

  // 编辑
  const onGoEditPage = (id: string )=> {
    navigateTo('/page2', { state: id })
  }

  // 注册
  const gotoRegis = ()=> {
    navigateTo('/page2')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
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
      title: '住址',
      dataIndex: 'address',
      key: 'address',
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
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text: any, record: any) => {

        return (
          <div>
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
      <div className={styles.regis_wrapper} >
        <Button type='primary' onClick={gotoRegis}>注册</Button>
      </div>
      <div className={styles.searchbar}>
        <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          labelAlign='left'
          form={form}
          className={styles.form}
        >
          <Form.Item
            label="年龄"
            name="age"
            style={{marginBottom: 0}}
          >
            <InputNumber  style={{width: 200}} max={100} min={1} />
          </Form.Item>
        </Form>

        <div className={styles.button_wrapper}>
          <Button type="primary" onClick={onSearch} style={{marginRight: 20}}>搜索</Button> 
          <Button onClick={onReset}>重置</Button> 
        </div>
      </div>
      <Table 
        dataSource={filterList} 
        columns={columns} 
        onChange={onChange} 
        pagination={pagination} 
        rowKey={(record)=> record.phone}
      />
    </div>
  )
}

export default View