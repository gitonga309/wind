export type Message = {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  messages: Message[];
};

export const chats: Chat[] = [
  {
    id: 'maya',
    name: 'Maya',
    avatar: 'M',
    color: '#ffd7d9',
    messages: [
      { id: 'm1', sender: 'other', text: 'Happy birthday, love! I wrote you a little note.', timestamp: '9:14 AM' },
      { id: 'm2', sender: 'me', text: 'Aww thank you ❤️ I can’t wait to read it.', timestamp: '9:16 AM' },
      { id: 'm3', sender: 'other', text: 'You are my favorite person in the world. Keep shining. ✨', timestamp: '9:18 AM' },
    ],
  },
  {
    id: 'nairobi',
    name: 'Nairobi',
    avatar: 'N',
    color: '#dbeafe',
    messages: [
      { id: 'n1', sender: 'other', text: 'The new plan sounds amazing 🎉', timestamp: 'Yesterday' },
      { id: 'n2', sender: 'me', text: 'Then lets make it official this weekend.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'darius',
    name: 'Darius',
    avatar: 'D',
    color: '#dcfce7',
    messages: [
      { id: 'd1', sender: 'other', text: 'Hope you are doing well 💌', timestamp: 'Mon' },
    ],
  },
  {
    id: 'aisha',
    name: 'Aisha',
    avatar: 'A',
    color: '#fef3c7',
    messages: [
      { id: 'a1', sender: 'me', text: 'Thank you for always being there for me.', timestamp: 'Sun' },
      { id: 'a2', sender: 'other', text: 'Always 😊', timestamp: 'Sun' },
    ],
  },
];
