import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthProvider';

export default function MetamaskButton() {
    const {account, setAccount} = useContext(AuthContext);
    const [accountSlice, setAccountSlice] = useState();

    useEffect(()=>{
        localMetamaskAddress(account);
    },[account]);

    const localMetamaskAddress = (account)=> {
        if(account){
            const splitAddress = account.metamask_address.slice(0,12)+'...';
            setAccountSlice(splitAddress);
        }
    }

    async function checkOrCreateUser(metamask_address) {
        try {
            const response = await fetch(`/api/login?metamask_address=${metamask_address}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const user = await response.json();
            return user;
        } catch (error) {
            console.error(error);
        }
    }

    async function handleMetamaskClick() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        const selectedAccount = accounts[0];
        const user = await checkOrCreateUser(selectedAccount);
        setAccount(user);
    }

    return (
        <div>
            <button className="enableEthereumButton bg-[#dc1f30] p-1 rounded-md mr-8" onClick={handleMetamaskClick}>
                {account ? <span className='text-white'>{accountSlice}</span> : <span>Connect to MetaMask</span>}
            </button>
        </div>
    );
}