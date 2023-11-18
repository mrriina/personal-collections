import React from 'react';
import { Descriptions, Image, Space } from 'antd';
import { useTranslation } from 'react-i18next';


function CollectionInfo({ collection }) {
    const { t } = useTranslation();
    const defaultImageUrl = 'https://res.cloudinary.com/dllivv10p/image/upload/v1699177267/yzrkgw8kkl5tttonnun3.jpg';

    return (
        <Space style={{ padding: '20px' }}>
          <Image
            width={300}
            height={300}
            src={collection.image_url || defaultImageUrl}
            alt={collection.title}
            preview={false}
            style={{ borderRadius: 10 }}
          />
          <Descriptions title={collection.title} column={1}>
            <Descriptions.Item label={t('collection.description')}>
              {collection.description}
            </Descriptions.Item>
            <Descriptions.Item label={t('collection.theme')}>
              {collection.theme}
            </Descriptions.Item>
            <Descriptions.Item label={t('collection.profile')}>
              {collection.profileId}
            </Descriptions.Item>
            {collection.collection_fields.length > 0 && (
              <Descriptions.Item label={t('collection.additional_fields')}>
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