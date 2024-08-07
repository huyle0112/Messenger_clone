import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationsList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList
          users={users}
          initialItems={conversations}
          />
        {children}
      </div>
    </Sidebar>
  )
}