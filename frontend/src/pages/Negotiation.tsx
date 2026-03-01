import { useState } from 'react';
import { Send, MessageSquare, Repeat2, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  traderName: string;
  shoeName: string;
  lastMessage: string;
  lastTime: Date;
  unread: number;
  myShoe: string;
  theirShoe: string;
  messages: Message[];
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    traderName: 'SneakerKing_NYC',
    shoeName: 'Nike Air Jordan 1 Retro High OG',
    lastMessage: 'Would you consider adding $50 to even out the trade?',
    lastTime: new Date(Date.now() - 1000 * 60 * 15),
    unread: 2,
    myShoe: 'Adidas Yeezy 350 V2 Zebra',
    theirShoe: 'Nike Air Jordan 1 Retro High OG',
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: "Hey! I saw your Yeezy 350 V2 listing. I'm interested in a swap for my Jordan 1s.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: 'm2',
        sender: 'me',
        text: "That sounds interesting! What condition are your Jordan 1s in? I see the AI scored them at 88.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      },
      {
        id: 'm3',
        sender: 'them',
        text: "They're in great shape, barely worn. The score is accurate. Your Yeezys are at 91 though, so there's a slight value difference.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
      {
        id: 'm4',
        sender: 'me',
        text: "True, the condition scores do show a gap. What are you thinking?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: 'm5',
        sender: 'them',
        text: "Would you consider adding $50 to even out the trade?",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
    ],
  },
  {
    id: '2',
    traderName: 'KicksCollector_LA',
    shoeName: 'New Balance 550 White Green',
    lastMessage: 'Deal! I\'ll ship mine out Monday.',
    lastTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unread: 0,
    myShoe: 'Nike Dunk Low Panda',
    theirShoe: 'New Balance 550 White Green',
    messages: [
      {
        id: 'm1',
        sender: 'me',
        text: "Hi! I love your NB 550s. Would you be open to swapping for my Dunk Low Pandas?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
      {
        id: 'm2',
        sender: 'them',
        text: "Oh nice! The Pandas are always in demand. Both scored around 85 on condition, so it's a fair swap.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      },
      {
        id: 'm3',
        sender: 'me',
        text: "Exactly what I was thinking. Both verified authentic too. Want to proceed?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      },
      {
        id: 'm4',
        sender: 'them',
        text: "Deal! I'll ship mine out Monday.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      },
    ],
  },
  {
    id: '3',
    traderName: 'RetroRunner_CHI',
    shoeName: 'Asics Gel-Lyte III OG',
    lastMessage: 'Can you share more photos of the sole?',
    lastTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 1,
    myShoe: 'New Balance 990v5 Grey',
    theirShoe: 'Asics Gel-Lyte III OG',
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: "Interested in your NB 990v5. Classic silhouette. What size?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
      },
      {
        id: 'm2',
        sender: 'me',
        text: "Size 10. They're in excellent condition, AI scored 93. Your Asics look great too!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
      },
      {
        id: 'm3',
        sender: 'them',
        text: "Can you share more photos of the sole?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ],
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function Negotiation() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = useState<string>(initialConversations[0].id);
  const [inputText, setInputText] = useState('');

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSend = () => {
    if (!inputText.trim() || !selectedId) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: inputText.trim(),
              lastTime: new Date(),
            }
          : c
      )
    );
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#FAFAFA', minHeight: '100vh' }}>
      {/* Page Header */}
      <div
        className="border-b py-6 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#141414', borderColor: '#2A2A2A' }}
      >
        <div className="max-w-7xl mx-auto">
          <h1
            className="font-display font-black uppercase text-3xl md:text-4xl"
            style={{ color: '#FAFAFA' }}
          >
            Trade <span style={{ color: '#E11D48' }}>Negotiations</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: '#A0A0A0' }}>
            Message traders, negotiate terms, and finalize your swaps.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className="rounded-xl overflow-hidden flex"
          style={{
            backgroundColor: '#1A1A1A',
            border: '1px solid #2A2A2A',
            height: 'calc(100vh - 260px)',
            minHeight: '500px',
          }}
        >
          {/* Conversations Sidebar */}
          <div
            className="w-80 flex-shrink-0 border-r flex flex-col"
            style={{ borderColor: '#2A2A2A' }}
          >
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{ borderColor: '#2A2A2A', backgroundColor: '#141414' }}
            >
              <MessageSquare className="w-4 h-4" style={{ color: '#E11D48' }} />
              <span className="font-display font-bold uppercase text-sm" style={{ color: '#FAFAFA' }}>
                Conversations
              </span>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ backgroundColor: 'rgba(225,29,72,0.15)', color: '#E11D48' }}
              >
                {conversations.reduce((sum, c) => sum + c.unread, 0)} new
              </span>
            </div>

            <ScrollArea className="flex-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className="w-full text-left px-4 py-4 border-b transition-colors"
                  style={{
                    borderColor: '#2A2A2A',
                    backgroundColor: selectedId === conv.id ? 'rgba(225,29,72,0.08)' : 'transparent',
                    borderLeft: selectedId === conv.id ? '3px solid #E11D48' : '3px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedId !== conv.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedId !== conv.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-bold text-sm truncate" style={{ color: '#FAFAFA' }}>
                      {conv.traderName}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {conv.unread > 0 && (
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: '#E11D48', color: '#FAFAFA' }}
                        >
                          {conv.unread}
                        </span>
                      )}
                      <span className="text-xs" style={{ color: '#555' }}>
                        {formatTime(conv.lastTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Repeat2 className="w-3 h-3 flex-shrink-0" style={{ color: '#E11D48' }} />
                    <span className="text-xs truncate" style={{ color: '#E11D48' }}>
                      {conv.myShoe} ↔ {conv.theirShoe}
                    </span>
                  </div>
                  <p className="text-xs truncate" style={{ color: '#A0A0A0' }}>
                    {conv.lastMessage}
                  </p>
                </button>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Panel */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Header */}
              <div
                className="px-6 py-4 border-b flex items-center gap-4"
                style={{ borderColor: '#2A2A2A', backgroundColor: '#141414' }}
              >
                <div>
                  <div className="font-bold text-sm" style={{ color: '#FAFAFA' }}>
                    {selectedConversation.traderName}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Repeat2 className="w-3 h-3" style={{ color: '#E11D48' }} />
                    <span className="text-xs" style={{ color: '#A0A0A0' }}>
                      {selectedConversation.myShoe}{' '}
                      <span style={{ color: '#E11D48' }}>↔</span>{' '}
                      {selectedConversation.theirShoe}
                    </span>
                  </div>
                </div>
                <div
                  className="ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase"
                  style={{ backgroundColor: 'rgba(225,29,72,0.1)', color: '#E11D48', border: '1px solid rgba(225,29,72,0.2)' }}
                >
                  Negotiating
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm"
                        style={
                          msg.sender === 'me'
                            ? {
                                backgroundColor: '#E11D48',
                                color: '#FAFAFA',
                                borderBottomRightRadius: '4px',
                              }
                            : {
                                backgroundColor: '#2A2A2A',
                                color: '#FAFAFA',
                                borderBottomLeftRadius: '4px',
                              }
                        }
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <div
                          className="flex items-center gap-1 mt-1"
                          style={{ color: msg.sender === 'me' ? 'rgba(255,255,255,0.6)' : '#555' }}
                        >
                          <Clock className="w-2.5 h-2.5" />
                          <span className="text-xs">{formatTime(msg.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div
                className="px-6 py-4 border-t flex items-center gap-3"
                style={{ borderColor: '#2A2A2A', backgroundColor: '#141414' }}
              >
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message or trade offer..."
                  className="flex-1 text-sm"
                  style={{ backgroundColor: '#2A2A2A', borderColor: '#3A3A3A', color: '#FAFAFA' }}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="flex-shrink-0"
                  style={{ backgroundColor: '#E11D48', color: '#FAFAFA', border: 'none' }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4" style={{ color: '#2A2A2A' }} />
                <p style={{ color: '#A0A0A0' }}>Select a conversation to start negotiating</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
