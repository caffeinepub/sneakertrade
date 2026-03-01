import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, type ShoeListing } from '../backend';
import { Principal } from '@dfinity/principal';

// ─── Listings ────────────────────────────────────────────────────────────────

export interface ListingFilters {
  minCondition: number;
  maxCondition: number;
  filterAuthenticOnly: boolean;
}

export function useGetListings(filters: ListingFilters) {
  const { actor, isFetching } = useActor();

  return useQuery<ShoeListing[]>({
    queryKey: ['listings', filters],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getListings(
        BigInt(filters.minCondition),
        BigInt(filters.maxCondition),
        filters.filterAuthenticOnly
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      name: string;
      priceCents: number;
      photo: ExternalBlob;
      conditionScore: number;
      isAuthentic: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createListing(
        params.name,
        BigInt(params.priceCents),
        params.photo,
        BigInt(params.conditionScore),
        params.isAuthentic
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export function useGetUserProfile(principalStr: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['profile', principalStr],
    queryFn: async () => {
      if (!actor || !principalStr) return null;
      const principal = Principal.fromText(principalStr);
      return actor.getUserProfile(principal);
    },
    enabled: !!actor && !isFetching && !!principalStr,
  });
}

export function useCompleteTrade() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      seller: string;
      buyer: string;
      sellerRating: number;
      buyerRating: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.completeTrade(
        Principal.fromText(params.seller),
        Principal.fromText(params.buyer),
        BigInt(params.sellerRating),
        BigInt(params.buyerRating)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
