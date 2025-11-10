# Adding Your Own Music

To add your own relaxing piano music:

1. Place your music file (MP3 format recommended) in this `public` folder
2. Name it something like `relaxing-piano.mp3`
3. Update `src/components/MusicPlayer.tsx` line 14 to:
   ```typescript
   audio.src = '/relaxing-piano.mp3'
```

You can download free relaxing piano music from:
- Pixabay: https://pixabay.com/music/search/piano/
- Free Music Archive: https://freemusicarchive.org/
- YouTube Audio Library: https://www.youtube.com/audiolibrary

Make sure the music is royalty-free and you have permission to use it.

