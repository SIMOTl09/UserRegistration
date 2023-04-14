
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { 
  message,  
  Button, 
  Select,
  Form,
  Input,
  InputNumber,
  Modal
} from "antd"
import { useLocation, useNavigate} from 'react-router-dom'
import { debounce } from "@/uitls/index"
import styles from './index.module.scss'

interface DataType {
  name: string;
  sex: string;
  age: number;
  address: string;
  phone: string;
  remark: string;
}

interface PropsType {
  visible: boolean;
  isEdit: boolean;
  id?: string;
  cancel: ()=> void;
}


const Comp = (props: PropsType) => {
  const { visible, isEdit, cancel} = props;
  const [form] = Form.useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // 通过useSelector获取仓库数据
  const { list } = useSelector((state:RootState)=>({
    list: state.listStore.list
  }))

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  
  // 提交
  const onFinish = debounce(() => {
    const values = form.getFieldsValue();
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
    cancel()
  }, 500);

  useEffect(()=> {
    const { isEdit, id } = props;
    form.resetFields();
    if(isEdit) {
      const data = list.find((item: DataType) => item.phone === id)
      form.setFieldsValue(data)
    }
  })

  return(
    <Modal 
      title={isEdit ? '编辑' : '注册'} 
      open={visible} 
      onOk={onFinish} 
      onCancel={cancel}
      cancelText="取消"
      okText="确定"
      destroyOnClose
      centered
      forceRender
    >
      <div className={styles.wrapper}>
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <Form.Item name='name' label="姓名" rules={[{ required: true, message: '输入正确的值' }]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item name='sex' label="性别" rules={[{ required: true, message: '请选择性别' }]}>
            <Select
              disabled={isEdit}
              options={[
                { value: '男', label: '男' },
                { value: '女', label: '女' },
              ]}
            />
          </Form.Item>
          <Form.Item name='phone' label="手机号" rules={[{ required: true, pattern: /^1[34578]\d{9}$/g, message: '请输入正确的手机号码' }]}>
            <Input maxLength={11} disabled={isEdit} placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item name='password' label="密码" rules={[{ required: true, pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/, message: '密码必须包括数字、字母、特殊字符' }]}>
            <Input disabled={isEdit} placeholder='请输入密码' />
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
    </Modal> 
  )
}

export default Comp