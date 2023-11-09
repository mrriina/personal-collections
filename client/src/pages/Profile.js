import React, { useState, useEffect } from 'react';
import { Button, Spin, Row, Col } from 'antd';
import ModalForm from '../components/ModalForm';
import { getCollectionsByProfileId, deleteCollection } from '../http/collectionAPI'
import CollectionCard from '../components/CollectionCard';
import { PlusOutlined } from '@ant-design/icons';

function Profile() {
  const [collections, setCollections] = useState([]);
  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalTitle = 'Create collection';
  const modalOkText = 'Create';

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    setIsLoading(true);
    const data = await getCollectionsByProfileId(sessionStorage.getItem('userId'));
    setCollections(data.collections);
    setIsLoading(false);
  }


  const handleDeleteCollection = async (id) => {
    await deleteCollection(id);
    getCollections();
};


  return (
    <div style={{padding: '3% 5%', background: '#f5f5f5'}}>
      <Button
        onClick={() => setCreateCollectionModal(true)}
        icon={<PlusOutlined />}
        style={{float: 'right', marginRight: '1%'}}
      >
        Create
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
                handleDeleteCollection={handleDeleteCollection}
              />
            ))}
          </Spin>
        </div>
        
        {createCollectionModal && (
          <ModalForm title={modalTitle} okText={modalOkText} onCloseModal={() => {setCreateCollectionModal(false); getCollections()}} />
        )}
    </div>
  );
}

export default Profile;