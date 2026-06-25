import { useState } from "react";

export const useShare = () => {
    const [copiedId, setCopiedId] = useState(null);

    const handleShare = (e, path, id) => {
        e.stopPropagation();
        // Dynamic URL generator
        const shareUrl = `${window.location.origin}/${path}/${id}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopiedId(id);
            setTimeout(() =>
                setCopiedId(null), 2000)
        })
    }
    return { copiedId, handleShare };
}