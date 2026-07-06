/**
 * Canonicalization shared by the compiler and tooling.
 *
 * Keystatic can't express "absent" for optional fields: it writes "" for empty
 * optional text, null for empty optional numbers, [] for empty optional arrays
 * and an all-empty object for optional objects (e.g. an event without a
 * speaker). Normalize those back to "absent" before validation so the compiled
 * snapshot keeps the original semantics. Explicit `false` booleans are kept -
 * some entries store them deliberately (e.g. a tool's isDark: false).
 */

export function unwrapZod(schema: any): { inner: any; required: boolean } {
  let s = schema;
  let required = true;
  for (;;) {
    const t = s._def?.typeName;
    if (t === "ZodOptional" || t === "ZodNullable" || t === "ZodDefault") {
      required = false;
      s = s._def.innerType;
    } else if (t === "ZodEffects") {
      s = s._def.schema;
    } else {
      return { inner: s, required };
    }
  }
}

export function isDeepEmpty(v: unknown): boolean {
  if (v === null || v === undefined || v === "" || v === false) return true;
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.values(v as object).every(isDeepEmpty);
  return false;
}

export function normalizeValue(schema: any, value: any): any {
  const { inner } = unwrapZod(schema);
  const t = inner._def?.typeName;
  if (t === "ZodObject" && value && typeof value === "object" && !Array.isArray(value)) {
    const shape = inner._def.shape();
    const out: Record<string, any> = {};
    for (const [k, raw] of Object.entries(value)) {
      const child = shape[k];
      if (!child) {
        out[k] = raw;
        continue;
      }
      const { inner: childInner, required: childRequired } = unwrapZod(child);
      const v = normalizeValue(child, raw);
      if (!childRequired) {
        const ct = childInner._def?.typeName;
        if (v === null || v === undefined) continue;
        if (ct === "ZodString" && v === "") continue;
        if (ct === "ZodArray" && Array.isArray(v) && v.length === 0) continue;
        if (ct === "ZodObject" && typeof v === "object" && isDeepEmpty(v)) continue;
      }
      out[k] = v;
    }
    return out;
  }
  if (t === "ZodArray" && Array.isArray(value)) {
    return value.map((el) => normalizeValue(inner._def.type, el));
  }
  return value;
}
