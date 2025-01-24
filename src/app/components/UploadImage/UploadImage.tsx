import StockImage from "public/images/upload_image.jpg";
import React, { useEffect, useRef, useState } from "react";
import { createClient } from "src/app/utils/supabase/client";
export default function UploadImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    async function fetchImage() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user !== null) {
        const photoUrl = user.user_metadata.profile_photo;
        if (photoUrl !== null) {
          setImagePreview(photoUrl);
        }
      }
    }
    fetchImage();
  }, []);
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
      className="w-96 h-96 m-10  cursor-pointer bg-white border-gray-200 rounded-2xl flex flex-row justify-center"
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
