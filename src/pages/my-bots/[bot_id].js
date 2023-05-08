import OrdersChart from "@/components/mybots/bot/OrdersChart";
import Dashboard from "@/containers/Dashboard";

export default function Bot({ bot_id }) {

	return (
		<Dashboard>
			<OrdersChart />
		</Dashboard>
	);
}

export async function getServerSideProps(context) {
	const bot_id = context.query.bot_id;
	const symbol = 'ETHUSDT';
	const interval = '1h';
	const now = new Date().getTime();
	const one_day = 24 * 60 * 60 * 1000; // 1 jour en millisecondes

	const startTime = Math.floor(Math.random() * (now - one_day) + one_day).toString();
	const endTime = now.toString();
	console.log('start : ', startTime);
	console.log('endTime : ', endTime);
	const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`;
	const res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();
	console.log(data);
	return { props: { bot_id } };
}
