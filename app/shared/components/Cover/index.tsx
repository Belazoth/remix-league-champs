interface IProps {
  image: string;
  title: string;
}

export default function Cover({ image, title }: IProps) {
  return (
    <div className="relative h-[70vh] max-h-[500px] w-full bg-black/10">
      <h1 className="absolute text-4xl text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {title}
      </h1>
      <div
        className="h-[70vh] max-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full h-full bg-black/20"></div>
      </div>
    </div>
  );
}
