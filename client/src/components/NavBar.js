import React, {useState, useEffect} from 'react';
import { Layout, Button, Switch } from 'antd';
import {
  BulbOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;



const Navbar = () => {
    let navigate = useNavigate();
    const [userAuth, setUserAuth] = useState(false);


    useEffect(() => {
        sessionStorage.getItem('userId') ? setUserAuth(true) : setUserAuth(false);
    }, [])


    const changeTheme = (checked) => {
        console.log('Theme switched:', checked ? 'light' : 'dark');
    };


    const changeLanguage = () => {
        
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
                <div className="logo" style={{ color: '#001529', fontSize: '24px' }}>
                    Collections
                </div>
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
                            Log in
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
                        checkedChildren="EN"
                        unCheckedChildren="RU"
                        defaultChecked
                        onChange={changeLanguage}
                        style={{ marginLeft: '20px' }}
                    />
                </div>
            </div>
        </Header>
  );
};

export default Navbar;
