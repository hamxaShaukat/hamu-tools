import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { DollarSign, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
interface IconProps extends React.SVGProps<SVGSVGElement> {}

interface DirectoryPageProps {
  title: string;
  category: string;
  description: string;
  bio: string;
  likes: number;
  price: number;
  logo: string;
  url: string;
}

const DirectoryPage: React.FC<DirectoryPageProps> = ({
  title,
  category,
  description,
  bio,
  likes,
  price,
  logo,
  url,
}) => {
  return (
    <div className="flex flex-col h-screen bg-background ">
      <div className="text-center text-3xl font-black my-8">{title}</div>
      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-4 grid gap-6">
          <Card>
            <CardContent className="grid gap-4 p-8">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={logo}
                    alt="Vendor"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="grid gap-1">
                  <h2 className="text-lg font-semibold">{bio}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href={url} prefetch={false}>
                      <Button className="flex items-center gap-2">
                        <SquareArrowOutUpRight className="h-6 w-6" />
                        <p>Visit {title}</p>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                <p>{price}</p>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
            <h2 className="text-lg font-semibold">Category</h2>
            <Link
              href="#"
              className="bg-muted rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              prefetch={false}
            >
              <PackageIcon className="h-8 w-8" />
              <span className="text-sm font-medium">{category}</span>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DirectoryPage;
function ArrowLeftIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function CompassIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function ShoppingCartIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PackageIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
