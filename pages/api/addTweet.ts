import type { NextApiRequest, NextApiResponse } from "next";
import { TweetBody } from "../../typings";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { text, username, profileImg, image }: TweetBody = JSON.parse(req.body);
	const mutations = {
		mutations: [
			{
				create: {
					_type: "tweet",
					text,
					username,
					blockTweet: false,
					profileImg,
					image,
				},
			},
		],
	};

	const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

	await fetch(apiEndpoint, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.SANTIY_API_TOKEN}`,
		},
		body: JSON.stringify(mutations),
		method: "POST",
	});

	res.status(201).json({ message: "Tweet Added!" });
}
