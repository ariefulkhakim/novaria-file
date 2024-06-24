import FilesScreenComponent from "@/components/reusable/FileScreen";
import React from "react";

const TrashScreen = () => {
  return (
    <FilesScreenComponent
      title="Trash"
      isDelete
      notFoundDesc="No File In Trash"
    />
  );
};

export default TrashScreen;
