import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { MessageCircle, Send, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Performance constants
const MAX_MESSAGES = 100; // Limit chat messages to prevent memory bloat
const MAX_FORUM_POSTS = 50; // Limit forum posts

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  replies: number;
}

// Memoized time formatter to avoid recreating on every render
const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Memoized message component to prevent unnecessary re-renders
const MessageItem = memo(({ message, currentUsername }: { message: Message; currentUsername: string }) => {
  const time = useMemo(() => formatTime(message.timestamp), [message.timestamp]);

  return (
    <div
      className={`p-3 rounded-lg ${
        message.username === "System"
          ? "bg-purple-500/10 border border-purple-500/30 text-center text-purple-300 text-sm italic"
          : message.username === currentUsername
            ? "bg-cyan-500/10 border border-cyan-500/30 ml-8"
            : "bg-slate-800/50 border border-slate-700/50 mr-8"
      }`}
    >
      {message.username !== "System" && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-cyan-400">
            {message.username}
          </span>
          <span className="text-xs text-gray-500">
            {time}
          </span>
        </div>
      )}
      <p className="text-sm text-gray-300 break-words">
        {message.content}
      </p>
    </div>
  );
});
MessageItem.displayName = "MessageItem";

// Memoized forum post component
const ForumPostItem = memo(({ post }: { post: ForumPost }) => {
  const time = useMemo(() => formatTime(post.timestamp), [post.timestamp]);

  return (
    <Card
      className="bg-slate-900/50 border-cyan-500/20 hover:border-cyan-500/40 transition cursor-pointer"
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{post.title}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
        <p className="text-gray-400 mb-3">{post.content}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-cyan-400">by {post.author}</span>
          <span className="text-gray-500">{post.replies} replies</span>
        </div>
      </CardContent>
    </Card>
  );
});
ForumPostItem.displayName = "ForumPostItem";

export default function Forum() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: "1",
      title: "Welcome to HustleCodex Forum!",
      content: "This is the official forum for HustleCodex community. Share your ideas, ask questions, and connect with other members.",
      author: "Admin",
      timestamp: new Date(),
      replies: 0,
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  // Optimized scroll with instant scrolling to reduce layout thrashing
  const scrollToBottom = useCallback(() => {
    if (shouldScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSetUsername = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
      // Add welcome message
      const welcomeMsg: Message = {
        id: crypto.randomUUID(),
        username: "System",
        content: `${username} has joined the chat!`,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const updated = [...prev, welcomeMsg];
        // Limit messages to MAX_MESSAGES to prevent unbounded growth
        return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
      });
    }
  }, [username]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && username) {
      const message: Message = {
        id: crypto.randomUUID(),
        username,
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const updated = [...prev, message];
        // Limit messages to MAX_MESSAGES to prevent unbounded growth
        return updated.length > MAX_MESSAGES ? updated.slice(-MAX_MESSAGES) : updated;
      });
      setNewMessage("");
    }
  }, [newMessage, username]);

  const handleCreatePost = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim() && username) {
      const post: ForumPost = {
        id: crypto.randomUUID(),
        title: newPostTitle,
        content: newPostContent,
        author: username,
        timestamp: new Date(),
        replies: 0,
      };
      setForumPosts((prev) => {
        const updated = [post, ...prev];
        // Limit forum posts to MAX_FORUM_POSTS to prevent unbounded growth
        return updated.length > MAX_FORUM_POSTS ? updated.slice(0, MAX_FORUM_POSTS) : updated;
      });
      setNewPostTitle("");
      setNewPostContent("");
      setShowNewPostForm(false);
    }
  }, [newPostTitle, newPostContent, username]);

  const toggleNewPostForm = useCallback(() => {
    setShowNewPostForm(prev => !prev);
  }, []);

  if (!isUsernameSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-slate-900/80 border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Join the Forum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetUsername} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Enter your username
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username..."
                  className="bg-slate-800 border-cyan-500/30 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                Enter Forum
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-cyan-500/20 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              HustleCodex Forum
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-400">Logged in as:</span>
            <span className="text-cyan-400 font-semibold">{username}</span>
          </div>
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-cyan-400 transition"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Forum Posts Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Discussion Board</h2>
              <Button
                onClick={toggleNewPostForm}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
              >
                {showNewPostForm ? "Cancel" : "+ New Post"}
              </Button>
            </div>

            {showNewPostForm && (
              <Card className="bg-slate-900/80 border-cyan-500/20 mb-4">
                <CardContent className="pt-6">
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Post Title
                      </label>
                      <Input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Enter post title..."
                        className="bg-slate-800 border-cyan-500/30 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Post Content
                      </label>
                      <Textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Write your post..."
                        className="bg-slate-800 border-cyan-500/30 text-white min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
                    >
                      Create Post
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {forumPosts.map((post) => (
              <ForumPostItem key={post.id} post={post} />
            ))}
          </div>

          {/* Live Chat Section */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/80 border-cyan-500/20 sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
              <CardHeader className="border-b border-cyan-500/20 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-white">Live Chat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message) => (
                    <MessageItem key={message.id} message={message} currentUsername={username} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-800 border-cyan-500/30 text-white"
                  />
                  <Button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
