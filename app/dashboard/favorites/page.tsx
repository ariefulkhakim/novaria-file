"use client";
import FilesScreenComponent from "@/components/reusable/FileScreen";
import React from "react";

const FavoritesScreen = () => {
  return (
    <FilesScreenComponent
      title="Favorites"
      isFavorite
      notFoundDesc="No File Favorites"
    />
  );
};

export default FavoritesScreen;
