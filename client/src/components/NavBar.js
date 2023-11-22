import React, {useState, useEffect} from 'react';
import { Layout, Button, Switch, Dropdown, Menu } from 'antd';
import {
  BulbOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { getUser } from '../http/userAPI'

const { Header } = Layout;


const Navbar = () => {
    let navigate = useNavigate();
    const { t } = useTranslation();
    const [user, setUser] = useState();

    useEffect(() => {
        if(sessionStorage.getItem('userId')) {
            getUserInfo(); 
        }
    }, [sessionStorage.getItem('userId')])


    const getUserInfo = async () => {
        const data = await getUser(sessionStorage.getItem('userId'))
        setUser(data.profile);
    }


    const changeTheme = (checked) => {
        console.log('Theme switched:', checked ? 'light' : 'dark');
    };


    const changeLanguage = (language) => {
        i18n.changeLanguage(language, (err, t) => {
          if (err) return console.log('something went wrong loading', err);
        });
      };


    const logOut = () => {
        setUser(null);
        sessionStorage.removeItem("tokenUser")
        sessionStorage.removeItem("userId")
        navigate("/")
    }


    const menu = (
        <Menu>
            <Menu.Item key="profile" onClick={() => {navigate("/profile")}}>
                {t('navbar.profile')}
            </Menu.Item>
            <Menu.Item key="logout" onClick={logOut}>
                {t('navbar.logout')}
            </Menu.Item>
        </Menu>
      );



  return (
        <Header style={{ background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ color: '#001529', fontSize: '24px', textDecoration: 'none' }}>
                    Collections
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    {user ? (
                        <Dropdown overlay={menu} placement="bottomLeft">
                        <Button icon={<UserOutlined />} style={{ marginRight: '20px' }}>
                            {user.name}
                        </Button>
                        </Dropdown>
                    ) : (
                        <>
                        <Button icon={<UserAddOutlined />} onClick={() => navigate('/registration')}>
                            {t('navbar.signup')}
                        </Button>
                        <Button icon={<LoginOutlined />} onClick={() => navigate('/login')} style={{ marginLeft: '20px' }}>
                            {t('navbar.login')}
                        </Button>
                        </>
                    )}
                    {/* <Switch
                        checkedChildren={<BulbOutlined />}
                        unCheckedChildren={<BulbOutlined />}
                        defaultChecked
                        onChange={changeTheme}
                        style={{ marginLeft: '20px' }}
                    /> */}
                    <Switch
                        checkedChildren={t('navbar.language')}
                        unCheckedChildren={t('navbar.language')}
                        defaultChecked
                        onChange={() => changeLanguage(i18n.language === 'en' ? 'ru' : 'en')}
                        style={{ marginLeft: '20px' }}
                    />
                </div>
            </div>
        </Header>
  );
};

export default Navbar;
