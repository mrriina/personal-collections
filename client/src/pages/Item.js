import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Spin, Row, Col, Input, List, Form, Card, Avatar } from 'antd';
import ItemInfo from '../components/ItemInfo';
import { getCommentsByItemId, createComment } from '../http/commentAPI';
import { getItemById } from '../http/itemAPI';
import { LOGIN_ROUTE } from '../utils/consts'

function Item() {    
    const { id } = useParams();
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [item, setItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [form] = Form.useForm();
    
    useEffect(() => {
        getItem();
        getComments();
        const interval = setInterval(getComments, 2000);
        return () => clearInterval(interval);
    }, [])

    const getItem = async () => {
        setIsLoading(true);
        const data = await getItemById(id);
        setItem(data.item);
        setIsLoading(false);
    }

    const getComments = async () => {
        const commentsData = await getCommentsByItemId(id);
        setComments(commentsData.data.comments);
    }

    const handleSubmitComment = async () => {
        if(!sessionStorage.getItem('userId')) {
            navigate(LOGIN_ROUTE);
            return;
        }
        await createComment(newComment, id, sessionStorage.getItem('userId'));
        getComments();
        form.resetFields(['comment']); 
    }

    const renderCommentCard = (comment) => {
        return (
            <Card
                key={comment.id}
                style={{ marginBottom: '10px', border: '1px solid #e8e8e8', borderRadius: '8px' }}
                bodyStyle={{ padding: '5px', margin: '0 2%' }}
            >
                <Row gutter={16} align="middle">
                    <Col flex="none">
                        <Avatar size={36} />
                    </Col>
                    <Col flex="auto" style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>{comment.profile.name}</div>
                        <div style={{ wordWrap: 'break-word' }}>{comment.content}</div>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <div>
            <Spin spinning={isLoading}>
                {item ? (
                    <>
                        <ItemInfo item={item} />
                        <div style={{ padding: '5%', height: '60vh', overflowY: 'auto' }}>
                            <List
                                dataSource={comments}
                                renderItem={(comment) => renderCommentCard(comment)}
                            />
                            <Card
                                style={{
                                    border: '1px solid #e8e8e8',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    marginTop: '20px'
                                }}
                            >
                                <Form form={form} onFinish={handleSubmitComment} layout="inline">
                                    <Form.Item name="comment" style={{ flex: 1 }}>
                                        <Input
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder={t('item.add_comment') +'...'}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            {t('item.add_comment')}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </>
                ) : (
                    <p>{t('item.not_found')}</p>
                )}
            </Spin>
        </div>
    );
}

export default Item;