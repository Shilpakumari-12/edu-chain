import { motion } from "framer-motion"
import { Search, Calendar, MessageSquare, Share2 } from "lucide-react"

export function Blog() {
  return (
    <div className="container py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-grotesk font-bold mb-2">EduChain Blog</h1>
          <p className="text-muted-foreground">Latest insights from the Web3 world</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-2 rounded-lg border bg-background w-full md:w-64"
          />
        </div>
      </div>

      {/* Featured Post */}
      <motion.div
        className="relative rounded-xl overflow-hidden mb-12 group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="aspect-[21/9] relative">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&h=800"
            alt="Featured post"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-accent/90 px-3 py-1 rounded-full text-sm">Web3</span>
            <span className="text-sm">5 min read</span>
          </div>
          <h2 className="text-3xl font-grotesk font-bold mb-4 group-hover:text-accent transition-colors">
            The Future of Decentralized Education: Web3's Impact on Learning
          </h2>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32"
              alt="Author"
              className="w-8 h-8 rounded-full"
            />
            <span>John Doe</span>
            <span>•</span>
            <span>March 15, 2025</span>
          </div>
        </div>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2 hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-muted-foreground hover:text-accent">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:text-accent">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

const posts = [
  {
    id: 1,
    title: "Understanding Zero-Knowledge Proofs in Blockchain",
    excerpt: "An in-depth look at how ZK-proofs are revolutionizing blockchain privacy and scalability...",
    category: "Technology",
    date: "Mar 10, 2025",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&h=400",
    author: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32"
    }
  },
  {
    id: 2,
    title: "The Rise of Decentralized Finance (DeFi)",
    excerpt: "Exploring how DeFi is reshaping traditional financial systems and creating new opportunities...",
    category: "DeFi",
    date: "Mar 8, 2025",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=800&h=400",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32"
    }
  },
  {
    id: 3,
    title: "Smart Contract Security Best Practices",
    excerpt: "Essential security considerations and best practices for developing robust smart contracts...",
    category: "Security",
    date: "Mar 5, 2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&h=400",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32"
    }
  }
]