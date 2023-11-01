import React, { useState } from 'react';
import { Button } from 'antd';
import ModalForm from './ModalForm';

function Profile() {

  const [createCollectionModal, setCreateCollectionModal] = useState(false);
  const modalTitle = 'Create collection'; // Задайте значение title
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