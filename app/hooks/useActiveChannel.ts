import { useEffect, useState } from "react";
import useActiveList from "./useActiveLists";
import  {Channel } from "pusher-js"
import { pusherClient } from "../libs/pusher";
import { Members} from "pusher-js";


const useActiveChannel = () => {
  const { set, add, remove} = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel |null>(null);

  useEffect(() => {
    let channel = activeChannel;
  
    if(!channel){
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }
  
    channel.bind('pusher:subscription_succeeded', (members: Members) =>{
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string,any>) => {
      add(member.id);
    })

    channel.bind("pusher:member_removed", (member: Record<string,any>) => {
      remove(member.id);
    })

    return () => {
      if(activeChannel){
        pusherClient.unsubscribe('precense-messenger');
        setActiveChannel(null);
      }
    }

  }, [activeChannel, set, remove, add]);
  
};


export default useActiveChannel;