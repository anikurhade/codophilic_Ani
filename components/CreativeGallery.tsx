import Image from "next/image";

type GalleryPhoto = {
  src: string;
  alt: string;
  frameClass: string;
};

const photos: GalleryPhoto[] = [
  {
    src: "/img/creative-orange-scarf.jpeg",
    alt: "Anirudha standing outdoors in a white kurta with an orange scarf",
    frameClass: "aspect-[4/3]",
  },
  {
    src: "/img/creative-misty-meadow.jpeg",
    alt: "Anirudha standing in a vivid green meadow beneath misty hills",
    frameClass: "aspect-[3/4]",
  },
  {
    src: "/img/creative-transunion-stage.jpeg",
    alt: "Anirudha on stage at a TransUnion transformation experience",
    frameClass: "aspect-[4/5]",
  },
  {
    src: "/img/creative-forest-ride.jpeg",
    alt: "Motorcyclist crossing a forested bridge",
    frameClass: "aspect-[3/4]",
  },
  {
    src: "/img/creative-sunset-view.jpeg",
    alt: "Traveler looking across layered hills beneath a warm sunset",
    frameClass: "aspect-[3/4]",
  },
  {
    src: "/img/creative-award.jpeg",
    alt: "Anirudha receiving a performance award at work",
    frameClass: "aspect-[4/5]",
  },
];

function PhotoFrame({ photo }: { photo: GalleryPhoto }) {
  return (
    <figure
      className={`relative mb-4 break-inside-avoid overflow-hidden rounded-lg bg-zinc-900 ${photo.frameClass}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 767px) 50vw, 33vw"
        className="object-cover"
      />
    </figure>
  );
}

export default function CreativeGallery() {
  return (
    <section className="section sunset-section" id="creative">
      <div className="section-head">
        <div>
          <p className="eyebrow">04 / beyond the terminal</p>
          <h2>
            The other
            <br />
            <em>operating system.</em>
          </h2>
        </div>
        <p>Photography, words, and the slow work of becoming more capable than yesterday.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <p className="mono mb-4">THE GALLERY / FRAMES FROM THE FIELD</p>
          <div className="columns-2 gap-4 md:columns-3">
            {photos.map((photo) => (
              <PhotoFrame key={photo.src} photo={photo} />
            ))}
          </div>
        </div>

        <div className="grid content-start gap-4">
          <article className="poem sunset-card">
            <p className="mono">KAVITA / 01</p>
            <blockquote>
              “कभी-कभी,
              <br />
              रास्ते मंज़िल से
              <br />
              ज़्यादा ज़रूरी होते हैं।”
            </blockquote>
            <small>Sometimes, the journey is more important than the destination.</small>
          </article>

          <article className="poem sunset-card">
            <p className="mono">SHAYARI / 02</p>
            <blockquote>
              “रौशनी ढूँढने निकला था,
              <br />
              खुद एक दिया बन गया।”
            </blockquote>
            <small>In searching for light, I became a lamp.</small>
          </article>

          <article className="run-card sunset-card">
            <div>
              <p className="mono">ATHLETE / DISTANCE RUN</p>
              <h3>
                24<span> km</span>
              </h3>
              <p>Progress toward the next long run.</p>
            </div>
            <div className="run-track">
              <span />
            </div>
            <div className="run-meta mono">
              <span>18.4 KM LOGGED</span>
              <span>76.6%</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
