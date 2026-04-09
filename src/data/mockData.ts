export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  cover: string;
  youtubeId: string;
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
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    durationSeconds: 200,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    youtubeId: "4NRXx6U8ABQ",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    durationSeconds: 203,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    youtubeId: "TUVcZfQe-Kw",
  },
  {
    id: "3",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*ck Love 3",
    duration: "2:21",
    durationSeconds: 141,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    youtubeId: "kTJczUoc26U",
  },
  {
    id: "4",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    duration: "3:58",
    durationSeconds: 238,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    youtubeId: "mRD0-GxDwss",
  },
  {
    id: "5",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    duration: "2:47",
    durationSeconds: 167,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    youtubeId: "H5v3kku4y6Q",
  },
  {
    id: "6",
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    duration: "3:50",
    durationSeconds: 230,
    cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
    youtubeId: "34Na4j8AVgA",
  },
  {
    id: "7",
    title: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    duration: "3:18",
    durationSeconds: 198,
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop",
    youtubeId: "tQ0yjYUFKAE",
  },
  {
    id: "8",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    durationSeconds: 215,
    cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    youtubeId: "XXYlFuWEuKI",
  },
];

export const artists: Artist[] = [
  { id: "1", name: "The Weeknd", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop", genre: "R&B / Pop" },
  { id: "2", name: "Dua Lipa", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", genre: "Pop / Dance" },
  { id: "3", name: "Harry Styles", image: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop", genre: "Pop / Rock" },
  { id: "4", name: "Glass Animals", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=300&fit=crop", genre: "Indie / Alt" },
  { id: "5", name: "Justin Bieber", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop", genre: "Pop / R&B" },
  { id: "6", name: "The Kid LAROI", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop", genre: "Hip Hop / Pop" },
];

export const playlists: Playlist[] = [
  { id: "1", name: "Chill Vibes", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", songCount: 24 },
  { id: "2", name: "Late Night Drive", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", songCount: 18 },
  { id: "3", name: "Morning Energy", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop", songCount: 32 },
  { id: "4", name: "Focus Flow", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", songCount: 15 },
  { id: "5", name: "Weekend Mix", cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop", songCount: 28 },
];

export const newReleases: Song[] = [
  {
    id: "n1",
    title: "Flowers",
    artist: "Miley Cyrus",
    album: "Endless Summer Vacation",
    duration: "3:20",
    durationSeconds: 200,
    cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
    youtubeId: "G7KNmW9a75Y",
  },
  {
    id: "n2",
    title: "Unholy",
    artist: "Sam Smith & Kim Petras",
    album: "Gloria",
    duration: "2:36",
    durationSeconds: 156,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    youtubeId: "Uq9gPaIzbe8",
  },
  {
    id: "n3",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    durationSeconds: 200,
    cover: "https://images.unsplash.com/photo-1484755560615-a4c64e778a6c?w=300&h=300&fit=crop",
    youtubeId: "b1kbLwvqugk",
  },
  {
    id: "n4",
    title: "Calm Down",
    artist: "Rema & Selena Gomez",
    album: "Rave & Roses",
    duration: "3:59",
    durationSeconds: 239,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    youtubeId: "WcIcVapfqXw",
  },
  {
    id: "n5",
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    duration: "3:39",
    durationSeconds: 219,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    youtubeId: "RlPNh_PBZb4",
  },
];
