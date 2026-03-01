import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ShoeListing {
    id: bigint;
    conditionScore: bigint;
    name: string;
    seller: Principal;
    photo: ExternalBlob;
    isAuthentic: boolean;
    priceCents: bigint;
}
export interface backendInterface {
    completeTrade(seller: Principal, buyer: Principal, sellerRating: bigint, buyerRating: bigint): Promise<void>;
    createListing(name: string, priceCents: bigint, photo: ExternalBlob, conditionScore: bigint, isAuthentic: boolean): Promise<bigint>;
    getListings(minCondition: bigint, maxCondition: bigint, filterAuthenticOnly: boolean): Promise<Array<ShoeListing>>;
    getUserProfile(user: Principal): Promise<{
        collection: Array<ShoeListing>;
        tradeCount: bigint;
        averageRating: number;
    }>;
}
