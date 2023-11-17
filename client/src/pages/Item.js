import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../http/itemAPI';
import CollectionInfo from '../components/CollectionInfo';
import ItemsTable from '../components/ItemsTable';
import { Button, Spin, Row, Col, Input, List, Form, Card, Avatar } from 'antd';
import ItemInfo from '../components/ItemInfo';
import { getCommentsByItemId, createComment } from '../http/commentAPI';

function Item() {    
    const { id } = useParams();
    const [item, setItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    
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
        await createComment(newComment, id, sessionStorage.getItem('userId'));
        setNewComment('');
        getComments();
    }

    const renderCommentCard = (comment) => {
        return (
            <Card key={comment.id} style={{ margin: '10px 0', width: '70%', borderRadius: '8px' }}>
                <Row gutter={16} align="middle">
                    <Col>
                        <Avatar size={36} />
                    </Col>
                    <Col flex="auto">
                        <p>{comment.profile.name}</p>
                        <p>{comment.content}</p>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <div style={{background: '#e3e1e5'}}>
            
            <Spin spinning={isLoading}>
                {item ? (
                    <>
                        <ItemInfo item={item} />
                        <div style={{ padding: '5%', height: '60vh', overflowY: 'auto' }}>
                            <List
                                dataSource={comments}
                                renderItem={(comment) => renderCommentCard(comment)}
                            />
                        
                            <Form onFinish={handleSubmitComment}>
                                <Form.Item name="comment">
                                    <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Add Comment</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <p>Item not found</p>
                )}
            </Spin>
        </div>
    );
}

export default Item;