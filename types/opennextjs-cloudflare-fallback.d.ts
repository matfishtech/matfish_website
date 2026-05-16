declare module "@opennextjs/cloudflare" {
  export interface CloudflareContext {
    env: Record<string, string | undefined>;
    cf?: unknown;
    ctx?: unknown;
  }

  export function getCloudflareContext(options?: { async?: boolean }): CloudflareContext;

  export function initOpenNextCloudflareForDev(options?: {
    experimental?: {
      remoteBindings?: boolean;
    };
  }): void;

  export function defineCloudflareConfig(config: unknown): unknown;
}
