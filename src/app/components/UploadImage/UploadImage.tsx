import StockImage from "public/images/upload_image.jpg";
import React, { useRef, useState } from "react";
import { createClient } from "src/app/utils/supabase/client";
interface UploadImageProps {
  image: string | null;
}
export default function UploadImage(props: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(props.image);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      const fileName = `${user?.id}-${Date.now()}`;
      const { data, error } = await supabase.storage
        .from("profile-photos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(data.path);

      const { error: metadataError } = await supabase.auth.updateUser({
        data: { profile_photo: publicUrlData.publicUrl },
      });
      if (metadataError) {
        console.error("Error updating user metadata:", metadataError.message);
        return;
      }
      setImagePreview(publicUrlData.publicUrl);
    }
  }
  return (
    <div
      onClick={handleImageClick}
      className="w-full h-full m-10 transition-transform hover:scale-150  cursor-pointer bg-white border-gray-200 rounded-2xl flex flex-row justify-center shadow-sm shadow-black"
    >
      <img
        src={imagePreview || StockImage.src}
        className="rounded-2xl h-full object-cover"
        alt={"upload-image"}
      ></img>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
