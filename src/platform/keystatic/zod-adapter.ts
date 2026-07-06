/**
 * Generates Keystatic admin UI config from the Zod schema registry.
 *
 * The Zod schema is the single source of truth; this adapter walks it and
 * emits the matching Keystatic fields, so adding a field to a schema
 * automatically adds it to the admin form. Shapes Keystatic can't model
 * (discriminated unions, tuples, records) throw - mark those defs with
 * `keystatic: false` in the registry and edit their JSON directly.
 *
 * The compiler revalidates everything Keystatic writes, so a UI/schema
 * mismatch can never ship broken content - the compile fails first.
 */
import { fields, collection, singleton } from "@keystatic/core";
import type { z } from "zod";
import { COLLECTIONS_DIR, SINGLETONS_DIR, type CollectionDef, type SingletonDef } from "../schema/core.ts";

function humanize(key: string): string {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

type AnyZod = z.ZodTypeAny;

function unwrap(schema: AnyZod): { inner: AnyZod; required: boolean } {
  let s: any = schema;
  let required = true;
  for (;;) {
    const t = s._def.typeName;
    if (t === "ZodOptional" || t === "ZodNullable") {
      required = false;
      s = s._def.innerType;
    } else if (t === "ZodDefault") {
      required = false;
      s = s._def.innerType;
    } else if (t === "ZodEffects") {
      s = s._def.schema;
    } else {
      return { inner: s, required };
    }
  }
}

/** First string field of an object schema - used for array item labels. */
function labelKey(objectSchema: any): string | undefined {
  for (const [k, v] of Object.entries<any>(objectSchema._def.shape())) {
    if (unwrap(v).inner._def.typeName === "ZodString") return k;
  }
  return undefined;
}

/**
 * `insideOptional` - Keystatic has no "optional object" concept, so children
 * of an optional object must not be required in the form, or entries without
 * that object (e.g. events without a speaker) fail client-side validation.
 * The compiler prunes deep-empty optional objects back to "absent" on save.
 */
function fieldFor(schema: AnyZod, key: string, insideOptional = false): any {
  const { inner, required: ownRequired } = unwrap(schema);
  const required = ownRequired && !insideOptional;
  const t = (inner as any)._def.typeName;
  const label = humanize(key);

  switch (t) {
    case "ZodString":
      return fields.text({
        label,
        validation: required ? { isRequired: true, length: { min: 1 } } : undefined,
      });
    case "ZodNumber":
      return fields.number({
        label,
        validation: required ? { isRequired: true } : undefined,
      });
    case "ZodBoolean":
      return fields.checkbox({ label, defaultValue: false });
    case "ZodEnum": {
      const values: string[] = (inner as any)._def.values;
      return fields.select({
        label,
        options: values.map((v) => ({ label: v, value: v })),
        defaultValue: values[0],
      });
    }
    case "ZodArray": {
      const el = unwrap((inner as any)._def.type).inner;
      const elType = (el as any)._def.typeName;
      if (elType === "ZodString") {
        return fields.array(fields.text({ label }), {
          label,
          itemLabel: (props: any) => props.value || label,
        });
      }
      if (elType === "ZodObject") {
        const lk = labelKey(el);
        return fields.array(fieldFor(el, key, insideOptional), {
          label,
          itemLabel: (props: any) =>
            (lk && props.fields[lk]?.value) || label,
        });
      }
      if (elType === "ZodNumber") {
        return fields.array(fields.number({ label }), { label });
      }
      throw new Error(`No Keystatic mapping for array of ${elType} at "${key}"`);
    }
    case "ZodObject": {
      const shape = Object.entries<any>((inner as any)._def.shape());
      const obj: Record<string, any> = {};
      const childrenOptional = insideOptional || !ownRequired;
      for (const [k, v] of shape) obj[k] = fieldFor(v, k, childrenOptional);
      return fields.object(obj, { label });
    }
    default:
      throw new Error(`No Keystatic mapping for ${t} at "${key}"`);
  }
}

export function keystaticCollection(def: CollectionDef) {
  if (def.keystatic === false) {
    throw new Error(`${def.name} is marked keystatic: false`);
  }
  const shape = Object.entries<any>((def.schema as any)._def.shape());
  const schema: Record<string, any> = {};
  for (const [k, v] of shape) {
    schema[k] =
      k === def.idField
        ? fields.slug({
            name: {
              label: "Slug",
              description: "Stable id; becomes the filename and the URL where applicable.",
              validation: { isRequired: true, length: { min: 1 } },
            },
          })
        : fieldFor(v, k);
  }
  return collection({
    label: def.label,
    path: `${COLLECTIONS_DIR}/${def.name}/*` as `${string}/*`,
    format: { data: "json" },
    slugField: def.idField,
    schema,
  });
}

export function keystaticSingleton(def: SingletonDef) {
  if (def.keystatic === false) {
    throw new Error(`${def.name} is marked keystatic: false`);
  }
  const shape = Object.entries<any>((def.schema as any)._def.shape());
  const schema: Record<string, any> = {};
  for (const [k, v] of shape) schema[k] = fieldFor(v, k);
  return singleton({
    label: def.label,
    path: `${SINGLETONS_DIR}/${def.name}`,
    format: { data: "json" },
    schema,
  });
}
