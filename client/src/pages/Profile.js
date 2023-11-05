import React, { useState, useEffect } from 'react';
import { Button, Spin, Row, Col } from 'antd';
import ModalForm from '../components/ModalForm';
import { getCollectionsByProfileId } from '../http/collectionAPI'
import CollectionCard from '../components/CollectionCard';

function Profile() {
  const [collections, setCollections] = useState();
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


  return (
    <div style={{background: '#e3e1e5'}}>
        <Button type="primary" onClick={() => setCreateCollectionModal(true)}>
            Create
        </Button>

        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          {isLoading ? <Spin /> :
            collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                title={collection.title}
                theme={collection.theme}
                image={collection.image_url}
              />
            ))
          }
        </Row>
        
        {createCollectionModal && (
        <ModalForm title={modalTitle} okText={modalOkText} onCloseModal={() => {setCreateCollectionModal(false); getCollections()}} />
      )}
    </div>
  );
}

export default Profile;