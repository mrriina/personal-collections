import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Form, Input, Select, Upload, Spin, Row, InputNumber  } from 'antd';
import { useDropzone } from 'react-dropzone';
import { createItem, updateItemById } from '../http/itemAPI';
import { UploadOutlined } from '@ant-design/icons';
import CollectionCustomFields from './CollectionCustomFields';
import './Modal.css'


const { Option } = Select;

function ItemModalForm({ title, okText, customFields, item, onCloseModal }) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if(item) {
            const fieldValues = { title: item.title, tags: item.tags };
            customFields.map((field) => {
                fieldValues[field.field_name] = item.customFields[field.field_name];
            })
            form.setFieldsValue(fieldValues);
        }
    }, [])

    
    const closeModal = () => {
        setIsModalVisible(false);
        onCloseModal();
    };


    const handleEdit =  () => {
        form.validateFields()
          .then(async (values) => {
            setIsLoading(true);
            
            const customFieldsValues = {};
            Object.keys(values).forEach((key) => {
                if (key !== 'title' && key !== 'tags') {
                    customFieldsValues[key] = values[key];
                }
            });
            
            const resp = await updateItemById(item.id, values.title, values.tags, customFieldsValues)
            setIsLoading(false);
            closeModal();
        })
          .catch((errorInfo) => {
            console.log('Validation error:', errorInfo);
        });
    };


    const handleCreate =  () => {
        form.validateFields()
          .then(async (values) => {
            setIsLoading(true);
            
            const customFieldsValues = {};
            Object.keys(values).forEach((key) => {
                if (key !== 'title' && key !== 'tags') {
                    customFieldsValues[key] = values[key];
                }
            });

            await createItem(values.title, values.tags, customFieldsValues, id)
            setIsLoading(false);
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
            onOk={item ? handleEdit : handleCreate}
        >
            <Spin spinning={isLoading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Enter Title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item  name="tags" 
                                label="Tags" 
                                rules={[{ required: true, message: 'Enter Tags' }]}>
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
                                    rules={field.isRequired ? [{required: true, message: `Enter ${field.field_name}`}] : null}
                                    >
                            {field.field_type === 'integer' ? <InputNumber /> : <Input type={field.field_type} />}
                        </Form.Item>
                    ))}

                </Form>
            </Spin>
        </Modal>
    );
}

export default ItemModalForm;