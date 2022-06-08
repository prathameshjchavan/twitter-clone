import {
	CalendarIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
	PhotographIcon,
	SearchCircleIcon,
} from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import toast from "react-hot-toast";

type Props = {
	setTweets: Dispatch<SetStateAction<Tweet[]>>;
};

function TweetBox({ setTweets }: Props) {
	const [input, setInput] = useState<string>("");
	const [image, setImage] = useState<string>("");
	const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const { data: session } = useSession();

	const addImageToTweet = (
		e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();

		if (!imageInputRef.current?.value) return;

		setImage(imageInputRef.current.value);
		imageInputRef.current.value = "";
		setImageUrlBoxIsOpen(false);
	};

	const postTweet = async () => {
		const tweetBody: TweetBody = {
			text: input,
			username: session?.user?.name || "Unknown User",
			profileImg: session?.user?.image || "https://links.papareact.com/gll",
			image,
		};

		const postToast = toast.loading("Posting Tweet...");

		await fetch("/api/addTweet", {
			body: JSON.stringify(tweetBody),
			method: "POST",
		});

		const newTweets = await fetchTweets();
		setTweets(newTweets);

		toast("Tweet Posted!", {
			icon: "🚀",
			id: postToast,
		});
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		await postTweet();

		setInput("");
		setImage("");
		setImageUrlBoxIsOpen(false);
	};

	return (
		<div className="flex space-x-2 p-5">
			<img
				className="mt-4 h-14 w-14 rounded-full object-cover"
				src={session?.user?.image || "https://links.papareact.com/gll"}
				alt="Profile Pic"
			/>

			<div className="flex flex-1 pl-2">
				<form className="flex flex-1 flex-col">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						disabled={!session}
						className="h-24 w-full text-xl outline-none placeholder:text-xl"
						type="text"
						placeholder={
							session ? "What's Happening?" : "Please Sign In to Tweet"
						}
					/>
					<div className="flex items-center">
						<div className="flex space-x-2 text-twitter flex-1">
							<PhotographIcon
								onClick={() =>
									session && setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)
								}
								className={`h-5 w-5 ${
									session &&
									"cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
								}`}
							/>
							<SearchCircleIcon className="h-5 w-5" />
							<EmojiHappyIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<LocationMarkerIcon className="h-5 w-5" />
						</div>
						<button
							onClick={handleSubmit}
							disabled={!input || !session}
							className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
					{imageUrlBoxIsOpen && (
						<form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
							<input
								ref={imageInputRef}
								className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
								type="text"
								placeholder="Enter Image URL..."
							/>
							<button
								type="submit"
								onClick={addImageToTweet}
								className="font-bold text-white"
							>
								Add Image
							</button>
						</form>
					)}

					{image && (
						<img
							className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
							src={image}
							alt="Tweet Image"
						/>
					)}
				</form>
			</div>
		</div>
	);
}

export default TweetBox;
