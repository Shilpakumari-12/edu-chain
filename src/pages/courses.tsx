import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Star, Users, Verified } from "lucide-react";

export function Courses() {
  return (
    <div className="container py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-grotesk font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground">Discover the latest Web3 development courses</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-lg border bg-background"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent/10" title="Filter courses" aria-label="Filter courses">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <div className="flex items-center gap-2 border rounded-lg">
            <button className="p-2 hover:bg-accent/10 rounded-l-lg" title="Grid View" aria-label="Switch to grid view">
              <Grid className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-accent/10 rounded-r-lg" title="List View" aria-label="Switch to list view">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full border hover:bg-accent/10 text-sm"
            title={`Filter by ${category}`}
            
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {course.verified && (
                <div className="absolute top-2 right-2 bg-accent/90 text-white p-1 rounded-full">
                  <Verified className="h-4 w-4" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-poppins font-semibold line-clamp-2">{course.title}</h3>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  {course.rating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{course.price} ETH</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                    {course.tokens} Tokens
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const categories = [
  "All",
  "Blockchain",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "Web3",
  "Solidity",
  "dApps"
];

const courses = [
  {
    id: 1,
    title: "Mastering Solidity: From Basics to Advanced Smart Contracts",
    instructor: "Dr. Elena Martinez",
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&h=400",
    rating: 4.8,
    students: 1234,
    price: 0.5,
    tokens: 500,
    verified: true
  },
  {
    id: 2,
    title: "Building DeFi Applications: A Comprehensive Guide",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&h=400",
    rating: 4.7,
    students: 856,
    price: 0.4,
    tokens: 400,
    verified: true
  },
  {
    id: 3,
    title: "NFT Development: From Creation to Marketplace",
    instructor: "Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&h=400",
    rating: 4.9,
    students: 2156,
    price: 0.6,
    tokens: 600,
    verified: true
  },
  {
    id: 4,
    title: "Web3.js: Building Modern Blockchain Applications",
    instructor: "Michael Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=800&h=400",
    rating: 4.6,
    students: 945,
    price: 0.45,
    tokens: 450,
    verified: false
  }
];
