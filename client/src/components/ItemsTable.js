import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Table, Tag, Space, Button, Modal } from 'antd';
import { getItems } from '../http/itemAPI'
import ItemModalForm from './ItemModalForm';

const ItemsTable = (collection) => {
    const [items, setItems] = useState([]);
    const [createItemModal, setCreateItemModal] = useState(false);
    const modalTitle = 'Create item';
    const modalOkText = 'Create';


    useEffect(() => {
        getItemsInfo()
    }, [])
    
    const getItemsInfo = async () => {
        // setIsLoading(true);
        const data = await getItems(collection.collection.id);
        setItems(data.items);
        // setIsLoading(false);
    }

    
    const customFieldsColumns = collection.collection.collection_fields.map((field) => ({
        title: field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1),
        dataIndex: ['customFields', field.field_name],
        key: field.field_name,
    })) || [];

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Tags', dataIndex: 'tags', key: 'tags', render: (tags) => {
            const tagArray = tags.split(' ').map(tag => tag.trim());
            return tagArray.map((tag) => <Tag key={tag}>{tag}</Tag>);
        } },
        ...customFieldsColumns,
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditItem(record)}>Edit</Button>
                    <Button type="danger" onClick={() => handleDeleteItem(record.id)}>Delete</Button>
                </Space>
            ),
        },
    ];


    const handleEditItem = (item) => {

    };
    
    const handleCreateItem = () => {
        
    };

    const handleDeleteItem = async (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <>
            <Button type="primary" onClick={() => setCreateItemModal(true)}>Create new item</Button>
            <Table dataSource={items} columns={columns} />

            {createItemModal && (
                <ItemModalForm  title={modalTitle} 
                                okText={modalOkText} 
                                customFields={collection.collection.collection_fields}
                                onCloseModal={() => {setCreateItemModal(false); getItemsInfo()}} />
            )}
        </>
    );
}

export default ItemsTable;