import Image from "next/image";
import RecipeFinder from "./Components/Recipe Finder/RecipeFinder";

export default function Home() {
  return (
    <div className=" min-h-[100vh] relative z-0 inset-0 py-0">
        <Image
         src="/bg-image.webp"
         alt="background image"
        //  width={1920}
        //  height={1080}
         fill
         className="absolute inset-0 z-[-1] object-cover object-center"
        />
        <RecipeFinder/>
    </div>
  );
}
