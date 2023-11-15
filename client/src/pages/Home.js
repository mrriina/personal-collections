import React, { useState, useEffect } from 'react';
import { Button, Spin, Row, Col } from 'antd';
import { getCollections } from '../http/collectionAPI'
import { getLatestItems } from '../http/itemAPI'
import CollectionCard from '../components/CollectionCard';

function Home() {
  const [collections, setCollections] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title'},
    { title: 'Collection', dataIndex: 'collection', key: 'collection'},
    { title: 'Author', dataIndex: 'author', key: 'author'},
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