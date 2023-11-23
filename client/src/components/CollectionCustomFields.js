import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Select, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

function CollectionCustomFields({ customFields, handleCustomFieldNameChange, handleCustomFieldTypeChange, handleRequiredChange, handleDeleteCustomField, fieldsOptions }) {
  const { t } = useTranslation();  
  return (
    <div style={{ marginTop: 16 }}>
      {customFields.map((field, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: 16, alignItems: 'center' }}>
          <Input
              placeholder={t('collection.field__name')}
              value={field.name}
              onChange={(e) => handleCustomFieldNameChange(index, e.target.value)}
              style={{ marginRight: 8, flex: 1 }}
          />
          <Select
              value={field.type}
              onChange={(value) => handleCustomFieldTypeChange(index, value)}
              style={{ width: 120, marginRight: 8 }}
          >
            {fieldsOptions.map((type, i) => (
              <Option key={i} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
          <Checkbox
              checked={field.isRequired}
              onChange={(e) => handleRequiredChange(index, e.target.checked)}
              style={{ marginRight: 8 }}
          >
            {t('collection.required')}
          </Checkbox>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCustomField(index)} />
        </div>
      ))}
    </div>
  );
}

export default CollectionCustomFields;