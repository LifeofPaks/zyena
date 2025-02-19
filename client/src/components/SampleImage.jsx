import { FileIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import {
    Button,
    InputLabel,
  } from "@mui/material";
import axios from "axios";
import Skeleton from '@mui/material/Skeleton';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useLocation } from "react-router-dom";


function SampleImage({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const location = useLocation();

  const BACKEND_URL =
  import.meta.env.MODE === "production"
   ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
   : import.meta.env.VITE_BACKEND_URL_LOCAL;

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${BACKEND_URL}/api/contact/upload-image`,
      data
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`!w-full !mt-4   ${isCustomStyling ? "" : "mx-auto"}`}
    >
      <InputLabel className="!text-[12px] font-semibold !mb-2 block ">
      Upload Inspiration Picture of the Dress
      </InputLabel>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`!w-full ${
          isEditMode && imageFile === null ? "opacity-50" : ""
        } border-1 border-dashed rounded-lg p-4 border-gray-400 !w-full`}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <InputLabel
            htmlFor="image-upload"
            className={` ${
              isEditMode ? "cursor-not-allowed" : ""
            } !flex !flex-col !items-center !justify-center h-24 cursor-pointer !w-full`}
          >
            <AddPhotoAlternateIcon className="!text-[30px] text-muted-foreground mb-2" />
            <span className="font-normal !text-[14px]">Drag & drop or click to upload image</span>
          </InputLabel>
        ) : imageLoadingState ? (
          <Skeleton variant="rectangular" className="h-10 bg-gray-100" />
        //   <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SampleImage;
