import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CollectionCard = ({ id, title, theme, image, handleEditCollection, handleDeleteCollection }) => {
    const { t } = useTranslation();
    // const defaultImageUrl = 'https://res.cloudinary.com/dllivv10p/image/upload/v1699177267/yzrkgw8kkl5tttonnun3.jpg';
    const defaultImageUrl = process.env.DEFAULT_IMAGE_URL;
    console.log('process.env.DEFAULT_IMAGE_UR=', process.env.DEFAULT_IMAGE_UR);

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