import React from "react";
import ReactTimeago from "react-timeago";

type Props = {
	_createdAt: string;
};

function TimeAgo({ _createdAt }: Props) {
	return <ReactTimeago className="text-sm text-gray-500" date={_createdAt} />;
}

export default TimeAgo;
