import { useQuery } from '@tanstack/react-query';
import { communityPosts } from '../data/content';
import type { CommunityPost } from '../types';

function fetchCommunityPosts(): Promise<CommunityPost[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(communityPosts), 450);
  });
}

export function useCommunityFeed() {
  return useQuery({
    queryKey: ['communityPosts'],
    queryFn: fetchCommunityPosts,
    staleTime: 1000 * 60 * 2,
  });
}
