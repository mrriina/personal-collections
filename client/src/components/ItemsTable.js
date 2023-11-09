import React, { useState, useEffect } from 'react';
import { PageHeader, Descriptions, Table, Tag, Space, Button, Modal } from 'antd';
import { getItems } from '../http/itemAPI'

const ItemsTable = (collection) => {
    const [items, setItems] = useState([]);

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
        title: field.field_name,
        dataIndex: ['customFields', field.field_name],
        key: field.field_name,
    })) || [];

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название', dataIndex: 'title', key: 'title' },
        { title: 'Тэги', dataIndex: 'tags', key: 'tags', render: (tags) => {
            const tagArray = tags.split(' ').map(tag => tag.trim());
            return tagArray.map((tag) => <Tag key={tag}>{tag}</Tag>);
        } },
        ...customFieldsColumns,
        {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditItem(record)}>Редактировать</Button>
                    <Button type="danger" onClick={() => handleDeleteItem(record.id)}>Удалить</Button>
                </Space>
            ),
        },
    ];


    const handleEditItem = (item) => {
        console.log('items=', items);
    };
    
      const handleCreateItem = () => {
        
    };

    const handleDeleteItem = async (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <>
            <Table dataSource={items} columns={columns} />
        </>
    );
}

export default ItemsTable;