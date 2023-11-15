import React, { useState, useEffect } from 'react';
import { Button, Spin, Row, Col, Table } from 'antd';
import { getCollections } from '../http/collectionAPI'
import { getLatestItems } from '../http/itemAPI'
import CollectionCard from '../components/CollectionCard';

function Home() {
  const [collections, setCollections] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title'},
    { title: 'Collection', dataIndex: 'collection', key: 'collection',
        render: (collection) => {
          if (collection && collection.title) {
            return collection.title;
          }
          return null;
        }
    },
    { title: 'Author', dataIndex: 'collection', key: 'author',
        render: (collection) => {
          if (collection && collection.profile && collection.profile.name) {
            return collection.profile.name;
          }
          return null;
        }
    },
  ];

  useEffect(() => {
    getCollectionsInfo();
    getLatestItemsInfo();
  }, [])

  const getCollectionsInfo = async () => {
    setIsLoading(true);
    const data = await getCollections();
    setCollections(data.collections);
    setIsLoading(false);
  }

  const getLatestItemsInfo = async () => {
    setIsLoading(true);
    const data = await getLatestItems();
    setLatestItems(data.latestItems);
    setIsLoading(false);
  }



  return (
    <div style={{padding: '3% 5%', background: '#f5f5f5'}}>

        <div display='flex' align='center' style={{ minHeight: '100vh', marginTop: '5%' }}>
          <Spin spinning={isLoading} > 
            <Table  dataSource={latestItems} 
                    columns={columns}
                    scroll={{
                        x: 700,
                    }}
              />
            {/* {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                id={collection.id}
                title={collection.title}
                theme={collection.theme}
                image={collection.image_url}
              />
            ))} */}
          </Spin>
        </div>
    </div>
  );
}

export default Home;