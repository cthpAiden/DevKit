// Unicode-safe Base64 helpers shared across tools.

export function base64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

export function base64Decode(b64: string): string {
  const binary = atob(b64.trim())
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

/** Decode a base64url segment (as used in JWTs). */
export function base64UrlDecode(part: string): string {
  let s = part.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4 !== 0) s += '='
  return base64Decode(s)
}
