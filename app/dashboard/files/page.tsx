"use client";
import FilesScreenComponent from "@/components/reusable/FileScreen";
const FilesScreen = () => {
  return (
    <FilesScreenComponent
      title="Your Files"
      notFoundDesc="No File Stored, Please Upload Your File."
    />
  );
};

export default FilesScreen;
