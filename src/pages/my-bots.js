import BotsDashboard from "@/components/mybots/BotsDashboard";
import Dashboard from "@/containers/Dashboard";
export default function MyBots({ bots }) {
	console.log(bots)
	return (
		<Dashboard>
			<BotsDashboard bots={bots} />
		</Dashboard>
	)
};

export async function getServerSideProps(context) {
	const user_id = context.query.user_id;

	const API_URL = "http://localhost:3000";
	const res = await fetch(`${API_URL}/api/bots?user_id=${user_id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();

	return { props: { bots: data.bots } };
}