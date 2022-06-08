import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { GetServerSideProps } from "next";
import { fetchTweets } from "../utils/fetchTweets";
import { Tweet } from "../typings";
import { Toaster } from "react-hot-toast";

type Props = {
	tweets: Tweet[];
};

const Home = ({ tweets }: Props) => {
	return (
		<div className="lg:max-w-6xl mx-auto max-h-screen">
			<Head>
				<title>Twitter Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toaster />

			<main className="grid grid-cols-9">
				<Sidebar />

				<Feed tweets={tweets} />

				<Widgets />
			</main>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
	const tweets = await fetchTweets();

	return {
		props: {
			tweets,
		},
	};
};
