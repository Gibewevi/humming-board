import { createContext, useContext, useEffect, useState } from "react"
export const AuthContext = createContext();
import detectEthereumProvider from '@metamask/detect-provider';

function AuthProvider(props) {
    const [account, setAccount] = useState();

    useEffect(()=> {
        console.log('account AUTH : ',account);        
    },[account]);

    useEffect(() => {
        async function checkMetaMaskAuthentication() {
            const provider = await detectEthereumProvider();
            if (provider) {
                // From now on, this should always be true:
                // provider === window.ethereum
                startApp(provider); // initialize your app
            } else {
                console.log('Please install MetaMask!');
            }
        }
        checkMetaMaskAuthentication();
    }, []);

    async function startApp(provider) {
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
        // Access the decentralized web!
        console.log("Access the decentralized web!");
    }

    return (
        <AuthContext.Provider value={{account, setAccount}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
