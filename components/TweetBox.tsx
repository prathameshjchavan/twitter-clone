import Image from "next/image";
import {
	CalendarIcon,
	EmojiHappyIcon,
	LocationMarkerIcon,
	PhotographIcon,
	SearchCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";

function TweetBox() {
	const [input, setInput] = useState<string>("");

	return (
		<div className="flex space-x-2 p-5">
			<div className="relative h-14 w-14 mt-4 rounded-full overflow-hidden">
				<Image
					src="https://links.papareact.com/gll"
					alt="Profile Pic"
					layout="fill"
				/>
			</div>

			<div className="flex flex-1 pl-2">
				<form className="flex flex-1 flex-col">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="h-24 w-full text-xl outline-none placeholder:text-xl"
						type="text"
						placeholder="What's Happening?"
					/>
					<div className="flex items-center">
						<div className="flex space-x-2 text-twitter flex-1">
							<PhotographIcon className="cursor-pointer transition-transform duration-150 ease-out hover:scale-150 h-5 w-5" />
							<SearchCircleIcon className="h-5 w-5" />
							<EmojiHappyIcon className="h-5 w-5" />
							<CalendarIcon className="h-5 w-5" />
							<LocationMarkerIcon className="h-5 w-5" />
						</div>
						<button
							disabled={!input}
							className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
						>
							Tweet
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TweetBox;