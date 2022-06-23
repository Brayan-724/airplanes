import { Primitive, UnionToIntersection } from "type-fest";

type Stringify<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  ? `${T}`
  : never;

type MakePath<
  Sub extends string | undefined,
  Next extends string | number | symbol
> = Next extends symbol
  ? never
  : `${Sub extends undefined ? "" : `${Sub}.`}${Stringify<Next>}`;

type GetPlainObject_<
  O,
  Sub extends string | undefined = undefined
> = O extends object
  ? {
      [P in keyof O as MakePath<Sub, P>]: O[P] extends Primitive
        ? O[P]
        : GetPlainObject_<O[P], MakePath<Sub, P>>;
    }
  : O;

export type FlatObject<O> = UnionToIntersection<
  O | (O extends Primitive ? {} : FlatObject<O[keyof O]>)
>;

export type GetObject<T> = FlatObject<GetPlainObject_<T>>;
export type GetPath<O> = Extract<keyof GetObject<O>, string>;
export type GetValue<O, P extends GetPath<O>> = GetObject<O>[P];

export function objGet<
  O,
  P extends GetPath<O>,
  Strict extends boolean | undefined = false
>(
  obj: O,
  path: P,
  _strict?: Strict
): GetValue<O, P> | (Strict extends true ? undefined : never) {
  const parts = path.split(".");
  let index = 0;
  let current: any = obj;
  const length = parts.length;

  while (current != null && index < length) {
    if (typeof current !== "object")
      return undefined as unknown as
        | GetValue<O, P>
        | (Strict extends true ? undefined : never);

    current = current[parts[index++]];
  }

  return (index && index == length ? current : undefined) as unknown as
    | GetValue<O, P>
    | (Strict extends true ? undefined : never);
}

export function objSet<O, P extends GetPath<O>, V extends GetValue<O, P>>(
  obj: O,
  path: P,
  value: V
): void {
  const parts = path.split(".");
  let index = 0;
  let current: any = obj;
  const length = parts.length;

  while (current != null && index < length) {
    if (typeof current !== "object") return;

    current = current[parts[index++]];
  }

  if (index && index == length) current = value;
}
