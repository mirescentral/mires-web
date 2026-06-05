import { ArrowRight } from 'lucide-react';

// Esta función se ejecuta en el servidor y cachea el resultado por 1 hora
async function getVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=6&type=video`;

  const res = await fetch(url, { next: { revalidate: 3600 } }); // Revalida cada hora
  const data = await res.json();
  return data.items || [];
}

export const metadata = { title: "Mensajes | MIRES" };

export default async function SermonesPage() {
  const videos = await getVideos();

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-32">
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center fade-in-up">
          <span className="font-sans text-xs font-bold tracking-[0.25em] uppercase text-eden-muted mb-6 block">Mensajes</span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] mb-8">Escucha <br/> Su Palabra.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
            Explora nuestras enseñanzas más recientes. Encuentra dirección, paz y propósito para tu vida diaria.
          </p>
        </div>
      </section>

      <section className="py-24 bg-eden-white border-t border-eden-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {videos.map((video: any) => (
              <a 
                key={video.id.videoId} 
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                className="group cursor-pointer"
              >
                <div className="aspect-video w-full bg-eden-black relative overflow-hidden mb-6">
                  <img 
                    src={video.snippet.thumbnails.high.url} 
                    alt={video.snippet.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 text-eden-black line-clamp-2">{video.snippet.title}</h3>
                <p className="font-sans text-eden-muted text-xs uppercase tracking-widest font-semibold mb-4">
                  {new Date(video.snippet.publishedAt).toLocaleDateString('es-CL')}
                </p>
              </a>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}