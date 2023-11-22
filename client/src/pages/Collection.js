import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCollectionById } from '../http/collectionAPI';
import CollectionInfo from '../components/CollectionInfo';
import ItemsTable from '../components/ItemsTable';
import { Button, Spin, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

function Collection() {    
    const { id } = useParams();
    const { t } = useTranslation();
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
        <div>
            <Spin spinning={isLoading}>
                {collection ? (
                    <>
                        <CollectionInfo collection={collection} />
                        <ItemsTable collection={collection} />
                    </>
                ) : (
                    <p>{t('collection.not_found')}</p>
                )}
            </Spin>
            
        </div>
    );
}

export default Collection;