import { Arch } from '../types';

const archCache = new Map<string, Arch>();

export function getCachedArch(uri: string): Arch | undefined { return archCache.get(uri); }
export function setCachedArch(uri: string, arch: Arch): void { archCache.set(uri, arch); }
export function clearArchCacheFor(uri: string): void { archCache.delete(uri); }
export function clearArchCache(): void { archCache.clear(); }
