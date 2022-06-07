import React from "react";
import {
	BellIcon,
	HashtagIcon,
	BookmarkIcon,
	CollectionIcon,
	DotsCircleHorizontalIcon,
	MailIcon,
	UserIcon,
	HomeIcon,
} from "@heroicons/react/outline";
import Image from "next/image";

type Props = {};

function Sidebar({}: Props) {
	return (
		<div>
			<div className="h-10 w-10 relative">
				<Image src="https://links.papareact.com/drq" layout="fill" />
			</div>
		</div>
	);
}

export default Sidebar;
