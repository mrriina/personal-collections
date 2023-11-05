import React from 'react';
import { Card, Button, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CollectionCard = ({ title, theme, image }) => {

    const defaultImageUrl = 'https://res.cloudinary.com/dllivv10p/image/upload/v1699177267/yzrkgw8kkl5tttonnun3.jpg';

    return (
        <Card
            style={{width: '250px', margin: '10px', display: 'inline-block'}}
            cover={<img alt={title} src={image || defaultImageUrl} style={{width: '100%', height: '150px', objectFit: 'cover'}} />}
            actions={[
                <Button icon={<EditOutlined />} type="primary">
                    Edit
                </Button>,
                <Button icon={<DeleteOutlined />} danger>
                    Delete
                </Button>,
            ]}
        >
        <Card.Meta title={title} description={theme} />
        </Card>
    );
};

export default CollectionCard;