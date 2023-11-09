import React, {useState, useEffect} from 'react';
import { Layout, Button, Switch } from 'antd';
import {
  BulbOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';

const { Header } = Layout;



const Navbar = () => {
    let navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [userAuth, setUserAuth] = useState(false);


    useEffect(() => {
        console.log('t(navbar.language)===', t('navbar.language'));
        sessionStorage.getItem('userId') ? setUserAuth(true) : setUserAuth(false);
    }, [])


    const changeTheme = (checked) => {
        console.log('Theme switched:', checked ? 'light' : 'dark');
    };


    const changeLanguage = (language) => {
        console.log('language=', language);
        i18n.changeLanguage(language, (err, t) => {
          if (err) return console.log('something went wrong loading', err);
        });
      };


    const logOut = () => {
        setUserAuth(false)
        sessionStorage.removeItem("tokenUser")
        sessionStorage.removeItem("userId")
        navigate("/")
    }



  return (
        <Header style={{ background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to="/" style={{ color: '#001529', fontSize: '24px', textDecoration: 'none' }}>
                    Collections
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {userAuth ? 
                        <Button icon={<UserAddOutlined />} onClick={() => logOut()}>
                            Log out
                        </Button>
                    :
                        <>
                        <Button icon={<UserAddOutlined />} onClick={() => navigate("/registration")}>
                            Sign up
                        </Button>
                        <Button icon={<LoginOutlined />} onClick={() => navigate("/login")} style={{ marginLeft: '20px' }}>
                            Login
                        </Button>
                        </>
                    }
                    <Switch
                        checkedChildren={<BulbOutlined />}
                        unCheckedChildren={<BulbOutlined />}
                        defaultChecked
                        onChange={changeTheme}
                        style={{ marginLeft: '20px' }}
                    />
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
