import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollectionById } from '../http/collectionAPI';
import CollectionInfo from '../components/CollectionInfo';
import { Button, Spin, Row, Col } from 'antd';

function Collection() {    
    const { id } = useParams();
    const [collection, setCollection] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCollection();
    }, [])

    const getCollection = async () => {
        setIsLoading(true);
        const data = await getCollectionById(id);
        setCollection(data.data.collection);
        setIsLoading(false);
      }

    return (
        <div style={{background: '#e3e1e5'}}>
            <Spin spinning={isLoading}>
                {collection ? (
                    <CollectionInfo collection={collection} />
                ) : (
                    <p>Коллекция не найдена</p>
                )}
            </Spin>
        </div>
    );
}

export default Collection;