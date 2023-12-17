import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { Layout, Button, Switch, Dropdown, Menu } from 'antd';
import { UserOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons';
import { getUser } from '../http/userAPI'
import { HOME_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/consts'

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

    const changeLanguage = (language) => {
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    };

    const logOut = () => {
        setUser(null);
        sessionStorage.removeItem("tokenUser")
        sessionStorage.removeItem("userId")
        navigate(HOME_ROUTE)
    }

    const menu = (
        <Menu>
            <Menu.Item key="profile" onClick={() => {navigate(PROFILE_ROUTE)}}>
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
                <Link to={HOME_ROUTE} style={{ color: '#001529', fontSize: '24px', textDecoration: 'none' }}>
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
                        <Button icon={<UserAddOutlined />} onClick={() => navigate(REGISTRATION_ROUTE)}>
                            {t('navbar.signup')}
                        </Button>
                        <Button icon={<LoginOutlined />} onClick={() => navigate(LOGIN_ROUTE)} style={{ marginLeft: '20px' }}>
                            {t('navbar.login')}
                        </Button>
                        </>
                    )}
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