import { useCallback, useMemo, useState } from "react";

import {
	MOCK_CONVERSATIONS,
	MOCK_MESSAGES_BY_CONVERSATION,
} from "@/mocks/customer-messages.mock";
import type { ChatMessage, ConversationSummary } from "@/types/messages.types";

function formatBubbleTime(iso: string) {
	try {
		return new Date(iso).toLocaleTimeString(undefined, {
			hour: "numeric",
			minute: "2-digit",
		});
	} catch {
		return "";
	}
}

let messageIdSeq = 1000;

export const useCustomerMessages = () => {
	const [conversations, setConversations] = useState<ConversationSummary[]>(
		() => [...MOCK_CONVERSATIONS],
	);
	const [messagesByConversation, setMessagesByConversation] = useState<
		Record<string, ChatMessage[]>
	>(() => {
		const copy: Record<string, ChatMessage[]> = {};
		for (const [k, v] of Object.entries(MOCK_MESSAGES_BY_CONVERSATION)) {
			copy[k] = v.map((m) => ({ ...m }));
		}
		return copy;
	});
	const [activeConversationId, setActiveConversationId] = useState(
		MOCK_CONVERSATIONS[0]?.id ?? "",
	);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredConversations = useMemo(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return conversations;
		return conversations.filter(
			(c) =>
				c.title.toLowerCase().includes(q) ||
				c.lastPreview.toLowerCase().includes(q),
		);
	}, [conversations, searchQuery]);

	const activeConversation = useMemo(
		() => conversations.find((c) => c.id === activeConversationId) ?? null,
		[conversations, activeConversationId],
	);

	const activeMessages = useMemo(
		() => messagesByConversation[activeConversationId] ?? [],
		[messagesByConversation, activeConversationId],
	);

	const selectConversation = useCallback((id: string) => {
		setActiveConversationId(id);
		setConversations((prev) =>
			prev.map((c) => (c.id === id ? { ...c, unread: false } : c)),
		);
	}, []);

	const sendMessage = useCallback(
		(body: string) => {
			const trimmed = body.trim();
			if (!trimmed || !activeConversationId) return;

			const newMessage: ChatMessage = {
				id: `local-${messageIdSeq++}`,
				conversationId: activeConversationId,
				body: trimmed,
				direction: "out",
				createdAt: new Date().toISOString(),
			};

			setMessagesByConversation((prev) => ({
				...prev,
				[activeConversationId]: [
					...(prev[activeConversationId] ?? []),
					newMessage,
				],
			}));

			setConversations((prev) =>
				prev.map((c) =>
					c.id === activeConversationId
						? {
								...c,
								lastPreview: trimmed,
								lastAtLabel: "Just now",
								unread: false,
							}
						: c,
				),
			);
		},
		[activeConversationId],
	);

	return {
		searchQuery,
		setSearchQuery,
		filteredConversations,
		activeConversationId,
		activeConversation,
		activeMessages,
		selectConversation,
		sendMessage,
		formatBubbleTime,
	};
};
