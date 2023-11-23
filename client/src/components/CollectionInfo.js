import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Space } from 'antd';

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
          <div style={{ marginLeft: '20%', marginTop: '2%' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>{collection.title}</h2>
                <div style={{ fontSize: '16px' }}>
                    <p><strong>{t('collection.description')}:</strong> {collection.description}</p>
                    <p><strong>{t('collection.theme')}:</strong> {collection.theme}</p>
                    <p><strong>{t('collection.profile')}:</strong> {collection.profileId}</p>
                    {collection.collection_fields.length > 0 && (
                        <div>
                            <strong>{t('collection.additional_fields')}:</strong>
                            <ul>
                                {collection.collection_fields.map((field) => (
                                    <li key={field.id}>{field.field_name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Space>
    );
}

export default CollectionInfo;