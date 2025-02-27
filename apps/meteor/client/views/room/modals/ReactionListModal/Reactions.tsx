import type { IMessage } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { ReactElement, UIEvent } from 'react';
import React from 'react';

import Emoji from '../../../../components/Emoji';
import ReactionUserTag from './ReactionUserTag';

type ReactionsProps = {
	reactions: Required<IMessage>['reactions'];
	onOpenUserCard?: (e: UIEvent, username: string) => void;
};

const Reactions = ({ reactions, onOpenUserCard }: ReactionsProps): ReactElement => {
	const useRealName = useSetting('UI_Use_Real_Name');

	return (
		<Box display='flex' flexDirection='column'>
			{Object.entries(reactions).map(([reaction, { names = [], usernames }]) => (
				<Box key={reaction} display='flex' alignItems='center' flexDirection='row' overflowX='hidden' mb={8}>
					<Emoji emojiHandle={reaction} />
					<Box display='flex' flexWrap='wrap' paddingBlock={4} mis={4}>
						{usernames.map((username, i: number) => (
							<ReactionUserTag
								key={username}
								displayName={useRealName ? names[i] || username : username}
								username={username}
								onOpenUserCard={onOpenUserCard}
							/>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Reactions;
