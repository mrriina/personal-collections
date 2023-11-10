import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Table, Tag, Space, Button, Modal } from 'antd';
import { getItems, deleteItem } from '../http/itemAPI'
import ItemModalForm from './ItemModalForm';

const ItemsTable = (collection) => {
    const [items, setItems] = useState([]);
    const [createItemModal, setCreateItemModal] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();


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
        setSelectedItem(item)
        setEditItemModal(true);
    };

    const handleDeleteItem = async (itemId) => {
        const resp = await deleteItem(itemId);
        resp.status === 200 ? setItems((prevItems) => prevItems.filter((item) => item.id !== itemId)) : console.log(resp.message);
    };

    return (
        <>
            <Button onClick={() => setCreateItemModal(true)}>Create new item</Button>
            <Table dataSource={items} columns={columns} />

            {createItemModal && (
                <ItemModalForm  title='Create item' 
                                okText='Create' 
                                customFields={collection.collection.collection_fields}
                                onCloseModal={() => {setCreateItemModal(false); getItemsInfo()}} />
            )}

            {editItemModal && (
                <ItemModalForm  title='Edit item' 
                                okText='Edit' 
                                customFields={collection.collection.collection_fields}
                                item={selectedItem}
                                onCloseModal={() => {setEditItemModal(false); getItemsInfo()}} />
            )}
        </>
    );
}

export default ItemsTable;