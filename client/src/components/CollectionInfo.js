import React from 'react';
import { Descriptions, Image, Space } from 'antd';


function CollectionInfo({ collection }) {
    return (
        <Space style={{ padding: '20px' }}>
          <Image
            width={300}
            height={300}
            src={collection.image_url || 'https://via.placeholder.com/300'}
            alt={collection.title}
            preview={false}
            style={{ borderRadius: 10 }}
          />
          <Descriptions title={collection.title} column={1}>
            <Descriptions.Item label="Description">
              {collection.description}
            </Descriptions.Item>
            <Descriptions.Item label="Theme">
              {collection.theme}
            </Descriptions.Item>
            <Descriptions.Item label="Profile ID">
              {collection.profileId}
            </Descriptions.Item>
            {collection.collection_fields.length > 0 && (
              <Descriptions.Item label="Collection Fields">
                <ul>
                  {collection.collection_fields.map((field) => (
                    <li key={field.id}>
                      {field.field_name}
                    </li>
                  ))}
                </ul>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Space>
      );
}

export default CollectionInfo;