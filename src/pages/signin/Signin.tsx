import axios from 'axios';
import ConnectMetamask from 'components/connect-metamask/connect-metamask';
import { signInWithCustomToken, signOut } from 'firebase/auth';
import getLinker from 'helper/deep-link/deep-link';
import mobileCheck from 'helper/mobile-check/mobile-check';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { auth, logInWithEmailAndPassword, signinMetamask, signInWithGoogle } from '../../services/firebase';
import './Signin.css';

export default function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // metamask
    const [address, setAddress] = useState("");
    const [metamaskLoading, setMetamaskLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/home', { replace: true });
    }, [user, loading, navigate]);

    const onPressConnect = async () => {

        setMetamaskLoading(true);

        try {
            const yourWebUrl = "mysite.com"; // Replace with your website domain
            const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
            const downloadMetamaskUrl = "https://metamask.io/download.html";

            if ((window as any)?.ethereum?.isMetaMask) {
                // Desktop browser
                const accounts = await (window as any).ethereum.request({
                    method: "eth_requestAccounts",
                });

                const account = Web3.utils.toChecksumAddress(accounts[0]);

                handleLogin(account);
                // setAddress(account);

            } else if (mobileCheck()) {
                // Mobile browser
                const linker = getLinker(downloadMetamaskUrl) as any;
                linker.openURL(deepLink);
            } else {
                window.open(downloadMetamaskUrl);
            }
        } catch (error) {
            console.log(error);
        }

        setMetamaskLoading(false);
    };

    const handleLogin = async (address: any) => {
        console.log('address', address);
        await signinMetamask(address);
        setAddress(address);
    };

    const onPressLogout = () => {
        setAddress("");
        signOut(auth);
    };

    // const onPressLogout = () => setAddress("");

    return (
        <>
            <div className="login">
                <div className="logo">
                    <img src="./logo.svg" alt="" />
                </div>
                <div className="button">
                    <ConnectMetamask onPressConnect={() => onPressConnect()}
                        onPressLogout={() => onPressLogout()}
                        loading={loading}
                        address={address} />
                </div>
            </div>
        </>
    )
}
