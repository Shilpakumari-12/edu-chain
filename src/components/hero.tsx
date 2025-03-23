import { motion } from "framer-motion"
import { ArrowRight, Wallet, BookOpen, Award } from "lucide-react"
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function Hero() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleConnect = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is required! Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const address = accounts[0];
      setWalletAddress(address);
      localStorage.setItem('walletAddress', address);

    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <section className="min-h-screen pt-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary via-accent to-secondary opacity-10 animate-gradient-x" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-grotesk font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Master Web3 Development
            <span className="text-accent"> Today</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-inter text-muted-foreground mb-8 md:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Learn blockchain development from industry experts and earn verifiable credentials
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-poppins flex items-center justify-center gap-2 transition-colors"
            >
              Start Learning
              <ArrowRight className="h-5 w-5" />
            </button>
            
            {!walletAddress ? (
              <button 
                onClick={handleConnect}
                type="button"
                className="w-full sm:w-auto border-2 border-accent hover:bg-accent/10 text-white px-8 py-4 rounded-lg font-poppins transition-colors cursor-pointer"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="text-accent font-bold px-8 py-4 border-2 border-accent rounded-lg">
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </div>
            )}
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glassmorphism rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            >
              <feature.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-poppins font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20 md:mt-32 px-4">
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-center mb-12 md:mb-16">
            Trusted by <span className="text-accent ">Developers</span> Worldwide
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="glassmorphism rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-poppins font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Learn by Building",
    description: "Get hands-on experience building real blockchain applications with guided projects",
    icon: Wallet
  },
  {
    title: "Earn NFT Certificates",
    description: "Receive blockchain-verified certificates for completed courses",
    icon: Award
  },
  {
    title: "Join the Community",
    description: "Connect with other blockchain developers and industry experts",
    icon: BookOpen
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Blockchain Developer",
    text: "The practical approach to learning Web3 development helped me transition from traditional web development seamlessly.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128"
  },
  {
    name: "Michael Rodriguez",
    role: "Smart Contract Engineer",
    text: "The NFT certificates I earned helped me land my dream job in Web3. The hands-on projects were invaluable.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=128&h=128"
  },
  {
    name: "Alex Thompson",
    role: "DApp Developer",
    text: "The community support and expert guidance made learning complex blockchain concepts much easier.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128"
  }
]

// Add this to your global.d.ts file or at the top of this file
declare global {
  interface Window {
    ethereum?: any;
  }
}