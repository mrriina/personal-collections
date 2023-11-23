import React, { useState, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button, Modal, Form, Input, Select, Upload, Spin, Row } from 'antd';
import { useDropzone } from 'react-dropzone';
import { uploadCollectionFile, createCollection, updateCollectionById } from '../http/collectionAPI';
import { deleteItemsByCollectionId } from '../http/itemAPI'
import { UploadOutlined } from '@ant-design/icons';
import CollectionCustomFields from './CollectionCustomFields';
import './Modal.css'
import FormItem from 'antd/es/form/FormItem';
import { useTranslation } from 'react-i18next';


const { Option } = Select;

function CollectionModalForm({ title, okText, collection, onCloseModal }) {
    const { t } = useTranslation();
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [form] = Form.useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasRequiredChanged, setHasRequiredChanged] = useState(false);

    const [customFields, setCustomFields] = useState([]);

    const [initialCustomFields, setInitialCustomFields] = useState([]);

    const [markdown, setMarkdown] = React.useState('');

    // const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
	// const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    // console.log('process.env.CLOUDINARY_UPLOAD_PRESET==', CLOUDINARY_UPLOAD_PRESET);
    const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
	const CLOUDINARY_CLOUD_NAME = 'dllivv10p';



    const fieldsOptions = [
        { value: 'integer', label: t('collection.number') },
        { value: 'string', label: t('collection.string') },
        { value: 'text', label: t('collection.text') },
        { value: 'checkbox', label: t('collection.checkbox') },
        { value: 'date', label: t('collection.date') },
    ];


    useEffect(() => {
        if(collection) {
            const fieldValues = { title: collection.title, description: collection.description, theme: collection.theme };
            
            form.setFieldsValue(fieldValues);

            if (collection.image_url) {
                setImageUrl(collection.image_url);
            }

            if (collection.collection_fields && collection.collection_fields.length > 0) {
                const customFieldsData = collection.collection_fields.map((field) => ({
                    name: field.field_name,
                    type: field.field_type,
                    isRequired: field.isRequired,
                }));
                const initialCustomFieldsData = JSON.parse(JSON.stringify(customFieldsData));

                setCustomFields(customFieldsData);
                setInitialCustomFields(initialCustomFieldsData);
            }
        }
    }, [collection])


    
    const addCustomField = () => {
        setCustomFields([...customFields, { name: '', type: 'string', isRequired: false }]);
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

    const handleRequiredChange = (index, isChecked) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields[index].isRequired = isChecked;
        setCustomFields(updatedCustomFields);
      };

    const handleDeleteCustomField = (index) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields.splice(index, 1);
        setCustomFields(updatedCustomFields);
    };



    
    const closeModal = () => {
        setIsModalVisible(false);
        onCloseModal();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            setIsUploading(true);
            if (acceptedFiles && acceptedFiles.length > 0) {
                setImageFile(acceptedFiles[0]);
                const data = new FormData();
                data.append("file", acceptedFiles[0]);
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
            setIsUploading(false);
        },
    });



    const handleCreate =  () => {
        form.validateFields()
          .then(async (values) => {
            setIsLoading(true);
            const customFieldsData = customFields.map(field => ({
                name: field.name,
                type: field.type,
                isRequired: field.isRequired
            }));
            
            await createCollection(values.title, values.description, values.theme, imageUrl, sessionStorage.getItem('userId'), customFieldsData)
            setIsLoading(false);
            closeModal();
        })
          .catch((errorInfo) => {
            console.log('Validation error:', errorInfo);
        });
    };

    const handleEdit = () => {
        const hasRequiredChanged = customFields.some((currentField) => {
            const initialField = initialCustomFields.find((field) => field.name === currentField.name);
    
            const hasChanged =
                initialField &&
                ((initialField.isRequired && initialField.type !== currentField.type) || 
                    (currentField.isRequired && !initialField.isRequired));
    
            return hasChanged;
        });
    
        const hasNewRequiredFields = customFields.some((currentField) => {
            const initialField = initialCustomFields.find((field) => field.name === currentField.name);
            const isNewRequired = !initialField && currentField.isRequired;
            return isNewRequired;
        });
    
        const shouldShowWarning = hasRequiredChanged || hasNewRequiredFields;
    
        setHasRequiredChanged(shouldShowWarning);
        if (shouldShowWarning) {
            Modal.confirm({
                title: t('collection.warning'),
                content: t('collection.warning_content'),
                okText: t('collection.yes'),
                cancelText: t('collection.no'),
                onOk: async () => {
                    await deleteItemsByCollectionId(collection.id)
                    setHasRequiredChanged(false);
                    performEdit();
                },
            });
        } else {
            performEdit();
        }
    };

    const performEdit =  () => {
        form.validateFields()
          .then(async (values) => {
            setIsLoading(true);
            const customFieldsData = customFields.map(field => ({
                name: field.name,
                type: field.type,
                isRequired: field.isRequired
            }));

            await updateCollectionById(collection.id, values.title, values.description, values.theme, imageUrl, customFieldsData)
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
            cancelText={t('collection.cancel')}
            onCancel={closeModal}
            onOk={collection ? handleEdit : handleCreate}
            bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
            <Spin spinning={isLoading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label={t('collection.title')} rules={[{ required: true, message: t('general.rule_required') }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label={t('collection.description')} rules={[{ required: true, message: t('general.rule_required') }]}>
                        <SimpleMDE value={markdown} onChange={(value) => setMarkdown(value)} />
                    </Form.Item>
                    <Form.Item name="theme" label={t('collection.theme')} rules={[{ required: true, message: t('general.rule_required') }]}>
                        <Select>
                            <Option value="Books">{t('collection.books')}</Option>
                            <Option value="Coins">{t('collection.coins')}</Option>
                            <Option value="Postcards">{t('collection.postcards')}</Option>
                            <Option value="Cars">{t('collection.cars')}</Option>
                            <Option value="Plants">{t('collection.plants')}</Option>
                            <Option value="Antiques">{t('collection.antiques')}</Option>
                            <Option value="Other">{t('collection.other')}</Option>
                        </Select>
                    </Form.Item>
                    {isUploading ? <Row justify="center" align="middle"><Spin spinning={isUploading} /></Row> :
                    <div {...getRootProps()} 
                        className="dropzone"
                    >
                        <input {...getInputProps()} />
                        {imageFile ? (
                            <p>{t('collection.image_selected')}: {imageFile.name}</p>
                        ) : (
                            <p>{t('collection.drag')}</p>
                        )}
                    </div>
                    }


                    <CollectionCustomFields
                        customFields={customFields}
                        handleCustomFieldNameChange={handleCustomFieldNameChange}
                        handleCustomFieldTypeChange={handleCustomFieldTypeChange}
                        handleRequiredChange={handleRequiredChange}
                        handleDeleteCustomField={handleDeleteCustomField}
                        fieldsOptions={fieldsOptions}
                    />
                    <Button onClick={addCustomField}>{t('collection.add_field')}</Button>
                </Form>
            </Spin>
        </Modal>
    );
}

export default CollectionModalForm;