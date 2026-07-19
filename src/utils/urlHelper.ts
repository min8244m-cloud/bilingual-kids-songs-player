/**
 * Converts standard user-provided video links (Google Drive, YouTube)
 * into embeddable URLs that work inside an iframe.
 */
export function getEmbedUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();

  // 1. Google Drive URLs
  // Standard share: https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing
  // Simple: https://drive.google.com/file/d/1A2B3C4D5E/view
  // Alternate: https://drive.google.com/open?id=1A2B3C4D5E
  // Embedded format: https://drive.google.com/file/d/1A2B3C4D5E/preview
  if (trimmed.includes("drive.google.com") || trimmed.includes("docs.google.com")) {
    if (trimmed.includes("/preview")) {
      return trimmed;
    }
    const fileIdMatch = trimmed.match(/\/file(?:\/u\/\d+)?\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
  }

  // 2. YouTube URLs
  if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
    if (trimmed.includes("/embed/")) {
      return trimmed;
    }
    
    let videoId = "";
    
    try {
      // Try using URL parser for modern link layouts
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      
      // Standard query parameter "v"
      videoId = urlObj.searchParams.get('v') || "";
      
      if (!videoId) {
        const pathSegments = urlObj.pathname.split('/').filter(Boolean);
        if (urlObj.hostname.includes('youtu.be')) {
          // e.g. youtu.be/VIDEO_ID
          videoId = pathSegments[0] || "";
        } else if (pathSegments.includes('shorts')) {
          // e.g. youtube.com/shorts/VIDEO_ID
          const idx = pathSegments.indexOf('shorts');
          videoId = pathSegments[idx + 1] || "";
        } else if (pathSegments.includes('embed')) {
          const idx = pathSegments.indexOf('embed');
          videoId = pathSegments[idx + 1] || "";
        } else if (pathSegments.includes('v')) {
          const idx = pathSegments.indexOf('v');
          videoId = pathSegments[idx + 1] || "";
        }
      }
    } catch (e) {
      // Fallback to regex if URL parsing fails
    }

    if (!videoId) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
      const match = trimmed.match(regExp);
      if (match && match[2] && match[2].length === 11) {
        videoId = match[2];
      }
    }

    // Clean up any potential parameters left in the extracted ID
    if (videoId) {
      videoId = videoId.split(/[?#&]/)[0];
    }

    if (videoId && videoId.length === 11) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    }
  }

  // Fallback as is (hoping it is already embeddable or a direct file)
  return trimmed;
}

/**
 * Checks if the URL is from Google Drive or YouTube to provide a cute brand badge in the UI
 */
export function getLinkSourceType(url: string): 'drive' | 'youtube' | 'other' {
  if (!url) return 'other';
  const l = url.toLowerCase();
  if (l.includes('drive.google.com') || l.includes('docs.google.com')) return 'drive';
  if (l.includes('youtube.com') || l.includes('youtu.be')) return 'youtube';
  return 'other';
}
