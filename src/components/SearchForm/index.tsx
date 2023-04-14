
 
import {  Form, InputNumber, Input, Button  } from 'antd';
import styles from "./index.module.scss"

interface CompPropsType {
    onSearch: (value: any) => void;
    onReset: ()=> void;
}

const Comp = (props: CompPropsType) => {
    const [form] = Form.useForm();
    const { onSearch, onReset } = props;

    const handleSearch = ()=> {
        const values =  form.getFieldsValue();
        onSearch(values)
    }

    const handleReset = ()=> {
        form.resetFields()
        onReset()
    }
    return (
        <div className={styles.searchbar}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                labelAlign='left'
                form={form}
                className={styles.form}
            >
                <Form.Item
                    label="姓名"
                    name="name"
                    style={{ marginBottom: 0, marginRight: 20 }}
                    >
                    <Input  style={{width: 180}} />
                </Form.Item>

                <Form.Item
                    label="手机号"
                    name="phone"
                    style={{marginBottom: 0}}
                    >
                    <Input  style={{width: 180}} />
                </Form.Item>
            </Form>

            <div className={styles.button_wrapper}>
                <Button type="primary" onClick={handleSearch} style={{marginRight: 20}}>搜索</Button> 
                <Button onClick={handleReset}>重置</Button> 
            </div>
        </div> 
    )
}
export default Comp;