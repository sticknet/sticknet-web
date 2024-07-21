export type TCacheFile = {
    uri: string;
    uriKey: string;
};

export type TDevice = {
    id: string;
    name: string;
};

export type TGalleryItem = {
    extension: string;
    fileSize: number;
    filename: string;
    height: number;
    orientation: string | null;
    playableDuration: number;
    duration?: number;
    uri: string;
    width: number;
    location: string | null;
    modificationTimestamp: number;
    subTypes: string[];
    timestamp: number;
    createdAt?: number;
    type: string;
};
