import OrdersChart from "@/components/mybots/bot/OrdersChart";
import Dashboard from "@/containers/Dashboard";

export default function Bot({ chart }) {

	return (
		<Dashboard>
			<OrdersChart chart={chart}/>
		</Dashboard>
	);
}

export async function getServerSideProps(context) {
	const bot_id = context.query.bot_id;
	const symbol = 'ETHUSDT';
	const interval = '1h';
	const now = new Date().getTime();
	const one_day = 24 * 60 * 60 * 1000; // 1 jour en millisecondes

	const startTime = Math.floor(now - (6*one_day)).toString();
	const endTime = now.toString();
	console.log('start : ', startTime)
	console.log('endTime : ', endTime)
	const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`;
	const res = await fetch(url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();

	  let chart = {
		timestamps : [],
		open : [],
		close : [],
		hight : [],
		low : []
	}

	  data.map((stick, key)=>{
		chart.timestamps.push(stick[0]);
		chart.open.push(stick[1]);
		chart.close.push(stick[4]);
		chart.hight.push(stick[3]);
		chart.low.push(stick[3]);
	  });

	  console.log('chart : ', chart);
	return { props: { chart } };
}
