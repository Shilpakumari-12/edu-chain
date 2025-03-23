import { motion } from "framer-motion"
import { Search, MessageSquare, TrendingUp, Filter, ThumbsUp, ThumbsDown, MessageCircle, Pin, Share2 } from "lucide-react"
import { useState } from "react"

export function Community() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="container py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-grotesk font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Join discussions with fellow learners and instructors</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="pl-10 pr-4 py-2 rounded-lg border bg-background w-64"
            />
          </div>
          <button className="bg-accent text-white px-4 py-2 rounded-lg font-inter hover:bg-accent/90 transition-colors flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeCategory === category
                ? "bg-accent text-white border-accent"
                : "hover:bg-accent/10 border-border"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Trending Discussions */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-poppins font-semibold">Trending Discussions</h2>
            </div>
            <div className="space-y-4">
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-poppins font-semibold">{discussion.author.name}</h3>
                        <span className="text-sm text-muted-foreground">• {discussion.timeAgo}</span>
                        {discussion.pinned && (
                          <span className="flex items-center gap-1 text-sm text-accent">
                            <Pin className="h-3 w-3" />
                            Pinned
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-medium mb-2">{discussion.title}</h4>
                      <p className="text-muted-foreground mb-4">{discussion.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm hover:text-accent">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.upvotes}
                        </button>
                        <button className="flex items-center gap-1 text-sm hover:text-accent">
                          <ThumbsDown className="h-4 w-4" />
                          {discussion.downvotes}
                        </button>
                        <button className="flex items-center gap-1 text-sm hover:text-accent">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.comments}
                        </button>
                        <button className="flex items-center gap-1 text-sm hover:text-accent ml-auto">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Top Contributors */}
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="font-poppins font-semibold mb-4">Top Contributors</h3>
            <div className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.contributions} contributions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat */}
          <div className="p-6 rounded-xl border bg-card">
            <h3 className="font-poppins font-semibold mb-4">Live Chat</h3>
            <div className="h-64 border rounded-lg mb-4 p-4 overflow-y-auto">
              {/* Chat messages would go here */}
              <p className="text-center text-muted-foreground">Connect your wallet to join the chat</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg border bg-background"
                disabled
              />
              <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors" disabled>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = [
  "All",
  "Blockchain",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "Web3",
  "General"
]

const discussions = [
  {
    id: 1,
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32"
    },
    title: "Best practices for gas optimization in Solidity?",
    content: "I'm working on a DeFi project and looking for ways to optimize gas usage. What are some proven strategies you've used?",
    timeAgo: "2 hours ago",
    upvotes: 24,
    downvotes: 2,
    comments: 8,
    pinned: true
  },
  {
    id: 2,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32"
    },
    title: "Understanding Zero-Knowledge Proofs",
    content: "Can someone explain ZK-proofs in simple terms? I'm trying to grasp the basic concepts before diving deeper.",
    timeAgo: "4 hours ago",
    upvotes: 15,
    downvotes: 1,
    comments: 12,
    pinned: false
  },
  {
    id: 3,
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32"
    },
    title: "Web3 Security Considerations",
    content: "What security measures do you implement in your dApps? Looking for comprehensive security practices.",
    timeAgo: "6 hours ago",
    upvotes: 32,
    downvotes: 3,
    comments: 15,
    pinned: false
  }
]

const topContributors = [
  {
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32",
    contributions: 156
  },
  {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32",
    contributions: 142
  },
  {
    name: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32",
    contributions: 128
  }
]