import React, { useState } from 'react';

import { Button, Modal, Form, Input, Select, Upload } from 'antd';
import { useDropzone } from 'react-dropzone';
import { uploadCollectionFile, createCollection } from '../http/collectionAPI';
import { UploadOutlined } from '@ant-design/icons';
import CollectionCustomFields from './CollectionCustomFields';
import './Modal.css'


const { Option } = Select;

function ModalForm({ title, okText, onCloseModal }) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const [customFields, setCustomFields] = useState([]);

    // const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
	// const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    // console.log('process.env.CLOUDINARY_UPLOAD_PRESET==', CLOUDINARY_UPLOAD_PRESET);
    const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
	const CLOUDINARY_CLOUD_NAME = 'dllivv10p';



    const fieldsOptions = [
        { value: 'integer', label: 'Numbers' },
        { value: 'string', label: 'String' },
        { value: 'text', label: 'Text' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'date', label: 'Date' },
    ];


    const addCustomField = () => {
        setCustomFields([...customFields, { name: '', type: 'string' }]);
    };


    const handleCustomFieldNameChange = (index, newName) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields[index].name = newName;
        setCustomFields(updatedCustomFields);
    };
      
      const handleCustomFieldTypeChange = (index, newType) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields[index].type = newType;
        setCustomFields(updatedCustomFields);
    };

    const handleDeleteCustomField = (index) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields.splice(index, 1);
        setCustomFields(updatedCustomFields);
      };



    
    const handleCancel = () => {
        setIsModalVisible(false);
        onCloseModal();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                setImageFile(acceptedFiles[0]);
                const data = new FormData();
                data.append("file", imageFile);
                data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

                await uploadCollectionFile(data, CLOUDINARY_CLOUD_NAME)
                    .then((result) => {
                        setImageUrl(result);
                    })
                    .catch((e) => {
                        console.log('Error: ', e.message);
                    })
            }
        },
    });



    const handleCreate =  () => {
        form.validateFields()
          .then(async (values) => {
            const customFieldsData = customFields.map(field => ({
                name: field.name,
                type: field.type
            }));

            await createCollection(values.title, values.description, values.theme, imageUrl, sessionStorage.getItem('userId'), customFieldsData)
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
            onCancel={handleCancel}
            onOk={handleCreate}
            >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Введите Title' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Введите Description' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="theme" label="Theme" rules={[{ required: true, message: 'Выберите Theme' }]}>
                    <Select>
                        <Option value="Books">Books</Option>
                        <Option value="Signs">Signs</Option>
                        <Option value="Silverware">Silverware</Option>
                        <Option value="Cars">Cars</Option>
                    </Select>
                </Form.Item>
                <div {...getRootProps()} 
                    className="dropzone"
                >
                    <input {...getInputProps()} />
                    {imageFile ? (
                        <p>Image selected: {imageFile.name}</p>
                    ) : (
                        <p>Drag the image here or click to select a file</p>
                    )}
                </div>



                <CollectionCustomFields
                    customFields={customFields}
                    handleCustomFieldNameChange={handleCustomFieldNameChange}
                    handleCustomFieldTypeChange={handleCustomFieldTypeChange}
                    handleDeleteCustomField={handleDeleteCustomField}
                    fieldsOptions={fieldsOptions}
                />
                <Button onClick={addCustomField}>Add Field</Button>




            </Form>
        </Modal>
    );
}

export default ModalForm;