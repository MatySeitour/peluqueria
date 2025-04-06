import { motion } from "motion/react";
import { cn, socialMedias } from "../utils/functions";

export function SocialMedia() {
  return (
    <ul className="flex items-center gap-2">
      {socialMedias.map((socialMedia) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.8 },
          }}
          className={cn(
            "bg-primary group group relative flex w-9 cursor-pointer items-center gap-2 rounded-full p-2 shadow-2xl transition-all",
            socialMedia?.id === 3 && "hover:!w-36",
          )}
          key={socialMedia?.id}
        >
          <a
            className="relative w-full"
            target="_blank"
            href={socialMedia?.link}
          >
            <socialMedia.icon className="size-5 min-w-5 text-white" />

            {socialMedia?.id === 3 && (
              <p className="invisible absolute top-1/2 right-2 z-10 -translate-y-1/2 pl-4 text-xs font-medium text-nowrap text-white opacity-0 group-hover:visible group-hover:opacity-100 group-hover:transition-all group-hover:delay-300">
                +54 11 2721-0827
              </p>
            )}
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
