import { cn } from "@/lib/utils";
import ButtonLinkHeader from "../shared/custom/button-link-header";
import DirectusImageClient from "../shared/directus-image-client";
import { Button } from "../ui/button";

const HeaderButton = ({
  button,
  isMenuActive,
  darkMode,
}: {
  button: any;
  isMenuActive: boolean;
  darkMode: boolean;
}) => {
  return (
    <ButtonLinkHeader button={button}>
      <Button
        variant="ghost"
        className={cn(
          "!h-[36px] relative items-center gap-x-[10px] hover:bg-secondary hover:text-foreground border-none p-3 text-sm group text-foreground bg-secondary/50",
          {
            "bg-white/30 text-white hover:bg-white hover:text-foreground":
              darkMode,
            "bg-secondary/50 text-foreground transition-[color] delay-200 duration-200":
              isMenuActive,
          },
        )}
      >
        {button.title}
        <div
          className={cn(
            "relative -translate-x-0.5 scale-[.8] transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 text-primary",
            {
              "text-white group-hover:text-primary": darkMode,
              "text-primary transition-[color,transform] group-hover:delay-0 delay-200 duration-200":
                isMenuActive,
            },
          )}
        >
          {button?.icon && (
            <div className="relative flex size-md items-center justify-center">
              <DirectusImageClient
                className="relative flex size-md items-center justify-center object-contain"
                asset={button?.icon}
                fill
              />
            </div>
          )}
        </div>
      </Button>
    </ButtonLinkHeader>
  );
};

export default HeaderButton;
