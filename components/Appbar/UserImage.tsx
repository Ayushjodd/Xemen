import React from "react";
import Image from 'next/image';

export default function UserImage({ image }: { image: string }) {
    return (
        <div className="w-8 h-8">
            <Image
                className="w-full h-full rounded-full cursor-pointer"
                src={image || ""}
                width={32}
                height={32}
                alt="user_profile_image"
                referrerPolicy="no-referrer"
            />
        </div>
    );
}
