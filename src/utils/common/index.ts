import heic2any from 'heic2any';
import {cache} from '../../actions/actionTypes';

export const parseNumber = (dialCode: string, number: string) => {
    if (!dialCode || !number) return '';
    return `${dialCode} ${number.slice(-(number.length - dialCode.length), -7)} ${number.slice(-7, -4)} ${number.slice(
        -4,
    )}`;
};

export const formatTime = (seconds: number): string => {
    const min = Math.floor(seconds / 60);
    const sec = Math.round(seconds % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};

export const formatAMPM = (date: string | number | Date): string => {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
};

export const formatDate = (date: string | number | Date): string => {
    const dt = new Date();
    const currentDate = dt.getTime();
    const today = (dt.getHours() * 60 * 60 + dt.getMinutes() * 60 + dt.getSeconds()) * 1000;
    const oneDay = 60 * 60 * 24 * 1000;
    const d = new Date(date);
    const timestamp = d.getTime();
    if (currentDate - timestamp < today) {
        return 'Today';
    }
    if (currentDate - timestamp < oneDay + today) return 'Yesterday';

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear().toString().slice(2)}`;
};

export const getOSAndBrowser = (): string => {
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;

    // Detect OS
    if (platform.indexOf('Win') !== -1) os = 'Windows';
    if (platform.indexOf('Mac') !== -1) os = 'MacOS';
    if (platform.indexOf('Linux') !== -1) os = 'Linux';
    if (/iPhone|iPad|iPod/.test(platform)) os = 'iOS';
    if (/Android/.test(userAgent)) os = 'Android';

    // Detect Browser
    if (userAgent.indexOf('Chrome') > -1) browser = 'Google Chrome';
    else if (userAgent.indexOf('Safari') > -1) browser = 'Apple Safari';
    else if (userAgent.indexOf('Opera') > -1) browser = 'Opera';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Mozilla Firefox';
    else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1)
        browser = 'Microsoft Internet Explorer';

    return `${os} - ${browser}`;
};

export const createFileSections = (filesTree: any, mostRecent: string[] | null, files: any): any => {
    const tempSections: {[key: string]: any[]} = {};
    let fileIndex = 0;
    if (mostRecent) {
        mostRecent.forEach((uriKey) => {
            const item = {...files[uriKey]};
            if (!item) return;
            const title = 'Recent';
            if (!tempSections[title]) tempSections[title] = [];
            tempSections[title].push(item);
        });
    }
    Object.values(filesTree || {}).forEach((uriKey: any) => {
        const item = {...files[uriKey]};
        if (!item) return;
        const title = item.isFolder ? 'Folders' : item.name[0].match(/[a-zA-Z]/) ? item.name[0].toUpperCase() : '#';
        if (!tempSections[title]) tempSections[title] = [];
        tempSections[title].push(item);
    });
    // Convert the tempSections object into an ordered array
    return Object.keys(tempSections)
        .sort((a, b) => {
            if (a === 'Recent') return -1;
            if (b === 'Recent') return 1;
            if (a === 'Folders') return -1;
            if (b === 'Folders') return 1;
            if (a === '#') return 1;
            if (b === '#') return -1;
            return a.localeCompare(b);
        })
        .map((key) => {
            tempSections[key]
                .sort((a, b) => {
                    if (a.folderType === 'camera_uploads') return -1;
                    if (b.folderType === 'camera_uploads') return 1;
                    if (key === 'Recent') return b.timestamp?.localeCompare(a.timestamp);
                    return a.name?.localeCompare(b.name);
                })
                .map((item) => {
                    if (!item.isFolder) {
                        item.fileIndex = fileIndex;
                        fileIndex += 1;
                    }
                    return item;
                });
            return {title: key, data: tempSections[key]};
        });
};

export const createFilesList = (filesTree: string[], mostRecent: string[] | null, files: any): any[] => {
    const fileList: any[] = [];
    const recentList: any[] = [];
    if (mostRecent) {
        mostRecent.forEach((uriKey) => {
            const item = files[uriKey];

            if (!item || item.isFolder) return;

            recentList.push(item);
        });
    }

    filesTree.forEach((uriKey) => {
        const item = files[uriKey];

        if (!item || item.isFolder) return;

        fileList.push(item);
    });

    recentList.sort((a, b) => {
        return b.timestamp?.localeCompare(a.timestamp);
    });
    fileList.sort((a, b) => {
        const aStartsWithAlpha = /^[a-zA-Z]/.test(a.name);
        const bStartsWithAlpha = /^[a-zA-Z]/.test(b.name);

        // If one name starts with an alphabetical character and the other doesn't
        if (aStartsWithAlpha && !bStartsWithAlpha) {
            return -1; // a comes first
        }
        if (!aStartsWithAlpha && bStartsWithAlpha) {
            return 1; // b comes first
        }

        // If both start with the same type of character, sort alphabetically
        return a.name?.localeCompare(b.name);
    });
    return recentList.concat(fileList);
};

export function createPreview(file: File, uriKey: string, dispatch: any): Promise<any> {
    return new Promise((resolve, reject) => {
        // Check if the file is an image
        if (!file || !file.type.startsWith('image/')) {
            reject(new Error('Provided file is not an image'));
            return;
        }

        // Create an image element to help with resizing
        const img = new Image();
        let imgSrc: string;
        if (file.type.includes('heic')) {
            heic2any({blob: file})
                .then((heicBlob) => {
                    imgSrc = URL.createObjectURL(heicBlob as Blob);
                    dispatch({type: cache.CACHE_FILE_VAULT, payload: {uriKey: `${uriKey}-heic`, uri: imgSrc}});
                    img.src = imgSrc;
                })
                .catch(() => {
                    reject(new Error('Failed to convert HEIC image'));
                });
        } else {
            imgSrc = URL.createObjectURL(file);
            img.src = imgSrc;
        }

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the desired dimensions for the preview
            const maxWidth = 400;
            const maxHeight = 400;

            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw the resized image
            ctx?.drawImage(img, 0, 0, width, height);

            // Convert the canvas to a blob (compressed with JPEG format for smaller size)
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        (blob as any).uri = URL.createObjectURL(blob);
                        (blob as any).width = img.width;
                        (blob as any).height = img.height;
                        resolve(blob);
                    }
                },
                'image/jpeg',
                0.85,
            ); // 0.85 is the compression quality
        };

        img.onerror = function () {
            reject(new Error('Failed to load image'));
        };
    });
}

export function createThumbnail(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        // Check if the file is a video
        if (!file || !file.type.startsWith('video/')) {
            reject(new Error('Provided file is not a video'));
            return;
        }

        // Create a video element to capture a frame
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = URL.createObjectURL(file);

        video.onloadedmetadata = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set the desired dimensions for the thumbnail
            const maxWidth = 400;
            const maxHeight = 400;

            let width = video.videoWidth;
            let height = video.videoHeight;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw the resized frame
            ctx?.drawImage(video, 0, 0, width, height);

            // Convert the canvas to a blob (compressed with JPEG format for smaller size)
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        (blob as any).uri = URL.createObjectURL(blob);
                        (blob as any).width = video.videoWidth;
                        (blob as any).height = video.videoHeight;
                        resolve(blob);
                    }
                },
                'image/jpeg',
                0.85,
            ); // 0.85 is the compression quality

            // Clean up resources
            URL.revokeObjectURL(video.src);
        };

        video.onerror = function () {
            reject(new Error('Failed to load video'));
        };
    });
}

export function isCloseToBottom(paddingToBottom = 200): boolean {
    return window.scrollY + window.innerHeight + paddingToBottom >= document.body.offsetHeight;
}

export function handleHistoryFilePath(folderStack: any[], removeCount = -1): void {
    let newPath = '/vault/files/';
    folderStack.slice(1, removeCount).map((item) => {
        newPath += `${item.name}/`;
    });
    window.history.pushState({}, '', newPath);
}

export function getInitials(str: string): string {
    if (!str) return '';
    const words = str.split(' ');
    const initials = [];
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials.push(words[i][0]);
    }
    return initials.join('');
}

export function unixToDate(unixTimestamp: string): string {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const date = new Date(parseInt(unixTimestamp)); // Convert Unix timestamp to milliseconds
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export function formatBytes(bytes: number, decimals = 1): string {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export const validateEmail = (email: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return emailRegex.test(email);
};

export function handleLinks(elementId: string): void {
    const container = document.getElementById(elementId);
    if (!container) return;
    const content = container.innerHTML;

    // Use a regular expression to find URLs and replace them with clickable links
    const updatedContent = content.replace(
        /(https?:\/\/\S+)/g,
        '<a style="color:#0F0F28" href="$1" target="_blank">$1</a>',
    );

    // Update the container's content with the clickable links
    container.innerHTML = updatedContent;
}

export function shortenAddress(address: string) {
    if (!address.startsWith('0x') || address.length < 42) {
        throw new Error('Invalid Ethereum address');
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
