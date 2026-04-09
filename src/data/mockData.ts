export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  songCount: number;
}

export const songs: Song[] = [
  { id: "1", title: "Midnight Dreams", artist: "Aurora Wave", album: "Neon Horizons", duration: "3:42", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
  { id: "2", title: "Electric Soul", artist: "Neon Pulse", album: "Digital Heart", duration: "4:15", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "3", title: "Starlight Avenue", artist: "Luna Echo", album: "Cosmic Drift", duration: "3:58", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop" },
  { id: "4", title: "Ocean Waves", artist: "Deep Current", album: "Blue Depths", duration: "5:02", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
  { id: "5", title: "City Lights", artist: "Metro Sound", album: "Urban Pulse", duration: "3:33", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
  { id: "6", title: "Velvet Night", artist: "Shadow Sync", album: "Dark Bloom", duration: "4:28", cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop" },
  { id: "7", title: "Golden Hour", artist: "Sunrise Kit", album: "Warm Glow", duration: "3:19", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop" },
  { id: "8", title: "Crystal Rain", artist: "Aurora Wave", album: "Neon Horizons", duration: "4:47", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" },
];

export const artists: Artist[] = [
  { id: "1", name: "Aurora Wave", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop", genre: "Synthwave" },
  { id: "2", name: "Neon Pulse", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", genre: "Electro" },
  { id: "3", name: "Luna Echo", image: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop", genre: "Dream Pop" },
  { id: "4", name: "Deep Current", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop", genre: "Ambient" },
  { id: "5", name: "Metro Sound", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", genre: "Indie" },
  { id: "6", name: "Shadow Sync", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop", genre: "Dark Wave" },
];

export const playlists: Playlist[] = [
  { id: "1", name: "Chill Vibes", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", songCount: 24 },
  { id: "2", name: "Late Night Drive", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", songCount: 18 },
  { id: "3", name: "Morning Energy", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop", songCount: 32 },
  { id: "4", name: "Focus Flow", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", songCount: 15 },
  { id: "5", name: "Weekend Mix", cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop", songCount: 28 },
];

export const newReleases: Song[] = [
  { id: "n1", title: "Neon Dreams", artist: "Aurora Wave", album: "Neon Horizons II", duration: "3:55", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop" },
  { id: "n2", title: "Pulse", artist: "Neon Pulse", album: "Frequency", duration: "4:10", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "n3", title: "Echoes", artist: "Luna Echo", album: "Resonance", duration: "3:48", cover: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop" },
  { id: "n4", title: "Drift", artist: "Deep Current", album: "Tides", duration: "5:22", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
  { id: "n5", title: "Signal", artist: "Metro Sound", album: "Broadcast", duration: "3:37", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
];
