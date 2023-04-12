
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
  message, 
  Table, 
  Button, 
  Divider, 
  Popconfirm, 
  Form,
  Input,
  InputNumber
} from "antd"
import { useLocation, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { phoneNuberConvert, deepClone, debounce } from "@/uitls/index"
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
  const navigateTo = useNavigate();
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false)
  // 通过useSelector获取仓库数据
  const { list } = useSelector((state:RootState)=>({
    list: state.listStore.list
  }))

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  // 提交
  const onFinish = debounce((values: any) => {
    if(isEdit) {
      dispatch({ type:"edit", val: values }) 
      message.success('编辑成功');
      navigateTo('/page1')
    } else {
      if(list.find((item: DataType) => item.phone === values.phone) ) {
        message.error('您的手机号已经被注册')
      } else {
        const time = new Date().getTime()
        const params = {
          ...values,
          regist_time: time
        }
        dispatch({ type:"newAdd", val: params }) 
        message.success('注册成功');
        navigateTo('/page1')
      }
    }
  }, 500);

  useEffect(()=> {
    const { state } = currentLocation;
    if(state) {
      setIsEdit(true)
      const data = list.find((item: DataType) => item.phone === state)
      form.setFieldsValue(data)
    } else {
      setIsEdit(false)
    }
  })

  return(
    <div className={styles.wrapper}>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name='name' label="姓名" rules={[{ required: true, message: '输入正确的值' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='phone' label="手机号" rules={[{ required: true, pattern: /^1[34578]\d{9}$/g, message: '输入正确的值' }]}>
          <Input maxLength={11} disabled={isEdit} />
        </Form.Item>
        <Form.Item name='age' label="年龄" rules={[{ required: true, type: 'number', min: 0, max: 99, message: '输入正确的值' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name='address' label="地址">
          <Input />
        </Form.Item>
        <Form.Item name='remark' label="备注">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              { isEdit ? "编辑" : "提交"}
            </Button> 
        </Form.Item>
      </Form>
    </div>
  )
}

export default View