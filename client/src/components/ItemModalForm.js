import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Input, Spin, InputNumber, Checkbox } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { createItem, updateItemById } from '../http/itemAPI';
import './Modal.css'

function ItemModalForm({ title, okText, customFields, item, onCloseModal }) {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(true);
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
            cancelText={t('general.cancel')}
            onCancel={closeModal}
            onOk={item ? handleEdit : handleCreate}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
            <Spin spinning={isLoading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label={t('item.title')} rules={[{ required: true, message: t('general.rule_required') }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item  name="tags" 
                                label={t('item.tags')} 
                                rules={[{ required: true, message: t('general.rule_required') }]}>
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
                        field.field_type === 'checkbox' ?
                            <FormItem name={field.field_name}
                                      valuePropName="checked"
                                      initialValue={item ? item.customFields[field.field_name] : false}
                                      getValueFromEvent={(e) => e.target.checked ? true : false}>
                                <Checkbox onChange={(e) => setChecked(e.target.checked)}>{field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1)}</Checkbox>
                            </FormItem> 
                        :
                            <Form.Item  name={field.field_name} 
                                        label={field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1)} 
                                        rules={field.isRequired ? [{required: true, message: t('general.rule_required')}] : null}
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