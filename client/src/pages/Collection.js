import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { getCollectionById } from '../http/collectionAPI';
import { CollectionInfo, ItemsTable } from '../components/index'

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