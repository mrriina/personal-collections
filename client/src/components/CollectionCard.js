import React from 'react';
import { Card, Button, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CollectionCard = ({ id, title, theme, image, handleEditCollection, handleDeleteCollection }) => {
    const { t } = useTranslation();
    const defaultImageUrl = 'https://res.cloudinary.com/dllivv10p/image/upload/v1699177267/yzrkgw8kkl5tttonnun3.jpg';

    return (
        <Card
            style={{width: '20%', margin: '10px', display: 'inline-block'}}
            cover={<img alt={title} src={image || defaultImageUrl} style={{width: '240px', height: '150px', objectFit: 'cover', marginTop: '20px'}} />}
            actions={[
                <Button onClick={() => handleEditCollection(id)} icon={<EditOutlined />} type="primary" ghost>
                    {t('collection.edit')}
                </Button>,
                <Button onClick={() => handleDeleteCollection(id)} icon={<DeleteOutlined />} danger>
                    {t('collection.delete')}
                </Button>,
            ]}
        >
        <Link to={`/collection/${id}`}>
            <Card.Meta title={title} description={theme} />
        </Link>
        </Card>
    );
};

export default CollectionCard;