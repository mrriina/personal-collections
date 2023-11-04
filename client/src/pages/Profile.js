import React, { useState } from 'react';
import { Button } from 'antd';
import ModalForm from '../components/ModalForm';

function Profile() {

  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const modalTitle = 'Create collection';
  const modalOkText = 'Create';

  return (
    <div>
        <Button type="primary" onClick={() => setCreateCollectionModal(true)}>
            Create
        </Button>
        
        {createCollectionModal && (
        <ModalForm title={modalTitle} okText={modalOkText} onCloseModal={() => setCreateCollectionModal(false)} />
      )}
    </div>
  );
}

export default Profile;