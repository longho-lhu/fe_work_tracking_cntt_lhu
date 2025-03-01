import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/Notification";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { FaUser } from "react-icons/fa";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

type TLoginInfo = {
    user: string;
    pwd: string;
}
export default function LoginPage() {
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState<TLoginInfo>({ user: '', pwd: '' })
    const { showNoti } = useNotification();
    const { updateToken, updateUser } = useAuth();
    const router = useRouter();

    function handleLogin() {
        if (loginInfo.user == '' || loginInfo.pwd == '') {
            showNoti({ title: 'User or password not found', message: '', type: 'error   ' })
            return;
        }
        updateToken('token-right');
        updateUser({ id: 123, userCode: '12345', fullName: 'nva' });
        router.push('/')
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            handleLogin()
        }
    };
    return <>
        <div className="container-fluid d-flex align-items-center justify-content-center login-root">
            <div className="fade-in-from-bottom">
                <div className="text-center " style={{ fontWeight: 'bold', fontSize: 30, textTransform: 'uppercase' }}>Login to work tracking by FIT</div>
                <InputGroup className="mt-5">
                    <Form.Control aria-label="" placeholder="User-code/Username" onKeyDown={handleKeyDown} onChange={(event) => {
                        setLoginInfo(prev => ({ ...prev, user: event.target.value }))
                    }} />
                    <InputGroup.Text><FaUser size={20} color="var(--secondary-color)" /></InputGroup.Text>
                </InputGroup>
                <InputGroup className="mt-3 ">
                    <Form.Control aria-label="" type={showPwd ? "password" : "text"} placeholder="Password" onKeyDown={handleKeyDown} onChange={(event) => {
                        setLoginInfo(prev => ({ ...prev, pwd: event.target.value }))
                    }} />
                    <InputGroup.Text onClick={() => { setShowPwd(prev => !prev) }}>
                        {showPwd ? <IoIosEyeOff size={20} color="var(--secondary-color)" /> : <IoMdEye size={20} color="var(--secondary-color)" />}
                    </InputGroup.Text>
                </InputGroup>
                <div className="text-center mt-3" style={{ paddingBottom: '20%' }}>
                    <button className="login-buton" onClick={handleLogin}>LOGIN</button>
                </div>
            </div>
        </div>
    </>
}