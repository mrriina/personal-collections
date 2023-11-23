import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CollectionModalForm from '../components/CollectionModalForm';
import { getCollectionsByProfileId, deleteCollection } from '../http/collectionAPI'
import CollectionCard from '../components/CollectionCard';

function Profile() {
  const [collections, setCollections] = useState([]);
  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const [editCollectionModal, setEditCollectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState();
  const { t } = useTranslation();
  let navigate = useNavigate();

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    setIsLoading(true);
    const data = await getCollectionsByProfileId(sessionStorage.getItem('userId'));
    setCollections(data.collections);
    setIsLoading(false);
  }

  const handleEditCollection = async (id) => {
    setSelectedCollection(collections.find(collection => collection.id === id));
    setEditCollectionModal(true);
  };

  const handleDeleteCollection = async (id) => {
    await deleteCollection(id);
    getCollections();
  };

  return (
    sessionStorage.getItem('userId') ? 
      <div style={{padding: '3% 5%'}}>
        <Button
          onClick={() => setCreateCollectionModal(true)}
          icon={<PlusOutlined />}
          style={{float: 'right', marginRight: '1%'}}
        >
          {t('profile.create')}
        </Button>
          <div display='flex' align='center' style={{ minHeight: '100vh', marginTop: '5%' }}>
            <Spin spinning={isLoading} > 
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  id={collection.id}
                  title={collection.title}
                  theme={collection.theme}
                  image={collection.image_url}
                  handleEditCollection={handleEditCollection}
                  handleDeleteCollection={handleDeleteCollection}
                />
              ))}
            </Spin>
          </div>
          
          {createCollectionModal && (
            <CollectionModalForm title={t('collection.create_collection')} 
                                okText={t('profile.create')} 
                                onCloseModal={() => {setCreateCollectionModal(false); getCollections()}} />
          )}

          {editCollectionModal && (
            <CollectionModalForm title={t('collection.edit_collection')} 
                                okText={t('collection.edit')}
                                collection={selectedCollection}
                                onCloseModal={() => {setEditCollectionModal(false); getCollections()}} />
          )}
      </div>
    : navigate("/login") 
  );
}

export default Profile;