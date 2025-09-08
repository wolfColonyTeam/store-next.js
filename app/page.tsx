import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Image from "next/image";
import ShopHomePage from "@/components/home/Content";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
          <div>
            <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
              test badge text
            </Badge>
            <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
              Customized Shadcn UI Blocks & Components
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg">
              Explore a collection of Shadcn UI blocks and components, ready to
              preview and copy. Streamline your development workflow with
              easy-to-implement examples.
            </p>
          </div>
          <div className="w-full  aspect-video bg-accent rounded-xl">
            <div className="h-full relative">
              <Image
                className="rounded-2xl"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill={true}
                src="/hero-logo.webp"
                alt="Helo logo of the stroe"
              />
            </div>
          </div>
        </div>
      </div>
      <ShopHomePage />
    </>
  );
};

export default Home;
