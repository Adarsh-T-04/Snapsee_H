// IP-based sliding window rate limiter for API protection
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000 // 1 minute
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record or expired, reset
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  // If over limit, block
  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Increment
  record.count += 1;
  rateLimitMap.set(ip, record);
  return { allowed: true, remaining: limit - record.count };
}

