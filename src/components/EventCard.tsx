'use client';
import Link from 'next/link';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EventCard({ id = 'designathon', title = 'Hack Night 101' }: { id?: string; title?: string; }) {
  const [interested, setInterested] = useState(false);
  return (
    <Link href={`/events/${id}`} className="block rounded-3xl border border-black/10 overflow-hidden bg-white">
      <div className="aspect-[16/10] bg-[#F5F5F5]" />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-black/60">
          <div className="h-6 w-6 rounded-full bg-black/10" />
          <span>Tech Club</span>
          <span className="ml-auto rounded-full bg-black/5 px-2 py-1">Posted by club</span>
        </div>
        <h3 className="mt-2 text-lg">{title}</h3>
        <p className="text-sm text-black/60">Fri, 7:00 PM • E-Block Hall</p>

        <div className="mt-4 flex items-center gap-3">
          <motion.span
            whileTap={{ scale: 0.96 }}
            onClick={(e)=>{e.preventDefault(); setInterested(v=>!v);}}
            className={`rounded-full px-4 py-2 text-sm border cursor-pointer ${interested ? 'bg-[#D1A300] text-white border-transparent' : 'bg-white'}`}
          >
            {interested ? 'Interested ✓' : 'Interested'}
          </motion.span>
          <span className="inline-flex items-center gap-1 text-black/70"><MessageCircle size={18}/> 12</span>
          <span className="inline-flex items-center gap-1 text-black/70"><Heart size={18}/> 54</span>
          <span className="inline-flex items-center gap-1 text-black/70"><Share2 size={18}/> Share</span>
        </div>
      </div>
    </Link>
  );
}
