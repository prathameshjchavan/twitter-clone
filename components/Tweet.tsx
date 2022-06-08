import {
	ChatAlt2Icon,
	HeartIcon,
	SwitchHorizontalIcon,
	UploadIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import { Comment, CommentBody, Tweet } from "../typings";
import { fetchComments } from "../utils/fetchComments";

type Props = {
	tweet: Tweet;
};

function Tweet({
	tweet: { _id, profileImg, username, _createdAt, text, image },
}: Props) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const { data: session } = useSession();

	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(_id);
		setComments(comments);
	};

	const postComment = async () => {
		const commentBody: CommentBody = {
			comment: input,
			tweetId: _id,
			username: session?.user?.name || "Unknown User",
			profileImg: session?.user?.image || "https://links.papareact.com/gll",
		};

		const postComment = toast.loading("Posting Comment...");

		await fetch("/api/addComment", {
			body: JSON.stringify(commentBody),
			method: "POST",
		});

		await refreshComments();

		toast("Comment Posted!", {
			id: postComment,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await postComment();

		setInput("");
		setCommentBoxVisible(false);
	};

	useEffect(() => {
		refreshComments();
	}, []);

	return (
		<div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
			<div className="flex space-x-3">
				<img
					className="h-10 w-10 rounded-full object-cover"
					src={profileImg}
					alt="Profile Pic"
				/>

				<div>
					<div className="flex items-center space-x-1">
						<p className="mr-1 font-bold">{username}</p>
						<p className="hidden text-sm text-gray-500 sm:inline">
							@{username.replace(/\s+/g, "").toLowerCase()}
						</p>
						&nbsp;&middot;
						<TimeAgo className="text-sm text-gray-500" date={_createdAt} />
					</div>

					<p className="pt-1">{text}</p>

					{image && (
						<img
							className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
							src={image}
							alt="Tweet Image"
						/>
					)}
				</div>
			</div>

			<div className="flex justify-between mt-5">
				<div
					onClick={() => {
						session
							? setCommentBoxVisible(!commentBoxVisible)
							: toast.error("Please Sign In to Comment");
					}}
					className="link"
				>
					<ChatAlt2Icon className="w-5 h-5" />
					<p>{comments.length}</p>
				</div>
				<div className="link">
					<SwitchHorizontalIcon className="w-5 h-5" />
				</div>
				<div className="link">
					<HeartIcon className="w-5 h-5" />
				</div>
				<div className="link">
					<UploadIcon className="w-5 h-5" />
				</div>
			</div>

			{/* Comment Box Login */}
			{commentBoxVisible && (
				<form onSubmit={handleSubmit} className="flex mt-3 space-x-3">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
						type="text"
						placeholder="Write a comment..."
					/>
					<button
						disabled={!input}
						type="submit"
						className="text-twitter disabled:text-gray-200"
					>
						Post
					</button>
				</form>
			)}

			{comments?.length > 0 && (
				<div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-auto border-t border-gray-100 p-5">
					{comments.map(
						({ _id, username, comment, profileImg, _createdAt }, index) => (
							<div key={_id} className="relative flex space-x-2">
								<hr
									className={`${
										comments.length - 1 === index && "hidden"
									} absolute left-5 top-10 h-8 border-x border-twitter/30`}
								/>
								<img
									src={profileImg}
									className="mt-2 h-7 w-7 rounded-full object-cover"
									alt="Profile Pic"
								/>
								<div>
									<div className="flex items-center space-x-1">
										<p className="mr-1 font-bold">{username}</p>
										<p className="hidden text-sm text-gray-500 lg:inline">
											@{username.replace(/\s+/g, "").toLowerCase()}
											&nbsp;&middot;
										</p>
										<TimeAgo
											className="text-sm text-gray-500"
											date={_createdAt}
										/>
									</div>
									<p>{comment}</p>
								</div>
							</div>
						)
					)}
				</div>
			)}
		</div>
	);
}

export default Tweet;
