
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
  message, 
  Table, 
  Button, 
  Divider, 
  Select, 
  Form,
  Input,
  InputNumber
} from "antd"
import { useLocation, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { phoneNuberConvert, deepClone, debounce } from "@/uitls/index"
import styles from './index.module.scss'

interface DataType {
  name: string;
  sex: string;
  age: number;
  address: string;
  phone: string;
  remark: string;
}

const View = () => {

  const [form] = Form.useForm();
  const currentLocation = useLocation();
  // 通过useSelector获取仓库数据
  const { list } = useSelector((state:RootState)=>({
    list: state.listStore.list
  }))

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  
  useEffect(()=> {
    const { state } = currentLocation;
    if(state) {
      const data = list.find((item: DataType) => item.phone === state)
      form.setFieldsValue(data)
    } 
  })

  return(
    <div className={styles.wrapper}>
      <div className={styles.title}>用户详细信息</div>
      <Form
          form={form}
          {...layout}
          name="nest-mesges"
          disabled
        >
          <Form.Item name='name' label="姓名" rules={[{ required: true, message: '输入正确的值' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name='sex' label="性别" rules={[{ required: true, message: '请选择性别' }]}>
            <Select
              options={[
                { value: '男', label: '男' },
                { value: '女', label: '女' },
              ]}
            />
          </Form.Item>
          <Form.Item name='phone' label="手机号" rules={[{ required: true, pattern: /^1[34578]\d{9}$/g, message: '请输入正确的手机号码' }]}>
            <Input maxLength={11}  placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item name='password' label="密码" rules={[{ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/, message: '密码必须包括数字、字母、特殊字符' }]}>
            <Input  placeholder='请输入密码' />
          </Form.Item>
          <Form.Item name='age' label="年龄" rules={[{ required: true, type: 'number', min: 18, max: 70, message: '年龄限制18～70' }]}>
            <InputNumber placeholder='请输入' />
          </Form.Item>
          <Form.Item name='address' label="地址">
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name='remark' label="备注">
            <Input.TextArea placeholder='请输入' />
          </Form.Item>
        </Form>
    </div>
  )
}

export default View