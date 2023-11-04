import { Button, Modal, Form, Input, Select, Upload } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

function CollectionCustomFields({ customFields, handleCustomFieldNameChange, handleCustomFieldTypeChange, handleDeleteCustomField, fieldsOptions }) {
    return (
        <div style={{ marginTop: 16 }}>
        {customFields.map((field, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: 16, alignItems: 'center' }}>
            <Input
              placeholder="Field Name"
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
            <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCustomField(index)} />
          </div>
        ))}
      </div>
    );
  }

export default CollectionCustomFields;