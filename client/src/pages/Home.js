import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Spin, Table } from 'antd';
import { getLatestItems } from '../http/itemAPI'
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, COLLECTION_ROUTE, ITEM_ROUTE } from './utils/routes'

function Home() {
  const { t } = useTranslation();
  const [latestItems, setLatestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { title: t('item.title'), dataIndex: 'title', key: 'title',
      render: (title, record) => (
        <Link to={`/item/${record.id}`}>
          {title}
        </Link>
      )
    },
    { title: t('item.collection'), dataIndex: 'collection', key: 'collection',
        render: (collection) => {
          if (collection && collection.title) {
            return collection.title;
          }
          return null;
        }
    },
    { title: t('item.author'), dataIndex: 'collection', key: 'author',
        render: (collection) => {
          if (collection && collection.profile && collection.profile.name) {
            return collection.profile.name;
          }
          return null;
        }
    },
  ];

  useEffect(() => {
    getLatestItemsInfo();
  }, [])

  const getLatestItemsInfo = async () => {
    setIsLoading(true);
    const data = await getLatestItems();
    setLatestItems(data.latestItems);
    setIsLoading(false);
  }

  return (
    <div style={{padding: '3% 5%'}}>
      <div display='flex' align='center' style={{ minHeight: '100vh', marginTop: '5%' }}>
        <Spin spinning={isLoading} > 
          <Table  dataSource={latestItems} 
                  columns={columns}
                  scroll={{
                      x: 700,
                  }}
          />
        </Spin>
      </div>
    </div>
  );
}

export default Home;