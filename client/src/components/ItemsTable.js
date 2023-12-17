import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Table, Tag, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getItems, deleteItem } from '../http/itemAPI';
import { ItemModalForm } from './index';
import { ITEM_ROUTE } from '../utils/consts';

const ItemsTable = (collection) => {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [createItemModal, setCreateItemModal] = useState(false);
    const [editItemModal, setEditItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
        getItemsInfo();
    }, [])
        
    const getItemsInfo = async () => {
        const data = await getItems(collection.collection.id);
        setItems(data.items);
    }

    const customFieldsColumns = collection.collection.collection_fields.map((field) => ({
        title: field.field_name.charAt(0).toUpperCase() + field.field_name.slice(1),
        dataIndex: ['customFields', field.field_name],
        key: field.field_name,
        sorter: (a, b) => fieldSorter(a.customFields[field.field_name], b.customFields[field.field_name], field.field_type),
        render: (value) => {
            if (field.field_type === 'checkbox') {
                return value ? '+' : '-';
            }
            return value;
        },
    })) || [];

    const fieldSorter = (valueA, valueB, fieldType) => {
        switch (fieldType) {
            case 'checkbox':
                if (valueA && !valueB) return -1;
                if (!valueA && valueB) return 1;
                return 0;
            case 'string':
                return valueA.localeCompare(valueB);
            case 'text':
                return valueA.length - valueB.length;
            case 'integer':
                return valueA - valueB;
            case 'date':
                return new Date(valueA) - new Date(valueB);
            default:
                return 0;
        }
    }

    const onTableChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const uniqueTags = Array.from(new Set(items.flatMap(item => item.tags.split(' '))));
    const tagFilters = uniqueTags.map(tag => ({ text: tag, value: tag }));

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', 
            sorter: (a, b) => fieldSorter(a.id, b.id, 'integer') },
        { title: t('item.title'), dataIndex: 'title', key: 'title',
            render: (title, record) => (
                <Link to={ITEM_ROUTE +`/${record.id}`}>
                    {title}
                </Link>
            ), 
            sorter: (a, b) => fieldSorter(a.title, b.title, 'string') },
        { title: t('item.tags'), 
          dataIndex: 'tags', 
          key: 'tags',
          filters: tagFilters, 
          render: (tags) => {
            const tagArray = tags.split(' ').map(tag => tag.trim());
            return tagArray.map((tag) => <Tag key={tag}>{tag}</Tag>);
          },
          onFilter: (value, record) => {
            const tagArray = record.tags.split(' ').map(tag => tag.trim());
            return tagArray.includes(value);
          },
        },
        ...customFieldsColumns, 
    ];

    const hasPermission = sessionStorage.getItem('userId') && sessionStorage.getItem('userId') == collection.collection.profileId;
    if(hasPermission) {
        columns.push({
            title: t('item.actions'),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditItem(record)} icon={<EditOutlined />} />
                    <Button onClick={() => handleDeleteItem(record.id)} icon={<DeleteOutlined />} danger />
                </Space>
            )
        })
    }

    const handleEditItem = (item) => {
        setSelectedItem(item)
        setEditItemModal(true);
    };

    const handleDeleteItem = async (itemId) => {
        const resp = await deleteItem(itemId);
        resp.status === 200 ? setItems((prevItems) => prevItems.filter((item) => item.id !== itemId)) : console.log(resp.message);
    };

    return (
        <div style={{ padding: '2%' }}>
            {hasPermission &&
                <Button onClick={() => setCreateItemModal(true)}>{t('item.create_btn')}</Button>
            }
            <div style={{ paddingTop: '1%' }}>
                <Table dataSource={items} 
                    columns={columns}
                    onChange={onTableChange}
                    scroll={{
                        x: 700,
                    }}
                    pagination={{ pageSize: 5 }}
                />
            </div>

            {createItemModal && (
                <ItemModalForm  title={t('item.create_item')} 
                                okText={t('general.create')} 
                                customFields={collection.collection.collection_fields}
                                onCloseModal={() => {setCreateItemModal(false); getItemsInfo()}} />
            )}

            {editItemModal && (
                <ItemModalForm  title={t('item.edit_item')} 
                                okText={t('general.edit')} 
                                customFields={collection.collection.collection_fields}
                                item={selectedItem}
                                onCloseModal={() => {setEditItemModal(false); getItemsInfo()}} />
            )}
        </div>
    );
}

export default ItemsTable;