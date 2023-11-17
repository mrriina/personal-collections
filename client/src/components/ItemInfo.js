import React from 'react';
import { Descriptions, Image, Space } from 'antd';


function ItemInfo({ item }) {
    console.log('item.=', item);

    const renderCustomFields = () => {
        const customFields = item.customFields || {};
        return Object.keys(customFields).map((key) => (
          <Descriptions.Item key={key} label={key}>
            {customFields[key]}
          </Descriptions.Item>
        ));
      };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <h2>Item Details</h2>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Title">{item.title}</Descriptions.Item>
                <Descriptions.Item label="Tags">{item.tags}</Descriptions.Item>
                {renderCustomFields()}

                <Descriptions.Item label="Collection">
                    <a href={`/collection/${item.collection.id}`}>{item.collection.title}</a>
                </Descriptions.Item>
            </Descriptions>
        </div>
      );
}

export default ItemInfo;