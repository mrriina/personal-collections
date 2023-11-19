import React from 'react';
import { Descriptions, Image, Space } from 'antd';
import { useTranslation } from 'react-i18next';


function ItemInfo({ item }) {
    const { t } = useTranslation();


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
            <h2>{t('item.item_details')}</h2>
            <Descriptions bordered column={1}>
                <Descriptions.Item label={t('item.title')}>{item.title}</Descriptions.Item>
                <Descriptions.Item label={t('item.tags')}>{item.tags}</Descriptions.Item>
                {renderCustomFields()}

                <Descriptions.Item label={t('item.collection')}>
                    <a href={`/collection/${item.collection.id}`}>{item.collection.title}</a>
                </Descriptions.Item>
            </Descriptions>
        </div>
      );
}

export default ItemInfo;