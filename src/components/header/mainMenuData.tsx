import { BadgeHelp, MessageSquarePlus, DraftingCompass } from "lucide-react";
import { Help, AddDocument, SearchShield, Robot } from "../icons";
import { RoleGuard } from "~/UserMetaProvider";

// Role Guard Container
export const LoopItemPreGuard = ({
  roles,
  children,
}: {
  roles: Array<string>;
  children: React.ReactNode;
}) => {
  if (roles.length === 0) {
    return <>{children}</>;
  } else {
    return <RoleGuard roles={roles}>{children}</RoleGuard>;
  }
};

export interface MenuLinks {
  [key: string]: {
    link: string;
    newTab: boolean;
    prefetch: boolean;
    icon: React.ReactNode | false;
    roles: Array<string>;
    mobileOnly: boolean;
    description?: string;
    componentOverride?: React.ReactNode;
    showSepBefore?: boolean;
    comingSoon?: boolean;
    clickable?: boolean;
    children?: MenuLinks;
  };
}

export const mainMenuData = () => {
  const svgClassesFill = "mr-2.5 h-auto w-4 fill-white [&_path]:fill-white";
  const svgClassesStroke =
    "mr-2.5 h-auto w-4 stroke-white [&_path]:stroke-white";

  const menuLinks: MenuLinks = {
    Home: {
      link: "/",
      newTab: false,
      prefetch: true,
      icon: false,
      roles: [],
      mobileOnly: true,
    },
    "Beta Dashboard": {
      link: "/beta-dashboard",
      newTab: false,
      prefetch: true,
      icon: <Help className={svgClassesFill} />,
      roles: ["beta"],
      mobileOnly: false,
    },
    Tools: {
      link: "",
      newTab: false,
      prefetch: true,
      icon: <DraftingCompass className={svgClassesStroke} />,
      roles: [],
      mobileOnly: false,
      clickable: false,
      children: {
        "Legal Doc Generator": {
          link: "/agreements",
          newTab: false,
          prefetch: true,
          icon: <AddDocument className="block h-4 w-4 fill-purple-800" />,
          roles: [],
          mobileOnly: false,
          description: "Generate and manage your legal documents.",
        },
        "Legal Manager": {
          link: "/legal-manager",
          newTab: false,
          prefetch: true,
          icon: <SearchShield className="h-4 w-4 fill-gray-500" />,
          roles: [],
          mobileOnly: false,
          comingSoon: true,
          description: "Perform a legal audit and manage your tasks.",
        },
        "ChatLegal™": {
          link: "/chatlegal",
          newTab: false,
          prefetch: true,
          icon: <Robot className="h-4 w-4 fill-gray-500" />,
          roles: [],
          mobileOnly: false,
          comingSoon: true,
          description: "Get your legal questions answered.",
        },
      },
    },
    Feedback: {
      link: "https://plainly-legal.canny.io/",
      newTab: true,
      prefetch: false,
      icon: <MessageSquarePlus className={svgClassesStroke} />,
      roles: [],
      mobileOnly: false,
      showSepBefore: true,
    },
    "Knowledge Base": {
      link: "https://help.plainlylegal.com/",
      newTab: true,
      prefetch: false,
      icon: <BadgeHelp className={svgClassesStroke} />,
      roles: [],
      mobileOnly: false,
    },
  };

  return menuLinks;
};

export default mainMenuData;
