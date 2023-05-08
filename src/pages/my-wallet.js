import Wallet from "@/components/mywallet/Wallet"
import Dashboard from "@/containers/Dashboard"
import DoughnutAssets from "@/components/mywallet/DoughnutAssets"

export default function MyWallet({ wallet }) {

	return (
		<Dashboard>
			<DoughnutAssets assets={wallet} />
			<Wallet assets={wallet} />
		</Dashboard>
	)
};

export async function getServerSideProps(context) {
	const user_id = context.query.user_id;
	let wallet;
	if (user_id) {
		const API_URL = "http://localhost:3000";
		const res = await fetch(`${API_URL}/api/wallet?user_id=${user_id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		wallet = await res.json();
	}

	return { props: { wallet } };
}

