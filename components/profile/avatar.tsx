import { Smile } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";

const variants = cva("p-4 rounded-md relative transition", {
  variants: {
    color: {
      BLUE: "bg-gradient-to-b from-sky-600 to-sky-300 group-hover:from-sky-700 group-hover:to-sky-400",
      RED: "bg-gradient-to-b from-red-600 to-red-300 group-hover:from-red-700 group-hover:to-red-400",
      YELLOW:
        "bg-gradient-to-b from-yellow-600 to-yellow-300 group-hover:from-yellow-700 group-hover:to-yellow-400",
      GREEN:
        "bg-gradient-to-b from-green-600 to-green-300 group-hover:from-green-700 group-hover:to-green-400",
    },
  },
  defaultVariants: {
    color: "BLUE",
  },
});

const iconSizes = cva("text-white", {
  variants: {
    size: {
      xs: "w-5 h-5",
      sm: "w-8 h-8 md:w-16 md:h-16",
      lg: "w-16 h-16 md:w-32 md:h-32",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type AvatarSize = VariantProps<typeof iconSizes>["size"];

interface AvatarProps {
  color: VariantProps<typeof variants>["color"];
  size?: AvatarSize;
  adult?: boolean;
  className?: string;
}

const Avatar = ({ color, size, adult = true, className }: AvatarProps) => {
  return (
    <div className={cn(variants({ color }), className)}>
      <Smile className={iconSizes({ size })} />
      {!adult && (
        <Image
          src="/kids.png"
          alt="kids-logo"
          width={50}
          height={0}
          className="absolute bottom-2 right-2"
        />
      )}
    </div>
  );
};

export default Avatar;
