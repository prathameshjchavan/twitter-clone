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
import SidebarRow from "./SidebarRow";

function Sidebar() {
	return (
		<div className="flex flex-col col-span-2">
			<div className="h-10 w-10 relative">
				<Image src="https://links.papareact.com/drq" layout="fill" />
			</div>
			<SidebarRow Icon={HomeIcon} title="Home" />
			<SidebarRow Icon={HashtagIcon} title="Explore" />
			<SidebarRow Icon={BellIcon} title="Notifications" />
			<SidebarRow Icon={MailIcon} title="Messages" />
			<SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
			<SidebarRow Icon={CollectionIcon} title="Lists" />
			<SidebarRow Icon={UserIcon} title="Sign In" />
			<SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
		</div>
	);
}

export default Sidebar;
