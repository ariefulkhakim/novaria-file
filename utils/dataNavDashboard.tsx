import { FolderClosed, FolderHeart, Trash2 } from "lucide-react";

export const DataNavDashboard = [
  {
    key: "1",
    name: "All Files",
    link: "/dashboard/files",
    icon: <FolderClosed className="h-4 w-4" />,
  },
  {
    key: "2",
    name: "Favorites",
    link: "/dashboard/favorites",
    icon: <FolderHeart className="h-4 w-4" />,
  },
  {
    key: "3",
    name: "Trash",
    link: "/dashboard/trash",
    icon: <Trash2 className="h-4 w-4" />,
  },
];
