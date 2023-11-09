import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Form, Input, Select, Upload, Spin, Row, InputNumber  } from 'antd';
import { useDropzone } from 'react-dropzone';
import { createItem } from '../http/itemAPI';
import { UploadOutlined } from '@ant-design/icons';
import CollectionCustomFields from './CollectionCustomFields';
import './Modal.css'


const { Option } = Select;

function ItemModalForm({ title, okText, customFields, onCloseModal }) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [form] = Form.useForm();
    const [isCreating, setIsCreating] = useState(false);
    const { id } = useParams();

    
    const closeModal = () => {
        setIsModalVisible(false);
        onCloseModal();
    };


    const handleCreate =  () => {
        form.validateFields()
          .then(async (values) => {
            setIsCreating(true);
            
            const customFieldsValues = {};
            Object.keys(values).forEach((key) => {
                if (key !== 'title' && key !== 'tags') {
                    customFieldsValues[key] = values[key];
                }
            });

            await createItem(values.title, values.tags, customFieldsValues, id)
            setIsCreating(false);
            closeModal();
        })
          .catch((errorInfo) => {
            console.log('Validation error:', errorInfo);
        });
    };

    return (
        <Modal
            visible={isModalVisible}
            title={title}
            okText={okText}
            cancelText="Cancel"
            onCancel={closeModal}
            onOk={handleCreate}
        >
            <Spin spinning={isCreating}>
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Введите Title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item  name="tags" 
                                label="Tags" 
                                rules={[{ required: true, message: 'Введите Tags' }]}>
                        <Input onChange={(e) => {
                                    const value = e.target.value;
                                    const formattedValue = value
                                        .split(' ')
                                        .map((word) => (word.startsWith('#') ? word : `#${word}`))
                                        .join(' ');
                                    form.setFieldsValue({ tags: formattedValue });
                                }}/>
                    </Form.Item>
                    


                    {customFields.map((field) => (
                        <Form.Item  name={field.field_name} 
                                    label={field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1)} 
                                    rules={[{ required: true, message: `Введите ${field.field_name}` }]}>
                            {field.field_type === 'integer' ? <InputNumber /> : <Input type={field.field_type} />}
                        </Form.Item>
                    ))}

                </Form>
            </Spin>
        </Modal>
    );
}

export default ItemModalForm;