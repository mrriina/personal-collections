import React from 'react';
import { Card, Button, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CollectionCard = ({ id, title, theme, image, handleDeleteCollection }) => {

    const defaultImageUrl = 'https://res.cloudinary.com/dllivv10p/image/upload/v1699177267/yzrkgw8kkl5tttonnun3.jpg';

    return (
        <Card
            style={{width: '250px', margin: '10px', display: 'inline-block'}}
            cover={<img alt={title} src={image || defaultImageUrl} style={{width: '100%', height: '150px', objectFit: 'cover'}} />}
            actions={[
                <Button icon={<EditOutlined />} type="primary" ghost>
                    Edit
                </Button>,
                <Button onClick={() => handleDeleteCollection(id)} icon={<DeleteOutlined />} danger>
                    Delete
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